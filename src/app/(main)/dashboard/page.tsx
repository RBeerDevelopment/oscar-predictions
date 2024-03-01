import { auth } from "@clerk/nextjs";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { OwnPredictionsTable } from "@/components/dashboard/own-predictions-table";
import { RankedVotesTable } from "@/components/dashboard/ranked-votes-table";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DashboardPage() {
  const { userId } = auth();

  // if (!userVotes || userVotes.length === 0) {
  //   return (
  //     <div className="flex flex-col h-full w-full items-center justify-center gap-2">
  //       <p>No predictions yet, start here:</p>
  //       <Link href="/vote">
  //         <Button variant="link" className="text-xl font-semibold">
  //           Start your predictions
  //         </Button>
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col w-full h-full">
      <Carousel
        className="self-center w-10/12 py-4 md:h-2/3"
        opts={{ loop: true }}
      >
        <CarouselContent>
          <CarouselItem className="md:basis-1/3">
            <DashboardCard title="Your Predictions">
              <Suspense fallback={<Skeleton className="h-full w-10" />}>
                <OwnPredictionsTable userId={userId ?? ""} />
              </Suspense>
            </DashboardCard>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <DashboardCard title="Ranked">
              <Suspense fallback={<Skeleton className="h-full w-10" />}>
                <RankedVotesTable userId={userId ?? ""} />
              </Suspense>
            </DashboardCard>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="h-6 w-6 -left-[30px] md:hidden" />
        <CarouselNext className="h-6 w-6 -right-[30px] md:hidden" />
      </Carousel>
    </div>
  );
}
