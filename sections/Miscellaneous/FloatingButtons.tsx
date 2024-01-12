import Icon from "$store/components/ui/Icon.tsx";
import FloatingButtonsJS from "$store/islands/FloatingButtonsJS.tsx";

export default function FloatingButtons() {
  return (
    <>
      <div
        id="floating-buttons"
        class="fixed transition-all right-4 data-[show=true]:translate-x-0 translate-x-[200%] bottom-40 md:right-8 md:bottom-8 flex flex-col gap-4 max-lg:bottom-4 z-10"
      >
        <button
          data-action="top"
          aria-label="Voltar ao topo"
          class="bg-primary-500 aspect-square transition-all stroke-white pop hover:bg-primary-600 flex justify-center items-center text-white rounded-md py-3 px-2"
        >
          <Icon id="AngleUp" size={20} strokeWidth={2} />
        </button>
      </div>
      <FloatingButtonsJS rootId="floating-buttons" threshold={120} />
    </>
  );
}
