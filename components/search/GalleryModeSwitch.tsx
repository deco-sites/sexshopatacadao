import { invoke } from "$store/runtime.ts";
import { GalleryMode } from "deco-sites/sexshopatacadao/actions/gallery/mode.ts";
import Icon from "deco-sites/sexshopatacadao/components/ui/Icon.tsx";

export interface GalleryModeSwitchProps {
  current: GalleryMode;
}

function GalleryModeSwitch({ current }: GalleryModeSwitchProps) {
  const update = (mode: GalleryMode) => {
    if (mode === current) return;

    invoke["deco-sites/sexshopatacadao"].actions.gallery.mode({
      mode,
    }).then(() => window.location.reload());
  };

  return (
    <div class="flex gap-2 font-montserrat text-[#3f3f40]">
      <button
        data-active={current === "grid"}
        type="button"
        onClick={() => update("grid")}
        class="flex items-center justify-center gap-2 w-[100px] h-10 rounded-[5px] bg-gray-200 data-[active='true']:bg-primary-500 data-[active='true']:text-white"
      >
        <Icon id="GalleryGrid" size={16} />
        Grade
      </button>
      <button
        data-active={current === "list"}
        type="button"
        onClick={() => update("list")}
        class="flex items-center justify-center  gap-2 w-[100px] h-10 rounded-[5px] bg-gray-200 data-[active='true']:bg-primary-500 data-[active='true']:text-white"
      >
        <Icon id="GalleryList" size={22} />
        Lista
      </button>
    </div>
  );
}

export default GalleryModeSwitch;
