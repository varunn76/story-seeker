export interface CarouselCardProps {
  id: number | string;
  title: string;
  image: string;
  isFeatured?: boolean;
  metadata?: {
    duration: string;
    year: string;
    language: string;
  };
  media_type?: string;
}
