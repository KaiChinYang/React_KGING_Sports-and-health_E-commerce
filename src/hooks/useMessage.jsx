
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../slice/messageSlice";
import { useCallback } from "react";

export default function useMessage() {
  const dispatch = useDispatch();
  // 使用 useCallback 包裹，並將 dispatch 放入依賴陣列
  // 因為 dispatch 參照是穩定的，這會確保 showSuccess 參照也是穩定的
  const showSuccess = useCallback(
    (message) => {
      dispatch(
        createAsyncMessage({
          success: true,
          message,
        }),
      );
    },
    [dispatch],
  );

  const showError = useCallback(
    (message) => {
      dispatch(
        createAsyncMessage({
          success: false,
          message,
        }),
      );
    },
    [dispatch],
  );
  return { showSuccess, showError };
}
