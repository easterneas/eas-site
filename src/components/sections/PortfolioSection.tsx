// TODO: create portfolio section
// ? contains:

import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import PortfolioCard from "../cards/PortfolioCard";
import PortfolioModal from "../modals/PortfolioModal";

const PortfolioSection: FunctionalComponent<{
  portfolios: Portfolio[];
  limit?: number;
}> = ({ portfolios, limit = 0 }) => {
  const [open, setOpen] = useState(false);
  const [activePortfolio, setActivePortfolio] = useState<Portfolio | null>(
    null,
  );

  useEffect(() => {
    if (!open) {
      setActivePortfolio(null);
    }
  }, [activePortfolio]);

  return (
    <>
      {
        // ? [1] PortfolioCard(s) as portfolio list, and
        (limit ? portfolios.slice(0, limit) : portfolios).map(
          (portfolio) => (
            <PortfolioCard
              portfolio={portfolio}
              onCardClick={(portfolio) => () => {
                setOpen(true);
                setActivePortfolio(portfolio);
              }}
            />
          ),
        )
      }
      {
        // ? [2] PortfolioModal to show the details of clicked portfolio.
      }
      <PortfolioModal {...{ open, setOpen, portfolio: activePortfolio }} />
    </>
  );
};

export default PortfolioSection;
