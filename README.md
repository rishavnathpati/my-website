# Portfolio Website - Rishav Nath Pati

A modern, interactive portfolio website built with Next.js 15, showcasing game development, interactive media, and machine learning projects. Features an interactive terminal interface, animated sections, and a comprehensive blog system.

## 🚀 Features

- **Interactive Terminal**: Built-in terminal emulator with custom commands
- **Animated Sections**: Smooth animations using Framer Motion
- **Blog System**: MDX-powered blog with syntax highlighting
- **Portfolio Showcase**: Dynamic portfolio with categorized projects
- **Responsive Design**: Mobile-first approach with desktop sidebar
- **Performance Optimized**: Next.js 15 with App Router, image optimization, and caching
- **Dark Theme**: Fixed dark theme with custom CSS variables
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Content**: MDX with gray-matter
- **Animations**: Framer Motion
- **Fonts**: Geist Sans & Mono
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── sections/          # Page sections
│   └── easter-eggs/       # Interactive elements
├── lib/                   # Utilities and business logic
│   ├── commands/          # Terminal command system
│   ├── data/              # Static data files
│   └── config/            # Configuration files
├── content/               # MDX blog posts
└── hooks/                 # Custom React hooks
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes sitemap generation)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sitemap` - Generate sitemap.xml
- `npm run build:analyze` - Analyze bundle size

## 🖥️ Terminal Commands

The website includes an interactive terminal with the following commands:

- `help` - Show available commands
- `about` - Display about information
- `skills` - List technical skills
- `projects` - Browse portfolio projects
- `blog` - View recent blog posts
- `contact` - Get contact information
- `terminal` - Open full-screen terminal
- `clear` - Clear terminal output

## 📝 Content Management

### Adding Blog Posts

1. Create a new `.mdx` file in `src/content/blogs/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: "Your Post Title"
   date: "2024-01-01"
   excerpt: "Brief description of your post"
   tags: ["tag1", "tag2"]
   imageUrl: "/blog/thumbnails/your-image.png"
   readTimeMinutes: 5
   ---
   ```

### Adding Portfolio Items

1. Edit `src/lib/data/portfolio.ts`
2. Add your project with the required fields
3. Add corresponding images to `public/portfolio/`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

1. Build the project: `npm run build`
2. Upload the `.next` folder and other required files
3. Set up environment variables
4. Start the production server: `npm run start`

## 🔧 Configuration

### Site Metadata

Update `src/lib/config/metadata.ts` with your information:
- Site title and description
- OpenGraph settings
- Twitter card configuration

### Sitemap Generation

Before deploying, update the `SITE_URL` in `scripts/generate-sitemap.mjs` with your actual domain.

### Personal Information

Update the data files in `src/lib/data/` with your personal information:
- `about.ts` - About section content
- `experience.ts` - Work experience
- `skills.ts` - Technical skills
- `portfolio.ts` - Portfolio projects
- `contact.ts` - Contact information

## 🎨 Customization

### Theme Colors

Colors are defined in `tailwind.config.ts` and use CSS variables in `src/app/globals.css`. The theme is currently fixed to dark mode.

### Animations

Custom animations are defined in the Tailwind config and can be extended for new interactive elements.

### Terminal Commands

Add new commands by:
1. Creating a new file in `src/lib/commands/`
2. Implementing the command interface
3. Registering it in `src/lib/commands/registry.ts`

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Code Splitting**: Dynamic imports for non-critical components
- **Caching**: Aggressive caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you have questions or need help with setup, please open an issue in the repository.
