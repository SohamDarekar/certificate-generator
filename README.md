# IEEE VSIT Workshop Certificate Generator

This project is a certificate generator for IEEE VSIT workshop attendees. It allows verified attendees to generate and download personalized participation certificates by entering their name and a unique code.

## Features

- **Flexible Name Matching**: The system accepts different capitalizations of names (e.g., "Soham Darekar", "soham darekar", "SOHAM DAREKAR")
- **Case-Insensitive Roll Numbers**: Roll numbers work regardless of letter casing (e.g., "24302F0019", "24302f0019", "24302F0019")
- **Secure Verification**: Both name and roll number must match our attendee database
- **Instant Certificate Generation**: Download your PDF certificate immediately
- **Professional Format**: High-quality certificates suitable for portfolios

## Quick Start

To run the project locally:

1. **Backend**
   - Open a terminal and navigate to the backend directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Make sure you have added your certificate template as `certificate-template.png` and updated `attendees.json`.
   - Start the backend server:
     ```
     npm start
     ```
   - The backend will run at [http://localhost:3000](http://localhost:3000) by default.

2. **Frontend**
   - From the project root directory, run:
     ```
     npm install --prefix frontend
     npm start
     ```
   - This will start the frontend dev server (React) from the root folder.
   - Make sure the `API_URL` in `frontend/src/services/certificateApi.js` or `frontend/script.js` is set to `http://localhost:3000`.

You can now fill in your name and code to generate and download your certificate.

**Note**: Both name and roll number matching are case-insensitive, so "Soham Darekar" with "24302F0019" will work the same as "soham darekar" with "24302f0019".

## Project Structure

```
certificate-generator/
├── backend/
│   ├── attendees.json          # List of attendees with their unique codes
│   ├── certificate-template.png # Certificate template image
│   ├── generate.js             # Express server for certificate generation
│   └── package.json            # Backend dependencies
├── frontend/
│   ├── index.html              # Main HTML file
│   ├── style.css               # Styles for the frontend
│   └── script.js               # Frontend JavaScript
└── README.md                   # This file
```

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- A certificate template (PNG format)

## Setup Instructions

### Step 1: Prepare the certificate template

1. Create a certificate template as a PNG file
2. Place it in the `backend` folder as `certificate-template.png`

### Step 2: Set up the backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update the `attendees.json` file with the list of valid attendees and their unique codes:
   ```json
   [
     {
       "name": "Attendee Name",
       "code": "UNIQUE-CODE-001"
     },
     ...
   ]
   ```

4. Start the server:
   ```
   npm start
   ```

   The server will run on http://localhost:3000 by default.

### Step 3: Set up the frontend

1. In the `frontend/script.js` file, update the `API_URL` to point to your backend server:
   ```javascript
   // For development
   let API_URL = 'http://localhost:3000';
   
   // For production (when deployed)
   // API_URL = 'https://your-render-app-name.onrender.com';
   ```

2. Open `index.html` in a browser to test the application locally

## Deployment Instructions

### Deploying the Backend to Render

1. Create a free account on [Render](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository (after pushing this code to GitHub)
4. Configure the service:
   - **Name**: `certificate-generator-backend` (or any name you prefer)
   - **Build Command**: `npm install`
   - **Start Command**: `node generate.js`
   - **Environment Variables**: Add `PORT=10000` (Render uses this port by default)
5. Click "Create Web Service"

### Deploying the Frontend to Netlify

1. Create a free account on [Netlify](https://www.netlify.com/)
2. Update the `API_URL` in `script.js` to point to your Render backend URL:
   ```javascript
   let API_URL = 'https://your-render-app-name.onrender.com';
   ```
3. From the Netlify dashboard, click "Add new site" > "Import an existing project"
4. Connect to your GitHub repository
5. Configure build settings:
   - **Publish directory**: `frontend`
   - No build command needed
6. Click "Deploy site"

## Managing Attendees

To add or modify the list of attendees:

1. Edit the `backend/attendees.json` file
2. Each attendee needs:
   - `name`: Full name of the attendee (exact format for certificate)
   - `code`: A unique code (you can follow any format, e.g., `25302D0052`)
3. After updating the file, redeploy the backend to Render if already deployed

**Name & Roll Number Matching**: The system automatically handles different capitalizations for both fields:
- Names: "Soham Darekar", "soham darekar", "SOHAM DAREKAR" all work
- Roll Numbers: "24302F0019", "24302f0019", "24302F0019" all work

## Customizing the Certificate

To adjust the positioning of the name on the certificate:

1. Open `backend/generate.js`
2. Find the section where the name is added to the PDF:
   ```javascript
   page.drawText(name, {
     x: (page.getWidth() - textWidth) / 2,
     y: page.getHeight() * 0.4, // Adjust this value to move the name up or down
     size: fontSize, // Adjust this value to change the font size
     font: font,
     color: rgb(0, 0, 0),
   });
   ```
3. Modify the `y` position and `fontSize` as needed to match your certificate template

## Troubleshooting

- **Certificate name not positioned correctly**: Adjust the `y` coordinate in `generate.js`
- **Name/Roll number not found**: Both systems are case-insensitive, but check spelling carefully
- **Verification failing**: Check that both name and roll number match with `attendees.json` (both are case-insensitive)
- **CORS errors**: Make sure your Render backend URL is configured correctly in `script.js`
- **PDF generation failing**: Verify that the certificate template file path is correct

### Need Help with Certificate Generation?

If you have attended the event and still can't generate your certificate, please contact:

- **Soham Darekar (IEEE Chairperson)**: +91 8692811341
- **Shaunik Virdi (IEEE Vice-Chairperson)**: +91 90826 98665
- **Rishi Desai (IEEE General Secretary)**: +91 8169775426

## Security Considerations

- The attendee list is kept securely on the backend
- Both name and code must match for certificate generation
- Input validation is performed on both frontend and backend

## License

This project is free to use and modify for educational purposes.
