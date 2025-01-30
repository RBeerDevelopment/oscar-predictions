import { SignInButton } from "@clerk/nextjs";

import { FC } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export const HeroSection: FC = () => {
  return (
    <section className="w-full md:min-h-[60vh]">
      <div className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <Image
            priority={true}
            className="w-full h-full md:hidden"
            src="/logo.webp"
            alt="Oscar Predictions logo"
            width={400}
            height={400}
          />
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                And the Oscar goes to...
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Predict who&apos;s going to win the Acadamy Award in each
                category this year.
              </p>
            </div>
            <div className="space-x-4">
              <SignInButton forceRedirectUrl="/vote">
                <Button className="bg-pink-600">Get Started</Button>
              </SignInButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
