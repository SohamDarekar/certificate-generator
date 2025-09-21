const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = [
  'https://ieeevsit-certificategenerator.netlify.app', // Netlify frontend
  'https://certificate-generator-3m2v.onrender.com',  // Backend URL (if needed)
];

// Add localhost to allowed origins in development mode
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000', 'http://localhost:3001', 'http://localhost:8080');
}

// Enhanced CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Root endpoint for quick check
app.get("/", (req, res) => {
  res.send("Certificate Generator API is running. Try /api/health");
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Service running" });
});

// Load attendees data
const attendeesPath = path.join(__dirname, "attendees.json");
const getAttendees = () => {
  try {
    return JSON.parse(fs.readFileSync(attendeesPath, "utf8"));
  } catch (error) {
    console.error("Error reading attendees file:", error);
    return [];
  }
};

app.post("/generate-certificate", async (req, res) => {
  try {
    const { name, code } = req.body;
    console.log("Received certificate request:", { name, code });

    if (!name || !code) {
      return res.status(400).json({ error: "Name and roll number are required" });
    }

    // Verify attendee with flexible name and roll number matching
    const attendees = getAttendees();
    
    // Normalize names for comparison (remove extra spaces, convert to lowercase)
    const normalizeNameForComparison = (name) => {
      return name.toLowerCase().replace(/\s+/g, ' ').trim();
    };
    
    // Normalize roll numbers for comparison (convert to uppercase, remove spaces)
    const normalizeCodeForComparison = (code) => {
      return code.toUpperCase().replace(/\s+/g, '').trim();
    };
    
    const normalizedInputName = normalizeNameForComparison(name);
    const normalizedInputCode = normalizeCodeForComparison(code);
    
    // Check if name exists in the database (flexible matching)
    const nameMatch = attendees.find(
      (a) => normalizeNameForComparison(a.name) === normalizedInputName
    );
    
    // Check if code exists in the database (case-insensitive matching)
    const codeExists = attendees.find(
      (a) => normalizeCodeForComparison(a.code) === normalizedInputCode
    );
    
    // Find exact match using flexible name and roll number matching
    const attendee = attendees.find(
      (a) => normalizeNameForComparison(a.name) === normalizedInputName && 
             normalizeCodeForComparison(a.code) === normalizedInputCode
    );
    
    if (!attendee) {
      console.log("Attendee not found or code mismatch:", { name, code });
      
      const contactInfo = "\n\nIf you have attended the event and still can't generate your certificate, please contact:\n• Soham Darekar (IEEE Chairperson): +91 8692811341\n• Shaunik Virdi (IEEE Vice-Chairperson): +91 90826 98665\n• Rishi Desai (IEEE General Secretary): +91 8169775426";
      
      // Provide specific error messages
      if (!nameMatch && !codeExists) {
        return res.status(400).json({ 
          error: "You haven't attended this workshop. Please check your name and roll number." + contactInfo,
          errorCode: "NOT_ATTENDED"
        });
      } else if (!nameMatch) {
        return res.status(400).json({ 
          error: "Name not found in our records. Please check the spelling and try again." + contactInfo,
          errorCode: "NAME_NOT_FOUND"
        });
      } else if (!codeExists) {
        return res.status(400).json({ 
          error: "Invalid roll number. Please check your roll number and try again." + contactInfo,
          errorCode: "INVALID_CODE"
        });
      } else {
        return res.status(400).json({ 
          error: "Attendee not found or roll number mismatch. Please check your details and try again." + contactInfo,
          errorCode: "MISMATCH"
        });
      }
    }

    // === Begin: Custom PDF Generation as per requirements ===
    const { PDFDocument, rgb } = require("pdf-lib");
    const fs = require("fs-extra");
    const path = require("path");
    const fontkit = require("fontkit");

    // Step 1: Create new PDF with exact size
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const page = pdfDoc.addPage([2000, 1414]);

    // Step 2: Embed background template
    const bgBytes = fs.readFileSync(path.join(__dirname, "certificate-template.png"));
    const bgImage = await pdfDoc.embedPng(bgBytes);
    page.drawImage(bgImage, { x: 0, y: 0, width: 2000, height: 1414 });

    // Step 3: Embed fonts
    const ibarraFontBytes = fs.readFileSync(path.join(__dirname, "fonts/IbarraRealNova-VariableFont_wght.ttf"));
    const latoFontBytes = fs.readFileSync(path.join(__dirname, "fonts/Lato-Regular.ttf"));
    const alluraFontBytes = fs.readFileSync(path.join(__dirname, "fonts/Allura-Regular.ttf"));
    const ibarra = await pdfDoc.embedFont(ibarraFontBytes);
    const lato = await pdfDoc.embedFont(latoFontBytes);
    const allura = await pdfDoc.embedFont(alluraFontBytes);

    // Helper for centering text
    function centerX(text, font, size, pageWidth = 2000) {
      const textWidth = font.widthOfTextAtSize(text, size);
      return (pageWidth - textWidth) / 2;
    }

    // Step 4: Overlay text fields (centered and styled)
    // Heading 1
    const heading1 = "CERTIFICATE OF";
    page.drawText(heading1, {
      x: centerX(heading1, ibarra, 98),
      y: 1030,
      size: 98,
      font: ibarra,
      color: rgb(0.23, 0.13, 0.33),
    });
    // Heading 2
    const heading2 = "PARTICIPATION";
    page.drawText(heading2, {
      x: centerX(heading2, ibarra, 98),
      y: 910,
      size: 98,
      font: ibarra,
      color: rgb(0.23, 0.13, 0.33),
    });
    // Subheading
    const subheading = "THIS CERTIFICATE IS PRESENTED TO";
    page.drawText(subheading, {
      x: centerX(subheading, lato, 40),
      y: 810,
      size: 40,
      font: lato,
      color: rgb(0.79, 0.47, 0.09),
    });
    // Participant Name (dynamic, centered)
    const nameFontSize = 190;
    page.drawText(attendee.name, {
      x: centerX(attendee.name, allura, nameFontSize),
      y: 650,
      size: nameFontSize,
      font: allura,
      color: rgb(0.23, 0.13, 0.33),
    });
    // Description (manual wrap, centered)
    const description =
    "For participation in the Gittopia workshop on Git & GitHub, held on September 22nd, 2025, as part of the IEEE Day 2025 celebrations. Organized by the IEEE-VSIT Student Branch in collaboration with the IEEE WIE VSIT Affinity Group.";
    const maxWidth = 1520;
    const lineHeight = 46;
    let descLines = [];
    let words = description.split(' ');
    let currentLine = '';
    for (let i = 0; i < words.length; i++) {
      let testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
      let testWidth = lato.widthOfTextAtSize(testLine, 38);
      if (testWidth > maxWidth && currentLine) {
        descLines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) descLines.push(currentLine);
    descLines.forEach((line, idx) => {
      page.drawText(line, {
        x: centerX(line, lato, 38),
        y: 550 - idx * lineHeight,
        size: 38,
        font: lato,
        color: rgb(0.79, 0.47, 0.09),
      });
    });
    // Signature block left
    const leftSigName = "MAITREYI JOGLEKAR";
    const leftSigTitle = "Branch Counseller, VSIT";
    page.drawText(leftSigName, {
      x: 370,
      y: 220,
      size: 32,
      font: lato,
      color: rgb(0.23, 0.13, 0.33),
    });
    page.drawText(leftSigTitle, {
      x: 400,
      y: 180,
      size: 23,
      font: lato,
      color: rgb(0.79, 0.47, 0.09),
    });
    // Signature block right
    const rightSigName = "DR. ROHINI KELKAR";
    const rightSigTitle = "Principal, VSIT";
    page.drawText(rightSigName, {
      x: 1330,
      y: 220,
      size: 32,
      font: lato,
      color: rgb(0.23, 0.13, 0.33),
    });
    page.drawText(rightSigTitle, {
      x: 1400,
      y: 180,
      size: 23,
      font: lato,
      color: rgb(0.79, 0.47, 0.09),
    });

    // Step 5: Save and output
    const pdfBytes = await pdfDoc.save();
    const safeName = attendee.name.replace(/\s+/g, '_');
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${encodeURIComponent(safeName)}_certificate.pdf`,
      "Content-Length": pdfBytes.length,
    });
    res.send(Buffer.from(pdfBytes));
    // === End: Custom PDF Generation ===
  } catch (error) {
    console.error("Error generating certificate:", error);
    res.status(500).json({ error: "Failed to generate certificate" });
  }
});

// Start server with error handling
const startServer = (port) => {
  const server = app
    .listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${port} is busy, trying port ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error("Server error:", err);
      }
    });
};

startServer(PORT);
