import { FC } from "react";
import Image from "next/image";
import { LeaveFeedbackDialog } from "./feedback/leave-feedback-dialog";

import { Button } from "./ui/button";
import Link from "next/link";
import tmdbLogo from "../../public/tmdb-logo.svg";

export const Footer: FC = () => {
  return (
    <footer className="w-full z-100 bg-gray-900 flex flex-col py-0.5 justify-evenly shrink-0 mt-auto">
      <div className="flex flex-row items-center justify-center gap-3">
        <Button variant="link" className="text-white text-sm self-center p-2">
          <Link href="/imprint">Imprint</Link>
        </Button>
        <LeaveFeedbackDialog />
      </div>
      <div className="flex flex-row gap-1 items-center justify-center">
        <p className="text-xs text-white">Powered by</p>
        <a href="https://www.themoviedb.org" target="_blank">
          <Image
            src={tmdbLogo}
            alt="The movie database logo wide"
            width={100}
            height={24}
          />
        </a>
      </div>
    </footer>
  );
};
