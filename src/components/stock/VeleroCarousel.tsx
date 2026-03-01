import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import ImageLightbox from "./ImageLightbox";

interface VeleroCarouselProps {
  images: string[];
  alt: string;
  destacado?: boolean;
}

const VeleroCarousel = ({ images, alt, destacado }: VeleroCarouselProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="relative h-56 overflow-hidden">
        {images.length === 1 ? (
          <img
            src={images[0]}
            alt={alt}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onClick={() => handleImageClick(0)}
          />
        ) : (
          <Carousel opts={{ loop: true }} className="h-full">
            <CarouselContent className="h-56 -ml-0">
              {images.map((img, i) => (
                <CarouselItem key={i} className="pl-0 h-full">
                  <img
                    src={img}
                    alt={`${alt} - Foto ${i + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    loading="lazy"
                    onClick={() => handleImageClick(i)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white border-none" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white border-none" />
          </Carousel>
        )}

        {destacado && (
          <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-semibold font-body uppercase tracking-wider px-3 py-1 rounded-full z-10">
            Destacado
          </span>
        )}
      </div>

      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        alt={alt}
      />
    </>
  );
};

export default VeleroCarousel;
