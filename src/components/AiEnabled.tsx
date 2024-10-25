import img from "../public/icon.svg";
import { createRoot } from "react-dom/client";
import Panel from "./Panel";

export default function AiEnabled(props: any) {
  const handleInsert = (res: string) => props.setRes(res);

  const injectTailwind = (shadowRoot: ShadowRoot) => {
    const link = document.createElement("link");
    link.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"; //prettier-ignore
    link.rel = "stylesheet";
    shadowRoot.appendChild(link);
  };

  const handleClick = () => {
    const shadowContainer = document.createElement("div");
    shadowContainer.style.position = "fixed";
    shadowContainer.style.inset = "0";
    shadowContainer.style.zIndex = "200";

    const shadowRoot = shadowContainer.attachShadow({ mode: "open" });
    document.body.appendChild(shadowContainer);
    injectTailwind(shadowRoot);

    const panelRoot = createRoot(shadowRoot);
    const closePanel = () => document.body.removeChild(shadowContainer);
    panelRoot.render(<Panel close={closePanel} handleInsert={handleInsert} />);
  };

  return (
    <button
      style={{
        position: "absolute",
        bottom: "2px",
        right: "6px",
        zIndex: "10",
      }}
      onClick={handleClick}
    >
      <img
        src={img}
        alt="AI"
        style={{
          width: "30px",
          height: "30px",
        }}
      />
    </button>
  );
}
