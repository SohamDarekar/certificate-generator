const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://certificate-generator-3m2v.onrender.com'
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
      return res.status(400).json({ error: "Name and code are required" });
    }

    // Verify attendee
    const attendees = getAttendees();
    const attendee = attendees.find(
      (a) => a.name.toLowerCase() === name.toLowerCase() && a.code === code
    );
    if (!attendee) {
      console.log("Attendee not found or code mismatch:", { name, code });
      return res.status(400).json({ error: "Invalid name or code" });
    }

    // Create PDF certificate
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 landscape

    // Add title and text
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 24;

    const titleText = "IEEE WIE Day Workshop Certificate of Participation";
    const titleWidth = font.widthOfTextAtSize(titleText, fontSize);

    page.drawText(titleText, {
      x: (page.getWidth() - titleWidth) / 2,
      y: page.getHeight() - 100,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    const text = "This is to certify that";
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    page.drawText(text, {
      x: (page.getWidth() - textWidth) / 2,
      y: page.getHeight() * 0.6,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Add attendee name
    const nameText = attendee.name;
    const nameWidth = font.widthOfTextAtSize(nameText, fontSize * 1.5);

    page.drawText(nameText, {
      x: (page.getWidth() - nameWidth) / 2,
      y: page.getHeight() * 0.5,
      size: fontSize * 1.5,
      font: font,
      color: rgb(0, 0, 0),
    });

    const participationText =
      "has participated in the IEEE WIE Day Workshop on June 19, 2025";
    const participationWidth = font.widthOfTextAtSize(
      participationText,
      fontSize
    );

    page.drawText(participationText, {
      x: (page.getWidth() - participationWidth) / 2,
      y: page.getHeight() * 0.4,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Log download event
    console.log(
      `Certificate downloaded: Name="${attendee.name}", Code="${attendee.code}"`
    );

    // Send PDF as response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${encodeURIComponent(
        nameText
      )}_certificate.pdf`,
      "Content-Length": pdfBytes.length,
    });

    res.send(Buffer.from(pdfBytes));
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
