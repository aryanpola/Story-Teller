# Interactive Storytelling Platform

A platform for creating, sharing, and enjoying interactive stories for children ages 5-8.

## Features

- Interactive stories with multiple choice paths
- User authentication and profiles
- Story creation and management
- Admin dashboard for content moderation
- Multi-language support
- AI-powered story generation using Google's Gemini API
- **Child-friendly UI** with bright colors and playful animations

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI Integration**: Google Gemini API

## Design System

### Color Palette
- **Sunshine**: `#FFB703` - Primary bright yellow/orange
- **Ocean**: `#8ECAE6` - Light blue for trust and calm
- **Deep Ocean**: `#219EBC` - Darker blue for contrast
- **Coral**: `#FF6B6B` - Warm red/pink for excitement
- **Lemon**: `#FFD166` - Bright yellow for happiness
- **Mint**: `#06FFA5` - Fresh green for success
- **Lavender**: `#B19CD9` - Soft purple for magic
- **Peach**: `#FFB5A7` - Warm accent color

### Typography
- **Headings**: Baloo 2 (rounded, friendly)
- **Body**: Nunito (clean, readable)
- **Fun Elements**: Fredoka (playful)

### Components
- **StoryCard**: Interactive cards with hover effects and high-resolution images
- **Button**: Pill-shaped buttons with gradients and animations
- **Layout**: Responsive layout with playful wave footer

## Adding High-Resolution Images to Stories

To add new high-resolution images to stories:

1. **Source Images**: Use royalty-free images from:
   - Unsplash (unsplash.com) - search for kid-friendly content
   - unDraw (undraw.co) - illustrations
   - Storyset (storyset.com) - story illustrations

2. **Image Requirements**:
   - Minimum resolution: 1920×1080
   - Format: JPG or PNG
   - Child-appropriate content
   - Bright, colorful, engaging

3. **Update Story Data**:
   ```javascript
   {
     _id: 'story-id',
     title: { en: 'Story Title' },
     thumbnailUrl: 'https://example.com/image-800x600.jpg', // Card display
     image_hd: 'https://example.com/image-1920x1080.jpg',   // Background overlay
     // ... other story properties
   }
   ```

4. **Background Hover Effect**: 
   - The `useBackgroundImageOnHover` hook automatically applies the `image_hd` as a subtle background overlay when hovering over story cards
   - Opacity is set to 0.15 for subtle effect
   - Smooth 500ms transition

## Accessibility Features

- High contrast colors (WCAG AA compliant)
- `prefers-reduced-motion` support for users who prefer less animation
- Proper alt tags for all images
- Focus states with thick, visible outlines
- Large touch targets for mobile devices

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