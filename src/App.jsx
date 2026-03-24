import { useState } from "react";
// import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./router";
import MessageToast from "./components/MessageToast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MessageToast />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
