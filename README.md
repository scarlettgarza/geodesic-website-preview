# Website Template - Getting Started Guide

A modern, responsive React website template with Tailwind CSS v4, Framer Motion animations, and an easy-to-customize design system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)

# After Node.js is installed, run:
npm install -g yarn

# Verify installation:
yarn --version

### Installation & Running

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
yarn build

# Preview production build locally
yarn preview
```

## 🎨 Customizing Your Site

### Changing Colors and Fonts

All design tokens are centralized in **two locations** that stay in sync:

#### 1. JavaScript Configuration (`src/config/theme.js`)
```javascript
export const theme = {
  colors: {
    primary: '#3B82F6',      // Change your primary color
    secondary: '#8B5CF6',    // Change your secondary color
    accent: '#F59E0B',       // Change your accent color
    // ... more colors
  },
  fonts: {
    heading: '"Inter", system-ui, sans-serif',  // Heading font
    body: '"Inter", system-ui, sans-serif',     // Body font
  }
};
```

#### 2. CSS Variables (`src/index.css`)
```css
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  /* Update these to match theme.js */
}
```

**Usage in components:**
```jsx
<div className="bg-primary text-white">
  <h1 className="font-heading">Hello World</h1>
</div>
```

### Changing Site Content

#### Update Brand Name
1. Open `src/components/layout/Header.jsx`
2. Find `"Your Brand"` and replace with your company name
3. Repeat in `src/components/layout/Footer.jsx`

#### Update Home Page Content
1. Open `src/pages/Home.jsx`
2. Update the hero section text:
   ```jsx
   <h1>Your New Headline</h1>
   <p>Your new description...</p>
   ```
3. Customize features array with your actual features

#### Update Contact Information
1. Open `src/pages/Contact.jsx`
2. Update email, phone, address in the contact info section
3. Update social media links in Footer.jsx

## 📁 Folder Structure

```
src/
├── config/
│   └── theme.js              # Global theme configuration
├── components/
│   ├── layout/
│   │   ├── Header.jsx        # Site header/navigation
│   │   └── Footer.jsx        # Site footer
│   └── common/
│       ├── Button.jsx        # Reusable button component
│       └── PageTransition.jsx # Page transition wrapper
├── pages/
│   ├── Home.jsx               # Home page
│   ├── Platform.jsx           # Platform page
│   ├── Contact.jsx            # Contact page
│   └── Examples.jsx           # Animation examples
│   ├── ImageExamples.jsx      # Image Examples
│   └── TypographyExamples.jsx # Text examples
├── utils/
│   ├── animations.js         # Basic animations
│   ├── hoverEffects.js       # Hover animations
│   ├── scrollAnimations.js  # Scroll-triggered animations
│   └── pageTransitions.js    # Page transition variants
├── App.jsx                   # Main app with routes
├── main.jsx                  # Entry point
└── index.css                 # Global styles (Tailwind)
```

## 📄 Adding New Pages

### Step 1: Create the Page Component
Create a new file in `src/pages/`, e.g., `Services.jsx`:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const Services = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="container mx-auto px-spacing-md py-spacing-xl"
    >
      <h1 className="font-heading text-4xl font-bold text-text mb-spacing-md">
        Our Services
      </h1>
      <p className="font-body text-text-light">
        Your content here...
      </p>
    </motion.div>
  );
};

export default Services;
```

### Step 2: Add Route to App.jsx
```jsx
import Services from './pages/Services';

// In the Routes section:
<Route path="/services" element={<Services />} />
```

### Step 3: Add to Navigation
In `src/components/layout/Header.jsx`:
```javascript
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' }, // Add this
  { href: '/contact', label: 'Contact' },
];
```

## 🎬 Using Animations

### Basic Animations
```jsx
import { fadeInUp, slideInLeft } from '../utils/animations';

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
>
  Content fades in from below
</motion.div>
```

### Scroll-Triggered Animations
```jsx
import { scrollFadeIn, viewportConfig } from '../utils/scrollAnimations';

<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={viewportConfig.once}
  variants={scrollFadeIn}
>
  Animates when scrolled into view
</motion.section>
```

