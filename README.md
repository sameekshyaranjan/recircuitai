# ReCircuit AI ♻️

ReCircuit AI is a GenAI-powered platform designed to tackle the global e-waste crisis. It allows users to upload images of discarded electronics and uses Google's Gemini Vision AI to instantly determine whether the components should be reused, repaired, or safely recycled.

*(Note: This project is currently in active development. The backend architecture and core AI integration are currently implemented.)*

## 🚀 Current Features

- **Robust REST API:** Built with Node.js and Express, utilizing a highly scalable MVC architecture.
- **Memory-Efficient File Handling:** Uses `multer` to handle `multipart/form-data`. Images are kept in memory buffers rather than written to disk, ensuring maximum serverless compatibility.
- **Cloud Storage Integration:** Streams image buffers directly to **ImageKit** for fast, reliable CDN hosting.
- **Vision AI Integration:** Integrates Google's `gemini-flash-latest` multimodal AI to analyze electronic components.
- **Strict Prompt Engineering:** The AI is engineered to return strictly typed JSON payloads containing fields like `reuseScore`, `hazardLevel`, and `diyIdeas`.
- **High-Performance Execution:** Uses `Promise.all()` to execute both the cloud upload and the AI vision analysis simultaneously in parallel, cutting API latency by ~50%.
- **Centralized Error Handling:** Global middleware to catch and format API errors cleanly.

## 🛠️ Tech Stack (Backend)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **AI:** Google Generative AI (Gemini Flash)
- **Cloud Storage:** ImageKit
- **File Uploads:** Multer

## 📂 Project Structure

```text
ReCircuit-AI/
├── backend/
│   ├── src/
│   │   ├── config/        # DB & ImageKit configurations
│   │   ├── controllers/   # API request handlers
│   │   ├── middleware/    # Global error handlers & Multer config
│   │   ├── routes/        # Express routers
│   │   └── services/      # Cloud & AI streaming logic
│   ├── app.js             # Express app setup
│   └── server.js          # Server entry point
└── package.json           # Root shortcut scripts
```

## 🔌 API Endpoints

### `POST /api/upload`
Uploads an image of an electronic component, stores it in ImageKit, and returns a Gemini AI analysis.

**Form-Data Payload:**
- `image`: File (jpg, png, webp)

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Image uploaded and analyzed successfully!",
  "imageUrl": "https://ik.imagekit.io/.../recircuit_uploads/...",
  "cloudId": "...",
  "originalName": "arduino.jpg",
  "analysis": {
    "componentName": "Arduino Uno",
    "category": "Microcontroller",
    "reuseScore": 95,
    "hazardLevel": "Low",
    "repairable": true,
    "resaleValue": "$10-$15",
    "diyIdeas": [
      "Build a smart plant watering system",
      "Create a custom macro keyboard"
    ],
    "safetyInstructions": "Handle carefully to avoid static discharge. No toxic materials."
  }
}
```

## ⚙️ Local Setup & Installation

**1. Clone the repository:**
```bash
git clone https://github.com/sameekshyaranjan/recircuitai.git
cd recircuitai
```

**2. Install dependencies:**
```bash
npm run install-backend
```

**3. Configure Environment Variables:**
Create a `.env` file inside the `backend` folder and add your specific credentials:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

GEMINI_API_KEY=your_gemini_api_key
```

**4. Start the development server:**
*(You can run this from the root folder)*
```bash
npm run dev
```
