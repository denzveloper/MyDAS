import { LucideIcon } from "lucide-react"
import { 
  Bot, 
  Brain, 
  Video, 
  Palette, 
  LineChart, 
  Users, 
  Megaphone,
  BarChart,
  Code,
  Smartphone,
  Mail,
  Search,
  ShoppingCart,
  Globe,
  Camera,
  Pen,
  MessageSquare,
  Share2
} from "lucide-react"

export const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    Bot: Bot,
    Brain: Brain,
    Video: Video,
    Palette: Palette,
    LineChart: LineChart,
    Users: Users,
    Megaphone: Megaphone,
    BarChart: BarChart,
    Code: Code,
    Smartphone: Smartphone,
    Mail: Mail,
    Search: Search,
    ShoppingCart: ShoppingCart,
    Globe: Globe,
    Camera: Camera,
    Pen: Pen,
    MessageSquare: MessageSquare,
    Share2: Share2
  }

  return iconMap[iconName] || Users // Default to Users icon if not found
} 