import type { ComponentChildren } from "preact";

function SectionTitle({ children }: { children: ComponentChildren }) {
  return (
    <h4 class="footer-section-title font-lobster text-primary-500 text-lg relative w-fit whitespace-nowrap">
      {children}
    </h4>
  );
}

export default SectionTitle;
