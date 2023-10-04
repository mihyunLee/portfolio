import { useEffect, useReducer } from "react";
import dataController from "../controller/dataController";

function mdFileReducer(state, action) {
  switch (action.type) {
    case "REQUEST_FILE":
      return { ...state, isLoading: true };
    case "LOADING":
      return { ...state, file: action.file, isLoading: false };
  }
}

export default function useData(dirname) {
  const [{ file, isLoading }, dispatch] = useReducer(mdFileReducer, {
    file: null,
    isLoading: false,
  });

  useEffect(() => {
    dispatch({ type: "REQUEST_FILE" });

    dataController.getFiles(dirname).then((file) =>
      dispatch({
        type: "LOADING",
        file: file.data.length === 1 ? file.data[0] : file.data.reverse(),
      })
    );
  }, [dirname]);

  return { file, isLoading };
}
