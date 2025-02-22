# CAPTCHA AI Frontend

A React-based web application for testing and demonstrating CAPTCHA prediction capabilities with a modern, responsive UI.

## Features

- Interactive CAPTCHA testing interface
- Real-time AI predictions
- Attempt history tracking
- Responsive design
- Modern UI components using shadcn/ui

## Tech Stack

- React 18.2
- Vite
- Tailwind CSS
- Lucide React (icons)
- shadcn/ui components
- ESLint

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── alert.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   └── input.jsx
│   │   ├── CaptchaForm.jsx
│   │   └── CaptchaHistory.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/captcha-ai-frontend.git
cd captcha-ai-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Components

### CaptchaForm

Main component for CAPTCHA interaction:
- Displays current CAPTCHA image
- Handles user input
- Shows AI predictions
- Manages verification process

```jsx
<CaptchaForm />
```

### CaptchaHistory

Displays history of CAPTCHA attempts:
- Shows past CAPTCHA images
- Records user inputs
- Tracks success/failure
- Allows revisiting previous attempts

```jsx
<CaptchaHistory attempts={attempts} onAttemptClick={handleAttemptClick} />
```

## API Integration

The frontend communicates with the backend using these endpoints:

1. Get Random CAPTCHA:
```javascript
await fetch('http://localhost:5000/api/captcha/random')
```

2. Verify CAPTCHA:
```javascript
await fetch('http://localhost:5000/api/captcha/verify', {
  method: 'POST',
  body: JSON.stringify({
    text: userInput,
    imageFile: captchaPath
  })
})
```

## Styling

### Tailwind Configuration

Custom theme configuration in `tailwind.config.js`:
- Custom colors
- Animations
- Extended utilities

### UI Components

Built using shadcn/ui with customizable variants:
- Alert
- Button
- Card
- Input

## Development

1. Lint code:
```bash
npm run lint
```

2. Build for production:
```bash
npm run build
```

3. Preview production build:
```bash
npm run preview
```

## ESLint Configuration

Configured with:
- React plugin
- React Hooks plugin
- React Refresh plugin
- JSX runtime rules

## State Management

Uses React's built-in state management:
- `useState` for local component state
- `useEffect` for side effects
- Props for component communication

## Deployment

1. Build the application:
```bash
npm run build
```

2. Configure environment variables:
   - `VITE_API_URL`: Backend API URL
   - Other configuration as needed

3. Deploy the `dist` directory to your hosting service

## Best Practices

1. Component Structure:
   - Single responsibility principle
   - Reusable components
   - Proper prop typing

2. Performance:
   - Lazy loading when needed
   - Memoization for expensive operations
   - Proper key usage in lists

3. Error Handling:
   - User feedback for errors
   - Graceful fallbacks
   - Loading states

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox usage
- ES6+ features

## License

MIT License - Feel free to use this code for your own projects.
