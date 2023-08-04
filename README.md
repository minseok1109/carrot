# 상한당근 - 중고물품을 경매로 팔아보세요!

평소에 중고물품을 거래할 때 판매자와 구매자가 가격을 가지고 흥정을 하는 경우를 많이 봤습니다.<br/>
그래서 이러한 문제를 해결하고자 경매시스템을 중고거래에 붙여 불필요한 흥정과정을 해결하고자 하였습니다.

## URL

https://carrot-three.vercel.app/

## 기술 스택

<img  src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="socket.io">
<img src="https://img.shields.io/badge/nextjs-010101?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextjs">
<br/>
<img src="https://img.shields.io/badge/chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="chart.js">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript">
<br/>
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwindcss">
<img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white" alt="amazon S3">
<img src="https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="daisyui">

## 프로젝트 진행시 어려웠던 점

- 차트를 처음 다루어보아서 어떤 식으로 해아할 지 처음에 감을 잡지 못했습니다.
- 차트에 데이터가 1초에 한번씩 추가되는데 추가될 때마다 차트가 길어지고 오른쪽으로 스크롤을 해야만 최신 데이터가 보이기 때문에 초기 렌더링부터 계속 최신 데이터가 보이도록 수정
- aws s3에 사진을 업로드하는 방식을 처음 다뤄봐서 헤메었습니다. (생각보다 공식문서가 별로)

# 프로젝트 설치 및 실행 방법

```bash
git clone https://github.com/minseok1109/carrot.git
npm install
npm run dev
```

