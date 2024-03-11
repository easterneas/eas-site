import BaseModal from "@/components/base/BaseModal";
import { cn } from "@/lib/utils";
import type { FunctionalComponent } from "preact";
import type { StateUpdater } from "preact/hooks";

const PortfolioModal: FunctionalComponent<{
  open: boolean;
  setOpen: StateUpdater<boolean>;
  portfolio: Portfolio | null;
}> = ({ open, setOpen, portfolio }) => {
  return (
    <BaseModal
      {...{ open, setOpen }}
      header
      title={
        <div class={"grid items-center gap-1"}>
          <span class={"font-title font-[600]"}>{portfolio?.name}</span>
          <span class={"font-title text-sm"}>{portfolio?.launched ?? "(ongoing)"}</span>
        </div>
      }
      width={690}
    >
      <div
        class={cn(
          "grid gap-4",
          portfolio?.avatar?.data && "grid-cols-[1fr_2fr]",
        )}
      >
        <p>{portfolio?.description}</p>
      </div>
    </BaseModal>
  );
};

export default PortfolioModal;
