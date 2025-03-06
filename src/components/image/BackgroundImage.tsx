import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

interface BackgroundImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  overlayClassName?: string;
  priority?: boolean;
  quality?: number;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
  overlayColor?: string;
}

export function BackgroundImage({
  src,
  alt,
  className,
  overlayClassName,
  priority = false,
  quality = 85,
  children,
  overlay = false,
  overlayOpacity = 50,
  overlayColor = 'black',
  ...props
}: BackgroundImageProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover z-0"
        quality={quality}
        priority={priority}
        {...props}
      />
      {overlay && (
        <div 
          className={cn('absolute inset-0 z-10', overlayClassName)}
          style={{ 
            backgroundColor: overlayColor, 
            opacity: overlayOpacity / 100 
          }}
        />
      )}
      {children && (
        <div className="relative z-20">
          {children}
        </div>
      )}
    </div>
  );
} 