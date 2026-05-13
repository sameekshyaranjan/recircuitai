# ReCircuit AI

# AI-Powered E-Waste Reuse & Recycling Platform

---

# PROJECT OVERVIEW

ReCircuit AI is a GenAI-powered MERN application that helps users identify old electronic components and determine whether they can be:
- reused
- repaired
- recycled
- safely disposed

Users upload images of electronics/components.

AI analyzes:
- component name
- category
- reusability
- hazard level
- repairability
- resale value
- DIY project ideas
- safety instructions

---

# MAIN TECH STACK

## Backend
- Node.js
- Express.js

## Frontend
- React.js
- Vite
- Tailwind CSS

## Database
- MongoDB Atlas
- Mongoose

## AI
- Gemini Vision API

## File Upload
- Multer
- Cloudinary

## Authentication
- JWT
- bcryptjs

## Testing
- Postman

## Deployment
- Render
- Vercel

---

# COMPLETE DEVELOPMENT ROADMAP

IMPORTANT:
Build phase-by-phase.

DO NOT SKIP PHASES.

Every phase teaches:
- backend
- frontend
- APIs
- AI workflows
- deployment
- interview concepts

---

# ====================================================
# PART 1 — BACKEND DEVELOPMENT
# ====================================================

---

# PHASE 1 — PROJECT INITIALIZATION

## Goal
Setup project environment.

## Tasks
- Create GitHub repo
- Create backend folder
- Initialize npm
- Install dependencies
- Setup nodemon

## Commands

```bash
mkdir ReCircuit-AI
cd ReCircuit-AI

mkdir backend
cd backend

npm init -y
```

## Install Packages

### Main Packages

```bash
npm install express mongoose dotenv cors multer
```

### Dev Packages

```bash
npm install -D nodemon
```

## Concepts Learned
- npm
- package.json
- dependencies
- dev dependencies

## Interview Topics
- What is npm?
- package.json
- dependency management

---

# PHASE 2 — EXPRESS SERVER SETUP

## Goal
Create first Express backend.

## Features
- app.js
- server.js
- Express server
- Basic route

## APIs

```http
GET /
```

## Expected Response

```json
{
  "success": true,
  "message": "ReCircuit AI API Running"
}
```

## Concepts Learned
- Express basics
- Request-response cycle
- Middleware
- app.use()

## Interview Topics
- What is Express?
- Middleware
- Request lifecycle

---

# PHASE 3 — BACKEND ARCHITECTURE

## Goal
Setup scalable architecture.

