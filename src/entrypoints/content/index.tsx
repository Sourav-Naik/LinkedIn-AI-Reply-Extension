import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import type { ContentScriptContext } from "wxt/client";

export default defineContentScript({
  matches: ["https://www.linkedin.com/*"],
  cssInjectionMode: "ui",
  main(ctx: ContentScriptContext) {
    const ui = createIntegratedUi(ctx, {
      position: "overlay",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);

        let currentTextbox: any = null;

        const renderApp = (textbox: any, textarea : any) => root ? root.render(<App textbox={textbox} textarea={textarea}/>) : null;

        const handleClick = (event: MouseEvent) => {

          const ele = event.target as HTMLElement;
          
          const textarea: any = ele.getAttribute("role") === "textbox" ? ele : ele.closest("div[role='textbox']");
          const textbox: any = textarea ? textarea.parentElement : null;

          if (textbox !== currentTextbox) {
            currentTextbox = textbox;
            renderApp(textbox,textarea);
          }
        };

        window.addEventListener("click", handleClick);

        return {
          onRemove: () => {
            window.removeEventListener("click", handleClick);
            root.unmount();
          },
        };
      },
    });

    ui.mount();
  },
});
