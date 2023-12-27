import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { BreadcrumbListLoader } from "$store/loaders/breadcrumb.ts";

export interface Props {
  data: BreadcrumbListLoader;
}

export default function BreadcrumbSection({ data }: Props) {
  return <Breadcrumb itemListElement={data.itemListElement} />;
}
