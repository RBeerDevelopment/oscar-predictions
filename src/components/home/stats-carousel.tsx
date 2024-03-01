"use client";

import { FC, ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const StatsCarousel: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Carousel
      className="py-4 w-11/12 md:w-1/3 xl:w-1/2 2xl:w-2/3 self-center"
      opts={{ dragFree: true }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious className="-left-10" />
      <CarouselNext className="-right-10" />
    </Carousel>
  );
};