## Folder Structure

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── utils/
│
├── uploads/
│
├── .env
├── .gitignore
├── app.js
├── server.js
└── package.json
```

## Concepts Learned
- MVC architecture
- Modular backend
- Scalability

## Interview Topics
- MVC pattern
- Why modular structure?

---

# PHASE 4 — MONGODB CONNECTION

## Goal
Connect MongoDB Atlas.

## Features
- Mongoose setup
- DB connection file
- Environment variables

## Tasks
- Create Atlas cluster
- Create DB user
- Add connection string

## Concepts Learned
- NoSQL databases
- Mongoose
- Async-await

## Interview Topics
- MongoDB vs SQL
- What is Mongoose?

---

# PHASE 5 — POSTMAN API TESTING

## Goal
Learn backend testing.

## Features
- API testing
- HTTP methods
- Headers
- JSON body testing

## Tasks
- Test GET routes
- Test POST requests

## Concepts Learned
- REST APIs
- HTTP methods
- Status codes

## Interview Topics
- GET vs POST
- REST API

---

# PHASE 6 — ROUTES & CONTROLLERS

## Goal
Separate routes and controllers.

## Features
- Route files
- Controller files

## APIs

```http
GET /api/test
POST /api/test
```

## Concepts Learned
- Route-controller flow
- API structure

## Interview Topics
- Controllers
- REST conventions

---

# PHASE 7 — ERROR HANDLING

## Goal
Production-ready error architecture.

## Features
- Global error middleware
- try-catch
- Centralized errors

## Concepts Learned
- Express error handling
- Middleware chaining

## Interview Topics
- Error middleware

---

# PHASE 8 — FILE UPLOAD SYSTEM

## Goal
Accept image uploads.

## Features
- Multer
- Upload middleware
- multipart/form-data

## APIs

```http
POST /api/upload
```

## Concepts Learned
- File uploads
- Multer
- multipart/form-data

## Interview Topics
- How multer works

---

# PHASE 9 — CLOUDINARY INTEGRATION

## Goal
Store uploaded images in cloud.

## Workflow

```text
Upload
→ Backend
→ Cloudinary
```

## Features
- Cloudinary config
- Upload service
- Image URLs

## Concepts Learned
- Cloud storage
- CDN basics

## Interview Topics
- Why cloud storage?

---

# PHASE 10A — GEMINI AI SETUP

## Goal
Install SDK and initialize the Gemini Client.

## Features
- @google/generative-ai package
- AI Service file creation
- Basic client setup

## Concepts Learned
- Google AI Studio
- API Client initialization

---

# PHASE 10B — AI PROMPT ENGINEERING

## Goal
Write the system instructions for the AI.

## Features
- Multiline string formatting
- Forcing JSON output
- Defining required fields

## Concepts Learned
- Prompt design for code generation
- Hallucination reduction

---

# PHASE 10C — AI BUFFER STREAMING

## Goal
Pass the image buffer from Multer directly to Gemini.

## Features
- Base64 encoding
- MimeType mapping
- generateContent() method

## Concepts Learned
- Multimodal Vision Models
- Inline Data objects

---

# PHASE 10D — PARALLEL EXECUTION

## Goal
Combine Cloud Upload and AI Analysis efficiently.

## Features
- Promise.all()
- Controller integration
- Combined JSON Response

## Concepts Learned
- Node.js parallel execution
- Reducing API latency

---

# PHASE 11 — AI PROMPT ENGINEERING

## Goal
Improve AI reliability.

## Features
- JSON-only responses
- Structured prompts
- Hallucination reduction

## Concepts Learned
- Prompt design
- AI reliability

## Interview Topics
- Hallucinations
- Structured generation

---

# PHASE 12 — DATABASE MODELS

## Goal
Create database schemas.

## Models
- User
- Scan

## Scan Schema

```js
{
  user,
  imageUrl,
  componentName,
  category,
  reuseScore,
  hazardLevel,
  repairable,
  resaleValue,
  diyIdeas,
  safetyInstructions,
  aiRawResponse
}
```

## Concepts Learned
- Schema design
- Relationships
- Validation

## Interview Topics
- Schema vs model

---

# PHASE 13 — SAVE AI ANALYSIS

## Goal
Store AI results in MongoDB.

## APIs

```http
POST /api/scans/analyze
GET /api/scans/history
GET /api/scans/:id
```

## Workflow

```text
Upload
→ AI Analysis
→ Save DB
→ Return Response
```

## Concepts Learned
- Full backend workflow

---

# PHASE 14 — AUTHENTICATION SYSTEM

## Goal
Add user accounts.

## Features
- Register
- Login
- JWT auth
- Password hashing

## APIs

```http
POST /api/auth/register
POST /api/auth/login
```

## Concepts Learned
- Authentication
- Authorization
- JWT
- bcrypt

## Interview Topics
- JWT flow

---

# PHASE 15 — PROTECTED ROUTES

## Goal
Secure backend APIs.

## Features
- Auth middleware
- Protected endpoints

## Concepts Learned
- Authorization middleware

## Interview Topics
- Access tokens

---

# PHASE 16 — USER DASHBOARD APIs

## Goal
Create dashboard backend.

## Features
- Scan history
- User profile
- Recent activity

## APIs

```http
GET /api/users/profile
GET /api/scans/history
```

---

# PHASE 17 — RECYCLING CENTER APIs

## Goal
Add sustainability features.

## Features
- Nearby recycling centers
- Disposal guidance

## APIs
- Google Maps API
OR
- OpenStreetMap

## Concepts Learned
- Third-party APIs

---

# PHASE 18 — BACKEND SECURITY

## Goal
Production-level security.

## Features
- Helmet
- Rate limiting
- Validation
- CORS configuration

## Concepts Learned
- API security

## Interview Topics
- Rate limiting

---

# PHASE 19 — BACKEND DEPLOYMENT

## Goal
Deploy backend publicly.

## Platform
- Render

## Concepts Learned
- Environment variables
- Production deployment

---

# ====================================================
# PART 2 — FRONTEND DEVELOPMENT
# ====================================================

---

# PHASE 20 — REACT SETUP

## Goal
Initialize React frontend.

## Tasks

```bash
npm create vite@latest
```

## Install Packages

```bash
npm install axios react-router-dom framer-motion
```

## Setup Tailwind CSS

## Concepts Learned
- React setup
- SPA architecture

---

# PHASE 21 — FRONTEND ARCHITECTURE

## Goal
Create scalable frontend structure.

## Folder Structure

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── hooks/
│   └── utils/
```

