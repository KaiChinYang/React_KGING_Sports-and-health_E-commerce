
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../slice/messageSlice";

export default function useMessage() {
  const dispatch = useDispatch();
  function showSuccess(message) {
    dispatch(
      createAsyncMessage({
        success: true,
        message,
      }),
    );
  }
  function showError(message) {
    dispatch(
      createAsyncMessage({
        success: false,
        message,
      }),
    );
  }
  return { showSuccess, showError };
}
