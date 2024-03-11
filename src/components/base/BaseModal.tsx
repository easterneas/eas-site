// @ts-nocheck
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "@preact/compat";
import { twMerge } from "tailwind-merge";
import type { BaseModalProps } from "types/base/BaseModalProps";
import Icon from "../Icon";

export default function BaseModal({
  title,
  open,
  setOpen,
  children,

  footer = null,
  isStatic = false,
  header = true,
  width = 1000,
  showCloseButton = true,
  className = "",
  separator = true,

  headerOverride,
  contentOverride,
  footerOverride,
}: Readonly<BaseModalProps>) {
  const closeModal = () => setOpen(typeof open === "string" ? "" : false);

  const renderHeader = () => {
    if (header)
      return (
        <div className={"grid gap-[8px]"}>
          <div
            className={twMerge(
              "flex justify-between items-start",
              headerOverride?.className,
            )}
          >
            <Dialog.Title as="h3">
              {title}
            </Dialog.Title>

            {showCloseButton && (
              <button
                type={"button"}
                style={{ minWidth: 0 }}
                onClick={closeModal}
                className={twMerge(
                  "outline-none p-[12px] border-0",
                  "absolute right-[24px] top-[24px]",
                )}
              >
                <Icon name="X" />
              </button>
            )}
          </div>
        </div>
      );

    return (
      showCloseButton && (
        <button
          type={"button"}
          onClick={closeModal}
          className={twMerge(
            "outline-none p-[12px]",
            "absolute right-[8px] top-[8px]",
          )}
        >
          <MdClose />
        </button>
      )
    );
  };

  return (
    <Transition
      appear
      show={typeof open === "string" ? open === openStringCondition : open}
      as={Fragment}
    >
      <Dialog
        as="div"
        onClose={isStatic ? () => null : closeModal}
        static={isStatic}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 z-[2] backdrop-blur" />
        </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto z-[3]">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-[80%] translate-y-[200px]"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-[80%] translate-y-[200px]"
            >
              <Dialog.Panel
                style={{ width }}
                className={twMerge(
                  "transform relative rounded-[8px] p-[24px] grid gap-[24px] bg-darkSecondary border-[1px] border-[#fc0] text-left align-middle shadow-xl transition-all",
                  className,
                )}
              >
                {renderHeader()}

                {children && (
                  <div
                    className={twMerge(
                      "min-h-[100px] grid gap-[24px]",
                      contentOverride?.className,
                    )}
                  >
                    {children}
                  </div>
                )}

                {footer && (
                  <div
                    className={twMerge(
                      "grid gap-[8px]",
                      footerOverride?.className,
                    )}
                  >
                    {separator && <HorizontalBar />}
                    {footer}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
