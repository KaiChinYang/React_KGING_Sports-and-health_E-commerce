import { RouterProvider } from "react-router";
import { router } from "./router";
import MessageToast from "./components/MessageToast";
import './App.css'

function App() {
  return (
    <>
      <MessageToast />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
