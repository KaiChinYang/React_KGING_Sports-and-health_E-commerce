import { RouterProvider } from "react-router";
import { router } from "./router";
import MessageToast from "./components/MessageToast";

function App() {
  return (
    <>
      <MessageToast />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
