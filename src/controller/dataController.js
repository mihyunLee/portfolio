/**
 * DataController Interface
 *
 * get()
 */

import { END_POINT } from "../constants";

class DataController {
  async getFiles(folderName) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.FILES}?name=${folderName}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("파일을 가져올 수 없습니다.");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("파일 가져오기 실패:", error);
    }
  }
}

const dataController = new DataController();

export default dataController;
