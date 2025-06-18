# Interactive Storytelling Platform

A platform for creating, sharing, and enjoying interactive stories for children.

## Features

- Interactive stories with multiple choice paths
- User authentication and profiles
- Story creation and management
- Admin dashboard for content moderation
- Multi-language support
- AI-powered story generation using Google's Gemini API

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI Integration**: Google Gemini API

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (optional, can run in development mode without it)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/story-telling.git
   cd story-telling
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   ```
   cp .env.example .env
   ```
   Then edit `.env` to add your API keys and configuration.

4. Start the development server
   ```
   npm run dev
   ```

### Running in Development Mode

- Frontend only: `npm run dev:client`
- Backend only: `npm run dev:server`
- Both: `npm run dev`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3005
MONGODB_URI=mongodb://localhost:27017/storytelling-platform
FRONTEND_URL=http://localhost:5173
SKIP_MONGODB=true  # Set to 'true' to run without MongoDB
GOOGLE_API_KEY=your_google_api_key_here
JWT_SECRET=your_jwt_secret_here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
