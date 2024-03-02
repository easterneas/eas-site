import hilite from "@/lib/hilite";
import Markdown from "markdown-to-jsx";
import type { FunctionComponent, FunctionalComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";

const MarkdownContent: FunctionComponent<{ md: string }> = ({ md }) => (
  <Markdown
    children={md}
    options={{
      wrapper: null,
      overrides: { code: SyntaxHighlightedCode },
    }}
  />
);

const SyntaxHighlightedCode: FunctionalComponent<{ className?: string }> = (
  props,
) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current && props.className?.includes("lang-")) {
      hilite.highlightElement(ref.current);

      // hljs won't reprocess the element unless this attribute is removed
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);

  return <code {...props} ref={ref} />;
};

export default MarkdownContent;
