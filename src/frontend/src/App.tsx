import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { router } from "./router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.14 0.02 270)",
            border: "1px solid oklch(0.22 0.02 270)",
            color: "oklch(0.96 0.01 258)",
          },
        }}
      />
    </>
  );
}
