import React from "react";
import ReactDOM from "react-dom/client";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-black bg-opacity-70 text-white py-3 text-nowrap text-center">
      <div className="text-lg font-medium">LinkedIn AI Reply</div>
      <hr/>
      <div className="text-sm px-3">
        Chrome extension that generates <br />
        AI-based replies on LinkedIn.
      </div>
    </div>
  </React.StrictMode>
);
