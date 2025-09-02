import { useState } from "react";

function Head() {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header class="w-full h-20 fixed flex items-center p-5">
      <div
        class="aspect-square w-9 flex flex-col justify-around gap-3 cursor-pointer relative"
        onClick={onClick}
      >
        <div
          class={`bg-white h-3 w-full absolute top-0 transition-all duration-300 ${
            isOpen ? "rotate-45 top-1/2 -translate-y-1/2" : ""
          }`}
        ></div>
        <div
          class={`bg-white h-3 w-full absolute bottom-0 transition-all duration-300 ${
            isOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : ""
          }`}
        ></div>
      </div>
    </header>
  );
}

export default Head;
