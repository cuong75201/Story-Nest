import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import UserLayout from "./layouts/user/layout";
import { RouterProvider } from "react-router/dom";
import UserHomePage from "./pages/home/home.tsx";
import {ToastProvider} from "./context/toast.context.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    Component: UserLayout,
    children: [
      {
        index: true,
        Component: UserHomePage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <Suspense fallback={<p>Đang tải...</p>}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </ToastProvider>
  </StrictMode>,
);
