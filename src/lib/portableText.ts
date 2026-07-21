import type { PortableTextBlock } from "@portabletext/react";

export function toPlainText(blocks?: PortableTextBlock[], maxLength?: number) {
  if (!blocks) return "";
  const text = blocks
    .filter((block) => block._type === "block")
    .map((block) =>
      (block.children as { text?: string }[] | undefined)
        ?.map((child) => child.text ?? "")
        .join("") ?? ""
    )
    .join(" ")
    .trim();

  if (maxLength && text.length > maxLength) {
    return `${text.slice(0, maxLength).trimEnd()}…`;
  }
  return text;
}
