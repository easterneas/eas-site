import { getImageUrlBySize } from "@/lib/strapi";
import { cn } from "@/lib/utils";
import type { FunctionalComponent } from "preact";
import { twMerge } from "tailwind-merge";

const PortfolioCard: FunctionalComponent<{
  portfolio: Portfolio;
  onCardClick: (
    portfolio: Portfolio,
  ) => (e: MouseEvent) => void | Promise<void>;
}> = ({ portfolio, onCardClick }) => {
  return (
    <button
      type="button"
      onClick={onCardClick(portfolio)}
      class={cn(
        "border-[1px] border-[#fc0] rounded overflow-hidden p-2 gap-2 grid text-left",
        portfolio.avatar.data && "grid-cols-[120px_1fr]",
      )}
    >
      {portfolio.avatar.data && (
        <img
          src={`${import.meta.env.PUBLIC_API_URL}${getImageUrlBySize(
            portfolio.avatar,
            "small",
          )}`}
          alt={portfolio.name}
        />
      )}
      <div class={"grid"}>
        <span class={"text-[24pt] leading-[24pt] font-title"}>
          {portfolio.name}
        </span>
        <div class={"flex justify-between"}>
          <span class={twMerge(
            "text-[18pt] font-[100] leading-[18pt] font-title",
          )}>
            {portfolio.launched ?? "(ongoing)"}
          </span>
        </div>
        {/* <div>{portfolio.avatar}</div> */}
      </div>
    </button>
  );
};

export default PortfolioCard;
