import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  quality = 85,
  objectFit = 'cover',
  objectPosition = 'center',
  ...props
}: ResponsiveImageProps) {
  return (
    <div className={cn('relative', fill ? 'h-full w-full' : '', className)}>
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          'transition-all duration-300',
          fill && 'object-position-center',
          fill && {
            'object-contain': objectFit === 'contain',
            'object-cover': objectFit === 'cover',
            'object-fill': objectFit === 'fill',
            'object-none': objectFit === 'none',
            'object-scale-down': objectFit === 'scale-down',
          }
        )}
        style={fill ? { objectPosition } : undefined}
        sizes={sizes}
        fill={fill}
        quality={quality}
        priority={priority}
        {...props}
      />
    </div>
  );
} 