import { useEffect, useRef, useState } from "react";
import vector from "./Vector.png";
import vector1 from "./Vector_1.png";
import vector2 from "./Vector_2.png";

export default function Panel(props: any) {
  const res = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."; //prettier-ignore

  const [resPanel, setResPanel] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [qus, setQus] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        props.close();
      }
    };

    const shadowRoot: any = panelRef.current?.getRootNode() as ShadowRoot;
    if (shadowRoot) shadowRoot.addEventListener("click", handleClickOutside);

    return () => {
      if (shadowRoot)
        shadowRoot.removeEventListener("click", handleClickOutside);
    };
  }, [props]);
  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-500 bg-opacity-50 relative px-2">
      <div
        ref={panelRef}
        id="mainPanel"
        className="relative z-250 w-full max-w-4xl p-6 flex flex-col rounded-2xl gap-6 bg-gray-50"
      >
        {resPanel && (
          <>
            <div className="rounded-lg bg-gray-400 bg-opacity-30 p-3.5 ml-auto max-w-2xl text-gray-500">
              {qus.length > 0 ? qus : "Reply thanking for the opportunity"}
            </div>
            <div className="rounded-lg bg-blue-400 bg-opacity-30 p-3.5 mr-auto max-w-2xl text-gray-500">
              {res}
            </div>
          </>
        )}
        <input
          type="text"
          name="prompt"
          id="prompt"
          className="p-3.5 text-2xl h-[44px] outline-none border border-gray-300 rounded-lg flex items-center bg-white"
          placeholder="Your prompt"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="w-full flex justify-end gap-6 text-2xl">
          {resPanel && (
            <button
              className="py-3 px-6 rounded-lg flex items-center gap-2 bg-white text-gray-500 border-2 border-gray-400 font-semibold"
              onClick={() => {
                props.handleInsert(res);
                props.close();
              }}
            >
              <img src={vector2} alt="" className="w-5 h-5 object-fill" />
              Insert
            </button>
          )}
          <button
            className="py-3 px-6 rounded-lg flex items-center gap-2 bg-blue-500 text-white font-semibold"
            onClick={() => {
              setResPanel(true);
              setQus(prompt);
            }}
          >
            <img
              src={resPanel ? vector1 : vector}
              alt=""
              className="w-5 h-5 object-fill"
            />
            {resPanel ? "Regenerate" : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}
