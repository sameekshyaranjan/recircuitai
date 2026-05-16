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
- **Database Persistence & Cloud Rollback:** AI scans are permanently stored in MongoDB. If the database save fails, an automated webhook forcefully deletes the orphaned image from ImageKit to preserve cloud storage.
- **Secure Authentication:** JWT-based stateless authentication system. Uses Mongoose `pre('save')` hooks to automatically hash passwords with `bcryptjs` before they hit the database.
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
│   │   ├── models/        # Mongoose database schemas (User, Scan)
│   │   ├── routes/        # Express routers
│   │   ├── services/      # Cloud & AI streaming logic
│   │   └── utils/         # Helper functions (JWT generators)
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
  "message": "Image uploaded, analyzed, and saved to database successfully!",
  "data": {
    "imageUrl": "https://ik.imagekit.io/.../recircuit_uploads/...",
    "cloudId": "...",
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
    "safetyInstructions": "Handle carefully...",
    "_id": "60d5ec49b392...",
    "createdAt": "2026-05-14T..."
  }
}
```

### `POST /api/auth/register`
Registers a new user (hashes password securely via Mongoose hook) and returns a JSON Web Token.

**JSON Payload:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "_id": "60d5ec49b392...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### `POST /api/auth/login`
Authenticates a user via email/password and returns a JSON Web Token.

**JSON Payload:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "_id": "60d5ec49b392...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d
```

**4. Start the development server:**
*(You can run this from the root folder)*
```bash
npm run dev
```
