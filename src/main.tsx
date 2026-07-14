import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import App from "./App.tsx";
import { SmoothScroll, AppMotionProvider } from "./providers";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppMotionProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </AppMotionProvider>
    </Provider>
  </React.StrictMode>
);