## Concepts Learned
- Frontend scalability

---

# PHASE 22 — BASIC UI PAGES

## Goal
Create core pages.

## Pages
- Home
- Upload
- Results
- About

## Components
- Navbar
- UploadCard
- ResultCard

## Concepts Learned
- Components
- JSX
- Props

## Interview Topics
- Props vs state

---

# PHASE 23 — API INTEGRATION

## Goal
Connect frontend with backend.

## Features
- Axios
- API calls
- Loading states
- Error handling

## Workflow

```text
Frontend
→ Backend API
→ Response
```

## Concepts Learned
- Async frontend
- API integration

---

# PHASE 24 — DISPLAY AI RESULTS

## Goal
Show AI analysis visually.

## Features
- Reuse score UI
- Safety warnings
- DIY project cards
- Hazard indicators

## Concepts Learned
- Conditional rendering

---

# PHASE 25 — AUTH FRONTEND

## Goal
Build authentication UI.

## Pages
- Login
- Register

## Features
- JWT storage
- Protected routes

## Concepts Learned
- Auth flow

---

# PHASE 26 — DASHBOARD FRONTEND

## Goal
Build user dashboard.

## Features
- Scan history
- User profile
- Recent activity

## Concepts Learned
- State management

---

# PHASE 27 — FRONTEND POLISHING

## Goal
Improve UI/UX.

## Features
- Responsive design
- Animations
- Better layouts

## Tools
- Tailwind
- Framer Motion

---

# ====================================================
# PART 3 — DEPLOYMENT & FINALIZATION
# ====================================================

---

# PHASE 28 — FULL STACK CONNECTION

## Goal
Test complete workflow.

## Workflow

```text
Frontend
→ Backend
→ Cloudinary
→ Gemini
→ MongoDB
→ Frontend Result
```

---

# PHASE 29 — DEPLOYMENT

## Goal
Deploy project.

## Deployment

### Frontend
- Vercel

### Backend
- Render

### Database
- MongoDB Atlas

---

# PHASE 30 — README & DOCUMENTATION

## Goal
Make project professional.

## Features
- Setup guide
- Screenshots
- Architecture diagrams
- API documentation

---

# PHASE 31 — INTERVIEW PREPARATION

## Goal
Prepare for interviews.

## Topics

### Backend
- Express
- Middleware
- JWT
- REST APIs

### Database
- MongoDB
- Schema design

### Frontend
- React
- API integration

### AI
- Prompt engineering
- Gemini Vision

### Deployment
- Environment variables

---

# PHASE 32 — ADVANCED FEATURES (OPTIONAL)

## Marketplace
- Sell reusable electronics

## AI Chatbot
- Electronics assistant

## Sustainability Dashboard
- Environmental impact tracking

## Gamification
- Green points
- Eco badges

---

# COMPLETE SYSTEM ARCHITECTURE

```text
                ┌────────────────────┐
                │   React Frontend   │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ Express Backend API│
                └─────────┬──────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼

 ┌────────────┐   ┌──────────────┐   ┌──────────────┐
 │ MongoDB    │   │ Gemini API   │   │ Cloudinary   │
 │ Database   │   │ AI Analysis  │   │ Image Upload │
 └────────────┘   └──────────────┘   └──────────────┘
```

---

# FINAL GOAL

Build:
- a production-level MERN application
- a real-world GenAI project
- a sustainability-focused platform
- a resume-worthy AI product
- a hackathon-ready application
- a strong interview discussion project