import { getImageUrlBySize } from "@/lib/strapi";
import { cn } from "@/lib/utils";
import type { FunctionalComponent } from "preact";

const PortfolioCard: FunctionalComponent<{
  portfolio: Portfolio;
  onCardClick: (
    portfolio: Portfolio,
  ) => (e: MouseEvent) => void | Promise<void>;
}> = ({ portfolio, onCardClick }) => {
  const src = portfolio.avatar.data
    ? `${import.meta.env.PUBLIC_API_URL}${getImageUrlBySize(
        portfolio.avatar,
        "small",
      )}`
    : "";

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
        <img src={src} alt={portfolio.name} />
      )}
      <div class={"grid gap-1"}>
        <span class={"text-2xl font-[400]"}>{portfolio.name}</span>
        <div class={"flex justify-between text-sm font-[400]"}>
          {portfolio.launched ?? "(ongoing)"}
        </div>
      </div>
    </button>
  );
};

export default PortfolioCard;
