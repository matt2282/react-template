import { Outlet, ScrollRestoration } from "react-router-dom";

/**
 * For now it's just here for ScrollRestoration but this is a
 * good place for global context and other things as well.
 */
export function App() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