### Hover Effects
```jsx
import { cardHover } from '../utils/hoverEffects';

<motion.div whileHover="hover" variants={cardHover}>
  Hover me!
</motion.div>
```

### Stagger Animations (Multiple Items)
```jsx
import { staggerContainer, fadeInUp } from '../utils/animations';

<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map((item, i) => (
    <motion.div key={i} variants={fadeInUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**See live examples at `/examples` page!**

## 🧩 Creating New Components

### Example: Creating a Card Component

1. Create `src/components/common/Card.jsx`:
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '../../utils/hoverEffects';

const Card = ({ title, description, icon }) => {
  return (
    <motion.div
      whileHover="hover"
      variants={cardHover}
      className="p-spacing-lg bg-white rounded-lg shadow-md"
    >
      {icon && <div className="text-4xl mb-spacing-sm">{icon}</div>}
      <h3 className="font-heading text-xl font-semibold text-text mb-spacing-xs">
        {title}
      </h3>
      <p className="font-body text-text-light">{description}</p>
    </motion.div>
  );
};

export default Card;
```

2. Use it in your pages:
```jsx
import Card from '../components/common/Card';

<Card
  icon="⚡"
  title="Fast Performance"
  description="Lightning-fast load times"
/>
```

## 📝 Common Tasks

### Adding Images

1. **Place image in `src/assets/`**
   ```
   src/assets/logo.png
   ```

2. **Import and use:**
   ```jsx
   import logo from '../assets/logo.png';

   <img src={logo} alt="Company Logo" className="w-32 h-32" />
   ```

### Changing Text Content

All text content is in the page components. Simply find the text and update it:
- **Home Page**: `src/pages/Home.jsx`
- **About Page**: `src/pages/About.jsx`
- **Contact Page**: `src/pages/Contact.jsx`

### Changing Fonts

1. **Google Fonts:**
   - Visit [Google Fonts](https://fonts.google.com/)
   - Select your font
   - Copy the `<link>` tag to `index.html`
   - Update `src/config/theme.js` and `src/index.css`

2. **Example with Poppins:**
   ```css
   /* index.css */
   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

   @theme {
     --font-heading: 'Poppins', sans-serif;
     --font-body: 'Poppins', sans-serif;
   }
   ```

### Using Tailwind Utility Classes

Common classes you'll use:
```jsx
// Spacing
className="p-spacing-md m-spacing-lg gap-spacing-sm"

// Colors
className="bg-primary text-white hover:bg-accent"

// Typography
className="font-heading text-4xl font-bold"

// Layout
className="flex flex-col md:flex-row items-center justify-between"

// Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## 🔧 Available Scripts

```bash
# Development
yarn dev          # Start dev server with hot reload

# Production
yarn build        # Build for production
yarn preview      # Preview production build locally

# Code Quality
yarn lint         # Run ESLint
```

## 📚 Tech Stack

- **React 19.1.1** - UI framework
- **Vite 7.1.7** - Build tool
- **Tailwind CSS 4.1.14** - Styling
- **Framer Motion 12.23.24** - Animations
- **React Router 7.9.4** - Routing

## 🎯 Key Features

✅ Fully responsive design
✅ Modern animations with Framer Motion
✅ Centralized theme configuration
✅ Mobile-friendly navigation
✅ Scroll-triggered animations
✅ Page transitions
✅ Reusable components
✅ Easy to customize

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js or kill process on port 5173
```

### Animations Not Working
- Make sure Framer Motion is installed: `yarn add framer-motion`
- Check that imports are correct
- Verify motion.div is used (not regular div)

### Styles Not Applying
- Clear browser cache
- Restart dev server
- Check Tailwind class names are correct
- Ensure theme CSS variables are defined

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules
rm -rf dist
yarn install
yarn build
```

## 📖 Additional Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Router Docs](https://reactrouter.com/)
- [Vite Docs](https://vitejs.dev/)

## 🤝 Support

For questions or issues:
1. Check the `/examples` page for animation references
2. Review component files for usage examples
3. Consult the documentation links above

---

**Happy Building! 🚀**