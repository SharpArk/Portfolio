import { useState, useEffect } from "react";
import styles from "../styles/head.module.css";

function Head() {
  const [isOpen, setIsOpen] = useState(false);
  const [zIndexClass, setZIndexClass] = useState("z-10");
  const [activeImage, setActiveImage] = useState(0);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setZIndexClass("z-20"); // cuando abre, sube al frente de inmediato
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    } else {
      // cuando cierra, esperar 300ms antes de mandar atrás
      const timer = setTimeout(() => {
        setZIndexClass("-z-10");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      <header className="w-full h-20 fixed flex items-center p-5 z-30">
        <div
          className="aspect-square w-9 flex flex-col justify-around gap-3 cursor-pointer relative"
          onClick={onClick}
        >
          <div
            className={`bg-white h-3 w-full absolute top-0 transition-all duration-300 ${
              isOpen ? "rotate-45 top-1/2 -translate-y-1/2" : ""
            }`}
          ></div>
          <div
            className={`bg-white h-3 w-full absolute bottom-0 transition-all duration-300 ${
              isOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : ""
            }`}
          ></div>
        </div>
      </header>

      <div
        className={`w-full h-full flex flex-col sm:flex-row fixed transition-all duration-300 ${zIndexClass}`}
      >
        <nav
          className={`w-full h-full bg-[#170c2290] backdrop-blur-3xl transition-all duration-300 flex flex-col gap-6 justify-center items-center ${
            styles.nav
          } ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <a
            className="text-6xl transition-colors duration-400 hover:text-green"
            href="/"
            onMouseEnter={() => setActiveImage(1)}
            onMouseLeave={() => setActiveImage(0)}
          >
            Home
          </a>
          <a
            className="text-6xl transition-colors duration-400 hover:text-green"
            href="/Publications"
            onMouseEnter={() => setActiveImage(2)}
            onMouseLeave={() => setActiveImage(0)}
          >
            Publications
          </a>
        </nav>

        <div
          className={`h-0 w-0 hidden sm:block sm:w-full sm:h-full bg-purple transition-all duration-300 relative ${
            styles.images
          } ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <img
            src={`/Jolyne.png`}
            alt=""
            className={`h-full object-cover transition-opacity duration-500 absolute ${
              activeImage === 1 ? "opacity-100" : "opacity-0"
            }`}
          />
          <img
            src={`/Desings/interestelar background.png`}
            alt=""
            className={`h-full object-cover transition-opacity duration-500 absolute ${
              activeImage === 2 ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </>
  );
}

export default Head;
