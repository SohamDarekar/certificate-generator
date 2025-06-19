document.addEventListener('DOMContentLoaded', () => {
  // Configuration
  const API_URL = 'http://localhost:3000';
  
  // DOM elements
  const form = document.getElementById('certificate-form');
  const nameInput = document.getElementById('name');
  const codeInput = document.getElementById('code');
  const messageEl = document.getElementById('message');
  const loadingEl = document.getElementById('loading');
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const name = nameInput.value.trim();
    const code = codeInput.value.trim();
    
    // Validate inputs
    if (!name || !code) {
      showMessage('Please enter both your name and verification code', 'error');
      return;
    }
    
    try {
      // Show loading message
      loadingEl.classList.remove('hide');
      messageEl.classList.add('hide');
      
      // Make API request
      const response = await fetch(`${API_URL}/generate-certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, code }),
      });
      
      // Handle response
      if (response.ok) {
        // Convert the response to a blob
        const blob = await response.blob();
        
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}_certificate.pdf`;
        a.style.display = 'none';
        
        // Append to the document and trigger download
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        showMessage('Certificate generated successfully! Downloading...', 'success');
      } else {
        let errorMsg = 'Failed to generate certificate';
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {}
        showMessage(errorMsg, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('An error occurred while connecting to the server', 'error');
    } finally {
      loadingEl.classList.add('hide');
    }
  });
  
  // Helper function to show messages
  function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = type; // Set class to success or error
    messageEl.classList.remove('hide');
  }
  
  // Basic form validation
  [nameInput, codeInput].forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.trim();
    });
  });
});
