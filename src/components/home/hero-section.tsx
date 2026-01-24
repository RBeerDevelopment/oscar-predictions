import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import SinnersPoster from '../../../public/sinners.webp'

export const HeroSection: FC = () => {
  return (
    <section className="w-full">
      <div className="container px-4 md:px-6 py-12 md:pt-32 md:pb-8 md:py-0">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              Give Your Predictions for the {new Date().getFullYear()} Oscars.
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 text-lg md:text-xl">
              Choose your favorites and see how your predictions compare to everyone else.
            </p>
          </div>
          <Link href="/vote">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-lg px-8 py-6 text-lg">
              Start Voting
            </Button>
          </Link>
          <div className="w-full max-w-4xl h-64 md:h-96 bg-gray-200 rounded-xl mt-8 overflow-hidden relative">
            <Image src={SinnersPoster} alt="Hero Image" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
