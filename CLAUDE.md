# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Primary Development Commands
- `npm run dev` - Start development server (default port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run check-env` - Validate environment variables
- `npm run build:check` - Check environment variables and build
- `npm run deploy:check` - Check environment variables, build, and start
- `npm run deploy:railway` - Deploy to Railway platform

### Development Auto-Login
The application includes automatic login functionality for development:
- **Email**: `test@gmail.com`
- **Password**: `Test123`
- **Only active in development mode** (`NODE_ENV === 'development'`)
- Creates master account automatically if it doesn't exist
- Shows development indicator in bottom-right corner
- Skips auto-login if user is already authenticated

### Adding shadcn Components
Always use: `npx shadcn@latest add <component-name>`
Never use: `npx shadcn-ui@latest add <component-name>`

## Architecture Overview

### Core Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase (with comprehensive fallback handling)
- **Authentication**: Supabase Auth with custom providers
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Key Architecture Patterns

#### Provider Pattern
The app uses a hierarchical provider structure:
1. `ThemeProvider` - Dark/light theme management (default: dark)
2. `AuthProvider` - Authentication state management
3. `SupabaseProvider` - Database and auth integration

#### Component Architecture
- **Layout Components**: `Header`, `Footer`, `Layout` in `src/components/layout/`
- **Section Components**: Modular page sections in `src/components/sections/`
- **Service Components**: Service-specific components in `src/components/services/`
- **UI Components**: shadcn/ui components in `src/components/ui/`

#### Data Management
- **Static Data**: Services, case studies, and work portfolio data in `src/lib/data/`
- **Database Types**: Comprehensive TypeScript types in `src/lib/supabase.ts`
- **Utilities**: Helper functions in `src/lib/utils/` and `src/utils/`

### Environment Configuration

#### Required Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

#### Environment Validation
The codebase includes robust environment validation:
- `scripts/check-env.js` - Validates required environment variables
- Comprehensive fallback system in `src/lib/supabase.ts` for missing env vars
- Build-time safety - app builds successfully even without environment variables

### Supabase Integration

#### Database Schema
- **users** table: User profiles with auth integration
- **contacts** table: Contact form submissions
- Comprehensive TypeScript types exported from `src/lib/supabase.ts`

#### Authentication Flow
- Login/registration modals with form validation
- Protected routes using `src/components/protected-route.tsx`
- Session management with proper cleanup

#### Fallback System
- Mock Supabase client when environment variables are missing
- Graceful degradation for development and build processes
- Informative error messages for debugging

## File Structure Conventions

### Naming Conventions
- **Components**: PascalCase (e.g., `Hero.tsx`, `ServiceCard.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`, `service-utils.ts`)
- **Directories**: lowercase with dashes (e.g., `case-studies/`, `components/ui/`)
- **Pages**: App Router convention (e.g., `page.tsx`, `layout.tsx`)

### Import Patterns
- Use absolute imports with `@/` prefix
- Prefer named exports for components and utilities
- Group imports: React imports, third-party, internal components, utilities

## Development Guidelines

### TypeScript Usage
- Use interfaces over types
- Avoid enums; use const objects with 'as const'
- Explicit return types for functions
- Strict typing for database operations

### Component Development
- Functional components with TypeScript interfaces
- Use React Context for global state
- Implement proper cleanup in useEffect hooks
- Error boundaries for robust error handling

### Styling Approach
- Tailwind CSS for all styling
- shadcn/ui for consistent component library
- Dark theme as default (forced in layout)
- Responsive design with mobile-first approach

### Code Quality
- ESLint configuration with Next.js and TypeScript rules
- Proper error handling with user-friendly messages
- Comprehensive logging for debugging
- Security best practices for authentication and data handling

## Specialized Features

### Dashboard System
- Admin dashboard with sidebar navigation
- Data visualization with Recharts
- User management and analytics
- Protected routes with role-based access

### Service System
- Dynamic service pages with slug-based routing
- Service-specific client components
- ROI calculators and interactive elements
- Case study integration

### Work Portfolio
- Filterable work showcase
- Dynamic case study pages
- Image optimization and galleries
- Client testimonials integration

## Testing & Deployment

### Build Process
- Environment variable validation before build
- Webpack optimizations for production
- Source maps for development debugging
- Vendor chunk optimization for better performance

### Railway Deployment
- Custom deployment script at `scripts/railway-deploy.sh`
- Environment variable validation for production
- HTTPS enforcement for Supabase URLs

## Common Patterns

### Form Handling
- Supabase integration for form submissions
- Proper validation and error handling
- Toast notifications for user feedback

### State Management
- React Context for authentication state
- Local state for component-specific data
- Proper cleanup and memory management

### Error Handling
- Comprehensive error boundaries
- Graceful fallbacks for missing data
- User-friendly error messages
- Development-friendly debugging information