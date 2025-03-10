import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ResponsiveImage } from '@/components/image';
import { WorkCard as WorkCardType } from '@/lib/data/workCards';

interface WorkCardProps {
  card: WorkCardType;
}

export function WorkCard({ card }: WorkCardProps) {
  const { id, title, description, image, category } = card;

  // Convert category to display format
  const displayCategory = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-60 w-full">
        <ResponsiveImage
          src={image}
          alt={title}
          fill={true}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute left-4 top-4 bg-primary">{displayCategory}</Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <Button asChild variant="outline" className="gap-2">
          <Link href={`/work#${id}`}>
            Learn More <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
} 