import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { reportWebVitals } from "./reportWebVitals";
import { routes } from "./routes";
import { enableMsw } from "./util/api";

async function main() {
  if (enableMsw) {
    if (window.location.pathname === process.env.PUBLIC_URL) {
      window.location.pathname = process.env.PUBLIC_URL + "/";
    }

    const { worker } = await import("./mocks/browser");
    await worker.start({
      serviceWorker: {
        url: process.env.PUBLIC_URL + "/mockServiceWorker.js"
      },
      onUnhandledRequest: "bypass"
    });
  }

  const router = createBrowserRouter(routes, {
    basename: process.env.PUBLIC_URL
  });

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

main();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
