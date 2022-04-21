import { forwardRef, useState, useRef, useImperativeHandle } from "react";
import Gallery from "./components/Gallery";
import "./App.css";

let _loadingSpinnerRef = null;

export const LoadingSpinner = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(props.visible);

  const show = () => {
    setVisible(true)
  }

  const hide = () => {
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <div>
      <div
        className="loader-wrapper"
        style={{
          visibility: visible ? "visible" : "hidden",
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="loader" />
      </div>
    </div>
  );
})

const App = () => {
  _loadingSpinnerRef = useRef();
  return (
    <div className="App">
      <LoadingSpinner visible={false} ref={_loadingSpinnerRef} />
      <Gallery />
    </div>
  );
}

export const showLoadingSpinner = () => {
  if (!_loadingSpinnerRef) return;
  _loadingSpinnerRef.current.show();
};

export const hideLoadingSpinner = () => {
  if (!_loadingSpinnerRef) return;
  _loadingSpinnerRef.current.hide();
};

export default App;
