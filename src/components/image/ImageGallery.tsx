import React from 'react';
import { ResponsiveImage } from './ResponsiveImage';

// Map image IDs to their public URLs
export const imageUrls = {
  branding: '/images/branding.jpg',
  onlineMarketplace: '/images/online marketplace.jpg',
  videoProduction: '/images/video production.jpg'
};

interface ImageGalleryProps {
  imageId: 'branding' | 'onlineMarketplace' | 'videoProduction';
  alt: string;
  className?: string;
  height?: number;
  width?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

export function ImageGallery({ 
  imageId, 
  alt, 
  className, 
  height, 
  width, 
  fill = false,
  sizes,
  priority,
  quality,
  objectFit,
  objectPosition,
  ...props 
}: ImageGalleryProps) {
  const src = imageUrls[imageId];
  
  console.log('ImageGallery rendering:', { imageId, src });
  
  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
      fill={fill}
      sizes={sizes}
      priority={priority}
      quality={quality}
      objectFit={objectFit}
      objectPosition={objectPosition}
      {...props}
    />
  );
} 