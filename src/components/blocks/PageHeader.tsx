import type { FunctionalComponent, VNode } from "preact";
import { twMerge } from "tailwind-merge";

const PageHeader: FunctionalComponent<{ Icon?: VNode; className?: string }> = ({
  children,
  Icon,
  className,
}) => {
  return (
    <div class={twMerge("text-5xl flex")}>
      <div
        class={twMerge(
          "flex border-[2px] border-white rounded-[8px] h-full overflow-hidden",
          "text-[#fc0]", className
        )}
      >
        {Icon && <div class={"h-full px-[20px] flex text-black bg-white"}>{Icon}</div>}
        <div class={"flex gap-4 font-title select-none font-[400] p-2 px-4 "}>
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
