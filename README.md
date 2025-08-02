# 🎯 Beautiful Todo List Application

A modern, responsive, and feature-rich todo list application built with React, Vite, and Tailwind CSS. Features beautiful animations, dark mode support, and excellent user experience.

![Todo App Preview](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0.4-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Core Functionality**
- ✅ **Add Tasks**: Beautiful form with animations and validation
- ✅ **Edit Tasks**: Inline editing with keyboard shortcuts (Enter/Escape)
- ✅ **Delete Tasks**: Smooth deletion with confirmation animations
- ✅ **Toggle Completion**: Animated checkboxes with visual feedback
- ✅ **Local Storage**: Automatic data persistence across sessions

### 🌙 **Dark Mode Support**
- ✅ **Theme Toggle**: Sun/moon icon button in the header
- ✅ **System Preference**: Automatically detects user's system theme
- ✅ **Persistent Storage**: Remembers user's theme preference
- ✅ **Smooth Transitions**: Animated theme switching
- ✅ **Accessibility**: WCAG compliant color contrasts in both themes

### 🎯 **Advanced Features**
- ✅ **Task Filtering**: Separate views for All, Active, and Completed tasks
- ✅ **Progress Tracking**: Visual progress bar with completion percentage
- ✅ **Statistics**: Real-time counts for total, active, and completed tasks
- ✅ **Clear Completed**: Bulk removal of finished tasks
- ✅ **Timestamp Tracking**: Creation time for each task

### 🎭 **UI/UX Excellence**
- ✅ **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- ✅ **Beautiful Animations**: Smooth transitions and micro-interactions
- ✅ **Glassmorphism Effects**: Modern backdrop blur and transparency
- ✅ **Gradient Backgrounds**: Animated floating blobs in background
- ✅ **Hover Effects**: Interactive feedback on all elements

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd To-Do_List
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Purple (`#8b5cf6`) to Pink (`#ec4899`) gradients
- **Success**: Green (`#10b981`) for completed tasks
- **Warning**: Red (`#ef4444`) for delete actions
- **Neutral**: Gray scale for text and backgrounds

### **Typography**
- **Font Family**: System UI stack (Avenir, Helvetica, Arial, sans-serif)
- **Headings**: Bold weights with gradient text effects
- **Body Text**: Medium weight for optimal readability

### **Animations**
- **Fade In**: Smooth entrance animations for components
- **Slide In**: Horizontal slide animations for todo items
- **Scale**: Hover effects with subtle scaling
- **Blob**: Floating background animations
- **Check**: Animated checkmark appearance

## 🏗️ Architecture

### **Component Structure**
```
src/
├── components/
│   ├── TodoForm.jsx      # Task input form
│   ├── TodoItem.jsx      # Individual todo item
│   └── TodoList.jsx      # Todo list container
├── contexts/
│   └── ThemeContext.jsx  # Dark/light mode management
├── App.jsx               # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles and animations
```

### **State Management**
- **React Hooks**: useState, useEffect for local state
- **Context API**: Theme management across components
- **Local Storage**: Persistent data storage
- **Props**: Component communication

### **Key Technologies**
- **React 19.1.0**: Latest React with concurrent features
- **Vite 7.0.4**: Fast build tool and development server
- **Tailwind CSS 4.1.11**: Utility-first CSS framework
- **ESLint**: Code quality and consistency

## 🎯 Features in Detail

### **1. Task Management**
- **Add**: Type in the beautiful input field and press Enter or click the + button
- **Edit**: Click the edit icon (pencil) that appears on hover, or double-click the task
- **Delete**: Click the trash icon that appears on hover
- **Complete**: Click the circular checkbox next to any task

### **2. Filtering System**
- **All Tasks**: Shows all tasks in separate Active and Completed sections
- **Active Tasks**: Shows only uncompleted tasks
- **Completed Tasks**: Shows only completed tasks with progress tracking

### **3. Dark Mode**
- **Toggle**: Click the sun/moon icon in the top-right corner
- **Auto-detect**: Automatically matches your system preference
- **Persistent**: Remembers your choice across sessions

### **4. Animations & Transitions**
- **Entrance**: Components fade in with staggered delays
- **Hover**: Subtle scaling and color changes
- **Theme Switch**: Smooth color transitions
- **Task Actions**: Micro-animations for all interactions

## 🔧 Customization

### **Adding New Features**
1. Create new components in the `src/components/` directory
2. Add new context providers in `src/contexts/` if needed
3. Update the main App component to include new features
4. Add corresponding styles in `src/index.css`

### **Modifying Styles**
- **Tailwind Classes**: Modify existing className props
- **Custom CSS**: Add new styles in `src/index.css`
- **Animations**: Create new keyframes in the CSS file
- **Theme Colors**: Update color variables in components

### **Adding New Animations**
```css
@keyframes yourAnimation {
  from {
    /* initial state */
  }
  to {
    /* final state */
  }
}

.your-animation-class {
  animation: yourAnimation 0.5s ease-out forwards;
}
```
## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy to Vercel**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### **Deploy to Netlify**
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

## 🐛 Troubleshooting

### **Common Issues**

**Port already in use**
```bash
# Kill the process using port 5173
npx kill-port 5173
# Then restart the dev server
npm run dev
```

**Dependencies not installing**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors**
```bash
# Clear build cache
npm run build --force
# Check for linting errors
npm run lint
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is open source.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Vite Team**: For the fast build tool
- **Tailwind CSS**: For the utility-first CSS framework
- **Heroicons**: For the beautiful SVG icons

---

Copyright &copy;2025 | All rights reserved.

*Enjoy organizing your tasks with this beautiful and functional todo list application!*
