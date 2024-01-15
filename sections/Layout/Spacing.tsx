import isMobileLoader from "$store/loaders/isMobile.ts";
import { AppContext } from "deco-sites/sexshopatacadao/apps/site.ts";

export function loader(props: Props, req: Request, ctx: AppContext) {
  return {
    ...props,
    isMobile: isMobileLoader(props, req, ctx).isMobile,
  };
}

export interface Props {
  /**
   * @title Espaçamento
   * @description Tamanho do espaçamento, e.g. 100px
   */
  size: string;
  /**
   * @title Espaçamento no mobile
   * @description Tamanho do espaçamento, e.g. 100px
   */
  sizeMobile?: string;
  /**
   * @ignore
   */
  isMobile: boolean;
}

export default function Spacing(
  { size, sizeMobile, isMobile }: Props,
) {
  if (isMobile && sizeMobile) {
    return <div style={{ height: sizeMobile, width: "100%" }} />;
  }

  return <div style={{ height: size, width: "100%" }} />;
}
