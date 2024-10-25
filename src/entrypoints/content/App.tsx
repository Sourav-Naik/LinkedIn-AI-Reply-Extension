import ReactDOM from "react-dom";
import AiEnabled from "../../components/AiEnabled";

export default function App({
  textbox,
  textarea,
}: {
  textbox: any;
  textarea: any;
}) {
  const handleSetRes = (newRes: string) => {
    if (textarea && newRes) {
      if (textarea.firstChild) {
        (textarea.firstChild as HTMLElement).innerText = newRes;
      }
      if (textarea.nextElementSibling) {
        (textarea.nextElementSibling as HTMLElement).style.visibility = "hidden";
      }
    }
  };
  return (
    <>
      {textbox &&
        ReactDOM.createPortal(<AiEnabled setRes={handleSetRes} />, textbox)}
    </>
  );
}
