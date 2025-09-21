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
      showMessage('Please enter both your name and roll number', 'error');
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
        
        // Add contact info for certificate-related errors
        if (errorMsg.includes('not found') || 
            errorMsg.includes('haven\'t attended') || 
            errorMsg.includes('Invalid roll') ||
            errorMsg.includes('don\'t match') ||
            errorMsg.includes('required')) {
          errorMsg += '\n\nNote: Both name and roll number matching are case-insensitive.\nIf you attended the event and need help, contact:\nSoham: +91 8692811341 | Shaunik: +91 90826 98665 | Rishi: +91 8169775426';
        }
        
        showMessage(errorMsg, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      let errorMsg = 'An error occurred while connecting to the server';
      errorMsg += '\n\nNote: Both name and roll number matching are case-insensitive.\nIf you attended the event and need help, contact:\nSoham: +91 8692811341 | Shaunik: +91 90826 98665 | Rishi: +91 8169775426';
      showMessage(errorMsg, 'error');
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
