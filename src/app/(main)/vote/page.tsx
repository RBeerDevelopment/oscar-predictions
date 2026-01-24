import { isAfterCeremony } from "@/common/utils/is-after";
import { AfterCeremonyToast } from "@/components/vote/after-ceremony-toast";
import { CategoriesOverview } from "@/components/vote/categories-overview";

export default async function VoteOverviewPage() {

  const isVotingOver = await isAfterCeremony();

  return (
    <div className="flex flex-col items-center overflow-y-hidden py-2">
      <CategoriesOverview />
      <AfterCeremonyToast isVotingOver={isVotingOver} />
    </div>
  );
}
