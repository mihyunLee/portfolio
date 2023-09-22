// 라이브러리 불러오기
import express from "express";
import fs from "fs";
import path from "path";
import http from "http";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);
const currentModuleDir = path
  .dirname(new URL(import.meta.url).pathname)
  .slice(3); // esmodule 에서는 __dirname 사용 불가
const dirPath = path.join(currentModuleDir, "data");

// CORS 이슈 해결
app.use(express.json());
app.use(cors());

// 정적 파일 서비스 등록
app.use(express.static(dirPath));

// get 요청
app.get("/api/files", async (req, res) => {
  const dirname = req.query.name;
  const mdFileList = [];

  if (!dirname) {
    res.status(400).json({ error: "디렉토리 경로가 제공되지 않았습니다." });
    return;
  }

  const mdDirPath = path.join(dirPath, dirname);

  try {
    const stat = fs.lstatSync(mdDirPath);

    if (stat.isDirectory()) {
      const fileList = fs.readdirSync(mdDirPath);

      if (Array.isArray(fileList) && fileList.length === 0) {
        // 특정 디렉토리에 file 유무 체크
        res.status(500).json({ error: "가져올 파일이 존재하지 않습니다." });
        return;
      } else {
        fileList.forEach((list) => mdFileList.push(list));
      }
    }
  } catch (err) {
    console.error("디렉토리 읽기 실패:", err);
    res.status(500).json({ error: "디렉토리 읽기 실패" });
  }

  const responseFile = [];

  mdFileList.forEach((file) => {
    if (file.length > 0) {
      const filePath = path.join(mdDirPath, file);
      const dataObj = { data: fs.readFileSync(filePath, "utf-8") };

      responseFile.push(dataObj);
    }
  });

  res.json(responseFile);
});

httpServer.listen(8080, () => {
  console.log("Listening on 8080");
});
