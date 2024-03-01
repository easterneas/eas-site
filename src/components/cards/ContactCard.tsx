import { getImageUrlBySize } from "@/lib/strapi";
import { cn } from "@/lib/utils";
import type { FunctionalComponent } from "preact";

const ContactCard: FunctionalComponent<{ contact: Contact }> = ({
  contact,
}) => {
  const setBackgroundColor: (enter?: boolean) => EventListener = (enter = false) => (e) => {
    if(!contact.color) return

    (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${contact.color}${enter ? "40" : "00"}`
  }

  return (
    <button
    {...(
      contact.color ? {
        style: { color: contact.color, borderColor: contact.color },
        onMouseEnter: setBackgroundColor(true),
        onMouseLeave: setBackgroundColor(false),
      } : {}
    )}
    type={"button"}
      class={cn(
        "border-[2px] border-[#fc0] rounded overflow-hidden grid p-2 gap-2 text-left",
        contact.image.data && "grid-cols-[60px_1fr]",
      )}
      onClick={() => {
        const a = document.createElement("a");
        a.href = contact.value;
        a.target = "_blank";
        a.click();
      }}
    >
      {contact.image.data && (
        <img
          class={"p-2"}
          alt={contact.name}
          src={`${import.meta.env.PUBLIC_API_URL}${getImageUrlBySize(contact.image, "small")}`}
        />
      )}
      <div class={"grid items-center"}>{contact.name}</div>
    </button>
  );
};

export default ContactCard;
