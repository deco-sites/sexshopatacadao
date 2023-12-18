interface Props {
  title?: string;
  alignment?: "center" | "left";
}

function Header({ title, alignment = "center" }: Props) {
  return (
    <>
      {title
        ? (
          <div
            class={`relative flex flex-col my-[0.83rem] ${
              alignment === "left"
                ? "items-start text-start"
                : "items-center text-center"
            } w-full`}
          >
            {title &&
              (
                <h2
                  class={`bg-white w-fit relative text-3xl z-[1] text-primary-500 leading-[1.15] uppercase px-10`}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
            <div class="absolute w-[88%] h-1 bg-primary-500 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
          </div>
        )
        : null}
    </>
  );
}

export default Header;
