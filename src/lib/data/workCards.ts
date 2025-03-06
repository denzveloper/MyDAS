import { StaticImageData } from 'next/image';

export interface WorkCard {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'branding' | 'marketplace' | 'video';
}

export const WORK_CARDS: WorkCard[] = [
  {
    id: 'branding',
    title: 'Branding & Design',
    description: 'We create stunning visual identities that capture your brand essence and resonate with your audience.',
    image: '/images/branding.jpg',
    category: 'branding'
  },
  {
    id: 'marketplace',
    title: 'Online Marketplace',
    description: 'We build and optimize e-commerce solutions that drive conversions and enhance the user experience.',
    image: '/images/online marketplace.jpg',
    category: 'marketplace'
  },
  {
    id: 'video',
    title: 'Video Production',
    description: 'Our professional video content captivates audiences and communicates your message with impact.',
    image: '/images/video production.jpg',
    category: 'video'
  }
]; 