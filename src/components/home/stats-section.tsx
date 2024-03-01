import { FC } from "react";
import { getVoteCounts } from "@/db/query/get-vote-counts";
import { CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RankTableCell } from "../tables/rank-table-cell";
import { NomineeTableCell } from "../tables/nominee-table-cell";

import { StatsCarousel } from "./stats-carousel";
import { SectionHeader } from "./section-header";
import { WinningMedal } from "../winning-medal";

export const StatsSection: FC = async () => {
  const voteCounts = await getVoteCounts();

  const votesByCategory = Array.from({ length: 23 }, (_, i) => i + 1).map(
    (i) => {
      return voteCounts
        .filter((v) => v.categoryId === i)
        .sort((a, b) => b.voteCount - a.voteCount);
    }
  );

  return (
    <section className="w-full py-12 md:py-16 f">
      <div className="flex flex-col md:flex-row-reverse md:gap-10 gap-6 items-start container">
        <SectionHeader
          title="Statistics"
          subtitle="Rankings in all categories based on the number of votes."
          isReversed={true}
        />
        <StatsCarousel>
          {votesByCategory.map((entry) => (
            <CarouselItem
              className="lg:basis-1/2"
              key={entry.at(0)?.categoryId}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{entry.at(0)?.categoryName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table
                    divClassName="no-scrollbar max-h-[483px]"
                    className="no-scrollbar"
                  >
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead className="text-right">Movie</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="no-scrollbar">
                      {entry.map((nominee, idx) => (
                        <TableRow
                          key={nominee.nomineeName + nominee.categoryId}
                        >
                          {Boolean(nominee.isWinner) ? (
                            <TableCell>
                              <WinningMedal isInverted />
                            </TableCell>
                          ) : (
                            <RankTableCell rank={idx + 1} />
                          )}
                          <NomineeTableCell
                            title={nominee.nomineeName}
                            tmdbId={nominee.tmdbId}
                            posterPath={nominee.tmdbPosterPath}
                          />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </StatsCarousel>
      </div>
    </section>
  );
};
