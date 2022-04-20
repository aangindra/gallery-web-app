import { forwardRef, useState, useRef, useImperativeHandle } from "react";
import Gallery from "./components/Gallery";
import "./App.css";

let _loadingSpinnerRef = null;
const LoadingSpinner = forwardRef((props, ref) => {
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
      <style jsx>{`
          .loader-wrapper {
            -webkit-transition: visibility 0s linear 200ms, opacity 200ms linear; /* Safari */
            transition: visibility 0s linear 200ms, opacity 200ms linear;

            opacity: 1;
            position: fixed; /* Sit on top of the page content */
            display: block; /* Hidden by default */
            width: 100%; /* Full width (cover the whole page) */
            height: 100%; /* Full height (cover the whole page) */
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(
              243,
              243,
              243,
              0.4
            ); /* Black background with opacity */
            z-index: 9997; /* Specify a stack order in case you're using a different order for other elements */
            cursor: pointer; /* Add a pointer on hover */
          }
          .loader {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            border: 3px solid #f3f3f3; /* Light grey */
            border-top: 3px solid #54a9fe; /* Green */
            border-radius: 50%;
            width: 70px;
            height: 70px;
            animation: spin 1s linear infinite;
          }

          .mini-loader {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            border: 5px solid #ccc; /* Light grey */
            border-top: 5px solid #54a9fe; /* Green */
            border-radius: 50%;
            width: 45px;
            height: 45px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
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
