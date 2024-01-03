export interface Props {
  /** @format html */
  content: string;
  align?: "center" | "left" | "right";
}
export default function InstitucionalText({ content, align }: Props) {
  return (
    <div class="max-w-[1380px] mx-auto w-full font-montserrat text-[#3f3f40]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          #inst-text h1 {
            font-size: 30px;
            font-weight: 700;
            line-height: 1.15;
            margin: 0.67em 0;
          }

          #inst-text p {
            font-size: 14px;
            text-align: justify;
            line-height: 1.5;
            margin: 1em 0;
          }

          #inst-text ol {
            list-style: decimal;
            padding-inline-start: 40px;
            margin: 1em 0;
          }

          #inst-text strong,
          #inst-text .vtex-rich-text-0-x-strong {
            font-weight: 700;
          }

          #inst-text ul{
            list-style: disc;
            padding-inline-start: 40px;
            margin: 1em 0;
          }

          #inst-text li{
            font-size: 14px;
            text-align: justify;
            line-height: 1.15;
          }

          #inst-text .vtex-rich-text-0-x-italic {
            font-style: italic;
          }

          #inst-text a {
            color: inherit;
            color: -webkit-link;
            text-decoration: underline;
          }

          #inst-text iframe {
            width:100%;
          }
        `,
        }}
      />
      <div
        id="inst-text"
        class={`markdown-body ${
          align === "center"
            ? "text-center items-center"
            : align === "right"
            ? "text-right items-end"
            : ""
        }`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
