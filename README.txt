MIDAS - MARKETING AGENCY LANDING PAGE
========================================

A modern, responsive landing page for MIDAS marketing agency built with Next.js 14, TypeScript, and shadcn UI.

TECH STACK
----------
* Framework: Next.js 14 (App Router)
* Language: TypeScript
* Styling: Tailwind CSS
* UI Components: shadcn UI
* Icons: Lucide Icons
* Fonts: Inter (Google Fonts)
* Theming: next-themes (dark/light mode)
* Backend Service: Firebase (for form submissions and analytics)

PROJECT STRUCTURE AND FUNCTIONALITY
-----------------------------------

src/
├── app/                           # Next.js App Router pages and routing
│   ├── case-studies/              # Case studies pages
│   │   ├── [id]/                  # Dynamic route for individual case studies
│   │   │   └── page.tsx           # Individual case study page component
│   │   ├── page.tsx               # Main case studies listing page
│   │   └── not-found.tsx          # 404 page for case studies
│   │
│   ├── services/                  # Services pages
│   │   ├── [slug]/                # Dynamic route for individual services
│   │   │   └── page.tsx           # Individual service page component
│   │   ├── page.tsx               # Main services listing page
│   │   └── layout.tsx             # Layout wrapper for services pages
│   │
│   ├── work/                      # Work portfolio pages
│   │   └── page.tsx               # Work portfolio page component
│   │
│   ├── assets/                    # Static assets used in the app
│   │   ├── images/                # Image assets for pages
│   │   └── icons/                 # Icon assets
│   │
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout with metadata
│   └── page.tsx                   # Home page component
│
├── components/                    # Reusable UI components
│   ├── layout/                    # Layout components (wrapper components)
│   │   ├── Container.tsx          # Container layout component
│   │   └── Section.tsx            # Section layout component
│   │
│   ├── sections/                  # Page-specific sections
│   │   ├── Hero.tsx               # Hero section component
│   │   ├── Services.tsx           # Services showcase section
│   │   ├── Portfolio.tsx          # Portfolio showcase section
│   │   ├── Testimonials.tsx       # Testimonials section
│   │   ├── CTA.tsx                # Call-to-action section
│   │   ├── ClientShowcase.tsx     # Client logos showcase
│   │   ├── FeaturesTab.tsx        # Features tabs component
│   │   └── ParallaxSection.tsx    # Parallax scrolling section
│   │
│   ├── ui/                        # shadcn UI components
│   │   ├── button.tsx             # Button component
│   │   ├── button-accent.tsx      # Accent variant of button
│   │   ├── card.tsx               # Card component
│   │   ├── card-dark.tsx          # Dark variant of card
│   │   ├── carousel.tsx           # Carousel/slider component
│   │   ├── accordion.tsx          # Accordion component
│   │   ├── dialog.tsx             # Dialog/modal component
│   │   ├── dropdown-menu.tsx      # Dropdown menu component
│   │   ├── hover-card.tsx         # Hover card component
│   │   ├── separator.tsx          # Separator/divider component
│   │   ├── sheet.tsx              # Sheet/drawer component
│   │   ├── tabs.tsx               # Tabs component
│   │   ├── badge.tsx              # Badge component
│   │   ├── scroll-area.tsx        # Scrollable area component
│   │   ├── sparkles.tsx           # Sparkles animation
│   │   ├── robo-animation.tsx     # Robot animation component
│   │   └── floating-paper.tsx     # Floating paper animation
│   │
│   ├── work/                      # Work showcase components
│   │   ├── WorkCard.tsx           # Work portfolio card
│   │   └── WorkFilter.tsx         # Work filtering component
│   │
│   ├── image/                     # Image-related components
│   │   ├── BlurImage.tsx          # Image with blur placeholder
│   │   └── ImageGallery.tsx       # Image gallery component
│   │
│   ├── navbar.tsx                 # Site navigation bar
│   ├── footer.tsx                 # Site footer
│   ├── theme-provider.tsx         # Dark/light theme provider
│   └── theme-toggle.tsx           # Theme toggle button component
│
├── hooks/                         # Custom React hooks
│   ├── useMediaQuery.ts           # Hook for responsive media queries
│   ├── useScrollPosition.ts       # Hook for scroll position tracking
│   └── useTheme.ts                # Hook for theme management
│
├── lib/                           # Library code and utilities
│   ├── config/                    # Configuration files
│   │   ├── site.ts                # Site configuration
│   │   └── navigation.ts          # Navigation configuration
│   │
│   ├── constants/                 # Constant values
│   │   ├── routes.ts              # Route constants
│   │   └── theme.ts               # Theme constants
│   │
│   ├── data/                      # Data files
│   │   ├── services.ts            # Services data
│   │   ├── caseStudies.ts         # Case studies data
│   │   └── workCards.ts           # Work portfolio data
│   │
│   ├── fonts/                     # Font configurations
│   │   └── index.ts               # Font imports and setup
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── service.ts             # Service type definitions
│   │   ├── caseStudy.ts           # Case study type definitions
│   │   └── work.ts                # Work portfolio type definitions
│   │
│   ├── utils/                     # Utility functions
│   │   ├── animation.ts           # Animation utilities
│   │   └── formatting.ts          # Text formatting utilities
│   │
│   └── utils.ts                   # General utility functions
│
├── styles/                        # Additional styles
│   └── animations.css             # CSS animations
│
├── types/                         # Global TypeScript type definitions
│   └── index.d.ts                 # Global type declarations
│
└── utils/                         # General utility functions
    ├── helpers.ts                 # Helper functions
    └── validation.ts              # Form validation utilities

public/                            # Public static assets
├── images/                        # Image assets
│   ├── logos/                     # Logo images
│   │   └── clients/               # Client logos
│   ├── services/                  # Service-related images
│   ├── cases/                     # Case study images
│   └── team/                      # Team member photos
└── favicon.ico                    # Site favicon

FEATURES
--------
* Responsive Design: Mobile-first approach with responsive layouts
* Dark/Light Mode: Theme toggle with system preference detection
* Modern UI: Clean, professional design with shadcn UI components
* Case Studies: Detailed case studies with filterable categories
* Services Showcase: Comprehensive service offerings with descriptions
* Testimonials: Client testimonials section
* Portfolio: Work portfolio with filtering capabilities
* Contact Form: Client inquiry form with Firebase integration

GETTING STARTED
--------------
1. Clone the repository
   ```
   git clone https://github.com/yourusername/midas.git
   cd midas
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run the development server
   ```
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

AVAILABLE SCRIPTS
----------------
* npm run dev - Start development server
* npm run build - Build for production
* npm run start - Start production server
* npm run lint - Run ESLint

ADDING SHADCN COMPONENTS
-----------------------
To add new shadcn components, use the following command:
```
npx shadcn@latest add <component-name>
```

Example:
```
npx shadcn@latest add accordion
```

DEVELOPMENT GUIDELINES
---------------------
* Follow TypeScript best practices
* Use functional components with proper typing
* Implement proper error boundaries
* Follow the established naming conventions:
  - PascalCase for component files (e.g., Hero.tsx)
  - camelCase for utility files (e.g., utils.ts)
* Write clean, maintainable code
* Use proper Git commit message prefixes:
  - "fix:" for bug fixes
  - "feat:" for new features
  - "perf:" for performance improvements
  - "docs:" for documentation changes
  - "style:" for formatting changes
  - "refactor:" for code refactoring
  - "test:" for adding missing tests
  - "chore:" for maintenance tasks

LICENSE
-------
MIT 