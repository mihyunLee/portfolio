# 📜 Personal Portfolio

<br>

> Notion 이력서와 플랫폼에서 제공되는 이력서 양식의 불편함을 개선하고자 기획/제작하게 된 개인 이력서 프로젝트입니다.

<br>
<br>

# 🚀 Getting Started

## 배포 링크

> 배포 링크에는 개인 정보가 담겨져 있어 따로 명시하고 있지 않습니다.

<br>

# 📱 프로젝트 아키텍처

![아키텍처](https://user-images.githubusercontent.com/51310674/275327700-b09674eb-d884-4022-9fff-4b88dc1abaac.png)

<br>

# ✅ 구현 상세 내용

<br>

## 1. Vite 기반 프로젝트

기존에 리액트 프로젝트를 구성할 때 CRA(Create-React-App)을 활용하는 방식을 사용해왔습니다.
CRA는 Webpack을 기반으로 한 빌드 시스템을 사용하고 있고 초기 설정이 되어 있어 간편하다는 점에 있어서 많이 이용하였지만 이번 프로젝트에서는 보다 빠르게 빌드를 처리한다는 Vite를 사용해보고자 했습니다.

Vite는 Webpack Dev Server와는 다르게 로컬 개발 시 번들링을 하지 않고 ESM 방식을 사용하여 로컬 서버 구동 속도에서 장점을 가지고 있었습니다. 이번 프로젝트의 규모가 크지 않아 실제 큰 차이를 느끼지 못했지만 Webpack 외의 새로운 빌드 툴을 사용해볼 수 있어서 좋은 경험이었습니다.

<br>

## 2. AWS S3, AWS Lambda, Amazon API Gateway 사용

이력서에 필요한 정보(자기소개, 프로젝트, 개인정보 등)들은 현재 마크다운 파일로 작성되어 있습니다. 기존에는 Express로 서버를 구성하여 로컬 파일에서 마크다운 파일들을 찾아 응답 값으로 보내주는 서버를 구축했었고, 이를 배포하여 사용하기 위해서는 AWS EC2등을 활용한 배포가 필요했습니다.

하지만 현재 사용되고 있는 HTTP Method는 `get`을 사용하여 해당 마크다운 파일을 json 형태로 읽어오는 것이었으므로 `AWS EC2`를 통한 배포까지는 필요 없다고 생각했습니다. `AWS Lambda`는 서버리스 컴퓨팅 서비스로 서버를 관리하지 않아도 되고, 현재 사이트를 방문하는 사용자가 많지 않기 때문에 비용적인 측면에서도 EC2보다 적합하다고 생각했습니다. 또한 S3를 사용하여 로컬에 파일을 따로 저장하지 않아도 되어 기존의 Express 서버의 구성에서 변경하게 되었습니다.

<b> 🤔 트러블 슈팅 </b>

> 문제 사항 1. AWS Lambda 함수에서 이벤트 객체가 빈 값으로 출력

요청 URL의 쿼리 파라미터 값을 가져오기 위해서는 람다 함수의 `handler` 함수에서 `event` 매개변수를 사용할 수 있습니다. 하지만 계속해서 event 객체는 빈 값으로 출력되고 있었고 이 문제는 API Gateway에서 Lambda 프록시 통합을 활성화하지 않아서 생긴 문제였습니다.

API Gateway가 매개변수를 포함한 이벤트 세부 정보를 Lambda에 전달하기 위해서는 이 옵션이 활성화되어야 했습니다. 이는 클라이언트가 백엔드에서 단일 Lambda 함수를 호출할 수 있도록 합니다.

> 문제 사항 2. S3.GetObjectCommand의 인스턴스에서 Body 객체를 배열에 저장할 수 없는 오류

```js
export const handler = async (event) => {
  // (...)

  for (const key of contentsKey) {
    const commandGetObject = new GetObjectCommand({
      Bucket: BUCKET,
      Key: `data/${dirname}/${key}`,
    });

    const { Body } = await s3Client.send(commandGetObject);

    if (!Body) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "가져올 파일이 존재하지 않습니다." }),
      };
    }

    const content = await Body.toString();

    contentsData.push(content); // ERROR
  }
};
```

Lambda의 handler 함수에서는 S3 버킷 객체에서 가져온 파일을 `contentsData` 배열에 넣어주는 로직이 존재합니다.

```typescript
Body?: Readable | ReadableStream | Blob;
```

하지만 `Body`의 유형은 `Readable | ReadableStream | Blob`(cf. [type](https://github.com/aws/aws-sdk-js-v3/blob/25cb359e69966c549eb505956c2aeee809819245/clients/client-s3/models/models_0.ts#L6560)) 으로 배열에 저장할 수 없었습니다. ReadableStream 타입은 비동기 스트림 데이터를 나타나는 객체로 비동기 처리와 함께 특정 API를 사용해야 합니다. 따라서 별도의 `streamToString` 함수를 만들어 ReadableStream 타입을 String 타임으로 변경하여 배열에 저장하였습니다. (cf. [AWS sdk Github Issue](https://github.com/aws/aws-sdk-js-v3/issues/1877#issuecomment-755387549))

<br>

## 3. React의 useReducer Hooks을 활용하여 서버 상태 관리

https://github.com/mihyunLee/portfolio/blob/90d579e046645f4abcdda7fff16751f7862c2bd7/src/hooks/useData.jsx#L4-L31

useData() 커스텀 훅은 API를 요청하고 응답 값으로 받은 파일 정보와 패칭 로딩 상태를 반환합니다.
이 때 React Hook 중 하나인 useReducer를 사용하면 이러한 서버의 상태 업데이트 로직을 분리할 수 있습니다.

https://github.com/mihyunLee/portfolio/blob/90d579e046645f4abcdda7fff16751f7862c2bd7/src/hooks/useData.jsx#L14-L17

useState를 사용해도 상태를 업데이트 할 수 있지만 useReducer를 사용함으로써 상태 업데이트 로직을 컴포넌트 외부로 분리할 수 있었고, 재사용성을 증가시킬 수 있었습니다.

<br>

# 🤝 커밋 컨벤션

| 태그           | 설명 (한국어로만 작성하기)                                     |
| -------------- | -------------------------------------------------------------- |
| `✨ FEAT:`     | 새로운 기능 추가 (변수명 변경 포함)                            |
| `🐛 FIX:`      | 버그 해결                                                      |
| `💄 DESIGN:`   | CSS 등 사용자 UI 디자인 변경                                   |
| `🎨 STYLE:`    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우          |
| `♻️ REFACTOR:` | 프로덕션 코드 리팩토링                                         |
| `💬 COMMENT:`  | 필요한 주석 추가 및 변경                                       |
| `📝 DOCS:`     | 문서를 수정한 경우                                             |
| `⚙️ CHORE:`    | 빌드 테스크 업데이트, 패키지 매니저 설정(프로덕션 코드 변경 X) |
| `🔄️ RENAME:`  | 파일 혹은 폴더명을 수정하거나 옮기는 작업                      |
| `🚚 REMOVE:`   | 파일을 삭제하는 작업만 수행한 경우                             |
| `🎉 INIT:`     | 초기 커밋을 진행한 경우                                        |

<br>

# ⚙️ 기술 스택

<div style='display: flex'>
  <img src="https://img.shields.io/badge/React-61DAFB?style=square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/ReactMarkdown-gray?style=square&logo=ReactMarkdown&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReMark-000000?style=square&logo=Remark&logoColor=white"/>
	<img src="https://img.shields.io/badge/Styled_Components-DB7093?style=square&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon_API_Gateway-FF4F8B?style=square&logo=amazon-api-gateway&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS_Lambda-FF9900?style=square&logo=aws-lambda&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon_S3-569A31?style=square&logo=amazon-s3&logoColor=white"/>
  <img src="https://img.shields.io/badge/vercel-000000?style=square&logo=vercel&logoColor=white"/>
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=square&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/prettier-F7B93E?style=square&logo=prettier&logoColor=black"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=square&logo=GitHub&logoColor=white"/>
  <img src="https://img.shields.io/badge/git-F05032?style=square&logo=git&logoColor=white">
</div>
