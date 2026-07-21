import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed last:mb-0">{children}</p>,
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 font-display text-xl text-brown-900 first:mt-0">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-5 font-display text-lg text-brown-900 first:mt-0">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-green-300 pl-4 italic text-brown-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-5">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-5">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-green-700 underline underline-offset-2 hover:text-green-800"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold text-brown-900">{children}</strong>,
  },
};

export function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return (
    <div className="text-brown-700">
      <PortableText value={value} components={components} />
    </div>
  );
}
