import { clsx } from "deco-sites/sexshopatacadao/sdk/clx.ts";

const COLORS = {
  primary: "text-primary-500",
  gray: "",
};

export interface Props {
  /** @format html */
  content: string;

  /**
   * @default 'primary'
   */
  color?: "primary" | "gray";
}

function Text({ content, color = "primary" }: Props) {
  return (
    <div
      class={clsx("prose w-full", COLORS[color])}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default Text;
