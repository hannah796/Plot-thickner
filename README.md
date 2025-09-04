# 🎬 Plot Thickener - AI Film Project Management

A React prototype for "Plot Thickener" - an AI-powered film project management tool with a streamlined 6-screen user journey. Features a modern, dark-themed interface with drag & drop file uploads, AI training simulation, and grid-based approval workflows.

![Plot Thickener](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.2-38B2AC) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16-0055FF)

## ✨ Features

- **🎬 6-Screen User Journey**: Landing → Script Upload → Analysis → Train Model → Training Progress → Project Shots
- **🎨 Dark Theme UI**: Navy/charcoal backgrounds with purple accents (#8B5CF6)
- **📁 Drag & Drop Upload**: File upload with progress tracking and validation
- **🤖 AI Training Simulation**: Real-time progress with Nano Banana model
- **✅ Grid-Based Approval**: Batch operations and individual item review
- **📱 Responsive Design**: Works across desktop, tablet, and mobile
- **✨ Smooth Animations**: Framer Motion powered transitions

## 🚀 Live Demo

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/hannah796/Plot-thickner)

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Router** for navigation

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/plot-thickener-prototype.git
cd plot-thickener-prototype
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

4. **Open** [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── ProgressBar.tsx
│   │   └── FileUpload.tsx
│   ├── screens/            # Main application screens
│   │   ├── LandingPage.tsx
│   │   ├── ScriptUpload.tsx
│   │   ├── ScriptAnalysis.tsx
│   │   ├── TrainModel.tsx
│   │   ├── TrainingProgress.tsx
│   │   └── ProjectShots.tsx
│   └── common/             # Shared components
│       └── Header.tsx
├── hooks/                  # Custom React hooks
│   ├── useFileUpload.ts
│   └── useTrainingSimulation.ts
├── types/                  # TypeScript type definitions
│   └── index.ts
├── utils/                  # Utility functions and mock data
│   └── mockData.ts
└── App.tsx                 # Main application component
```

## 🎯 User Flow

### 1. **Landing Page** (`/`)
- Hero section with "Create Show" CTA
- Recent shows grid (4 cards)
- All Shows/Models tabs with project list

### 2. **Script Upload** (`/script-upload`)
- Drag & drop file upload (PDF, TXT, DOCX)
- Cloud storage integration (Google Drive, Dropbox)
- Shows list with management options

### 3. **Script Analysis** (`/script-analysis`)
- Characters extraction (Maya, Kaelen)
- Locations identification (Whispering Woods, Cliffside Village)
- Style detection (Anime-Adventure, Fantasy-High Magic)

### 4. **Train Model** (`/train-model`)
- Upload reference images option
- Generate training images option
- Nano Banana model configuration

### 5. **Training Progress** (`/training-progress`)
- Real-time progress tracking (99% complete)
- Generated samples grid (12 items)
- Approve & continue workflow

### 6. **Project Shots** (`/project-shots`)
- Shot generation with prompts
- LoRA model training
- Upscaling options (2x, 4x)

## 🎨 Design System

### Colors
- **Primary Purple**: `#8B5CF6`
- **Dark Navy**: `#2D3142`, `#1A1D29`
- **Accent Colors**: Soft purple (`#A78BFA`), green success states
- **Text**: White primary, gray-300 secondary

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300-900
- **Sizes**: Responsive scale from 12px to 48px

### Components
- **Border Radius**: 8px for cards, 6px for buttons
- **Spacing**: 16px, 24px, 32px grid system
- **Shadows**: Subtle with purple glow on hover

## 📜 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Figma prototypes
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for the film industry**
