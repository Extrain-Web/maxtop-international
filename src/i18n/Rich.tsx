import { Fragment, type ReactNode } from "react";

/**
 * Renders a translation string where `**...**` segments become <strong>.
 * Keeps bold emphasis language-independent so translators can place the
 * highlighted phrase anywhere in the sentence (incl. RTL).
 */
export function renderRich(text: string, strongClassName?: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className={strongClassName}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Rich({
  text,
  strongClassName,
}: {
  text: string;
  strongClassName?: string;
}) {
  return <>{renderRich(text, strongClassName)}</>;
}
