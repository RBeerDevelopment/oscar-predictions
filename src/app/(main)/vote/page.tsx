import { AfterCeremonyToast } from "@/components/vote/after-ceremony-toast";
import { CategoriesOverview } from "@/components/vote/categories-overview";

export default function VoteOverviewPage() {
  return (
    <div className="flex flex-col items-center overflow-y-hidden py-2">
      <CategoriesOverview />
      <AfterCeremonyToast />
    </div>
  );
}
