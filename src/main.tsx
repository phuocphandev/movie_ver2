import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "store";
import {Provider} from 'react-redux'
import { StyleProvider } from '@ant-design/cssinjs';

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer position="top-center" />
      <StyleProvider hashPriority="high">
      <App />
      </StyleProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
);
