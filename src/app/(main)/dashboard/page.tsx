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
import { CorrectPredictionsCard } from "@/components/dashboard/correct-predictions-card";
import { Button } from "@/components/ui/button";
import { isAfterCeremony } from "@/common/utils/isAfterCeremony";

export default async function DashboardPage() {
  const { userId } = auth();

  return (
    <div className="flex flex-col w-full h-full">
      <Carousel
        className="self-center w-10/12 py-4 md:h-2/3"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {isAfterCeremony() ? (
            <CarouselItem className="md:basis-1/3">
              <DashboardCard title="Correct predictions">
                <Suspense fallback={<Skeleton className="h-full w-10" />}>
                  <CorrectPredictionsCard userId={userId ?? ""} />
                </Suspense>
              </DashboardCard>
            </CarouselItem>
          ) : null}
          <CarouselItem className="md:basis-1/3">
            <DashboardCard title="Ranked">
              <Suspense fallback={<Skeleton className="h-full w-10" />}>
                <RankedVotesTable userId={userId ?? ""} />
              </Suspense>
            </DashboardCard>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <DashboardCard title="Your Predictions">
              <Suspense fallback={<Skeleton className="h-full w-10" />}>
                <OwnPredictionsTable userId={userId ?? ""} />
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
