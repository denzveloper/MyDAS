# MIDAS - Marketing Agency Landing Page

A modern, responsive landing page for MIDAS marketing agency built with Next.js 14, TypeScript, and shadcn UI.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn UI
- **Icons**: Lucide Icons
- **Fonts**: Inter (Google Fonts)
- **Theming**: next-themes (dark/light mode)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── case-studies/       # Case studies pages
│   ├── services/           # Services pages
│   ├── work/               # Work portfolio pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── layout/             # Layout components (Header, Footer)
│   ├── sections/           # Page sections (Hero, Services, Portfolio, etc.)
│   ├── ui/                 # shadcn UI components
│   ├── work/               # Work-related components
│   ├── theme-provider.tsx  # Theme provider component
│   └── theme-toggle.tsx    # Theme toggle component
├── hooks/                  # Custom React hooks
├── lib/
│   ├── config/             # Configuration files
│   ├── constants/          # Constant values
│   ├── data/               # Data files (services, case studies)
│   ├── fonts/              # Font configurations
│   ├── types/              # TypeScript type definitions
│   └── utils.ts            # Utility functions
├── styles/                 # Additional styles
├── types/                  # Global TypeScript types
└── utils/                  # Utility functions
```

## 🏗️ Component Structure

- **Layout**: Main layout with Header and Footer
- **Sections**: Modular page sections (Hero, Services, Portfolio, Testimonials, CTA)
- **UI Components**: shadcn UI components (Button, Card, Carousel, Dialog, etc.)

## 🎨 Features

- **Responsive Design**: Mobile-first approach with responsive layouts
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Modern UI**: Clean, professional design with shadcn UI components
- **Case Studies**: Detailed case studies with filterable categories
- **Services Showcase**: Comprehensive service offerings with descriptions
- **Testimonials**: Client testimonials section
- **Portfolio**: Work portfolio with filtering capabilities

## 🚦 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/midas.git
   cd midas
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🧩 Adding shadcn Components

To add new shadcn components, use the following command:

```bash
npx shadcn@latest add <component-name>
```

Example:
```bash
npx shadcn@latest add accordion
```

## 📝 Development Guidelines

- Follow TypeScript best practices
- Use functional components with proper typing
- Implement proper error boundaries
- Follow the established naming conventions:
  - PascalCase for component files (e.g., `Hero.tsx`)
  - camelCase for utility files (e.g., `utils.ts`)
- Write clean, maintainable code
- Use proper Git commit message prefixes:
  - "fix:" for bug fixes
  - "feat:" for new features
  - "perf:" for performance improvements
  - "docs:" for documentation changes
  - "style:" for formatting changes
  - "refactor:" for code refactoring
  - "test:" for adding missing tests
  - "chore:" for maintenance tasks

## 🧹 Unused Files

The following files appear to be unused and can be considered for removal:
- `public/next.svg` - Default Next.js logo
- `public/vercel.svg` - Default Vercel logo

## 📄 License

MIT
