# 겪은 문제

## 스타일링

진짜 tailwind 개같구먼
Image 컴포넌트를 쓰면 일반적인 스타일링을 사용하기 너무 어렵다.
퍼센트를 사용해봤는데, 그냥 상수를 넣는게 답인 것 같다.
퍼센트로하니까 엄청 깨지는데, 상수로 하니까 깨지지 않는다.

폰트를 적용해야한다.
import { Inter } from 'next/font/google'
-> 튜토리얼 사이트 보고 해결함

로딩 끝나면 스탭 페이지로 넘어가야한다

<w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: ENOENT: no such file or directory, rename '/home/leedo/바탕화면/source/side/doombti/.next/cache/webpack/client-development-fallback/0.pack.gz\_' -> '/home/leedo/바탕화면/source/side/doombti/.next/cache/webpack/client-development-fallback/0.pack.gz'

이건 뭔 에러야 스와이프 쓰니까 이 에러가 난다.
스토리북은 잘되는데 왜 dev는 안되는거지
-> 스와이프에도 use client가 있어야했다.

버튼 컴포넌트 안됨
-> 스타일 안가져왔었네
-> 다크모드 이거 좀 골때리네

tailwind 개어렵다.

컴포넌트 만들어야함

- 색 있는 아이콘이 있는 버튼

# question 페이지 구현방법?

1. 첫 로드 시 페이지에서 json 데이터 가져옴
   -> DB 연동해서 뿌리자
   -> postgreSQL 연동해서 뿌리자
   -> 샘플 데이터
   title='JavaScript에서 "hoisting"이란 무엇인가요?'
   description=""
   questions={[
   '변수와 함수 선언을 스크립트의 맨 위로 끌어올리는 JavaScript의 기본 행동',
   '페이지가 로드될 때 스크립트를 서버에서 클라이언트로 전송하는 과정',
   '함수 내에서만 사용할 수 있는 변수를 선언하는 방법',
   'CSS 스타일을 JavaScript로 동적으로 조작하는 방법',
   ]

   pnpm install uuid

2. json 데이터를 컨테이너에 props로 넘겨줌
3. 컨테이너에서 json 데이터를 통해 인터렉션을 구현함.

- 이미지 alt태그가 서버사이드에서, 클라이언트 사이드에서 둘다 생성되어 매치가 안됨.
- 랜덤 함수를 굳이 쓸 필요가 없다. 그냥 고정값으로 줌

# 해야할일

1. 아이콘 버튼 클릭했을때 정보 가져오도록 해야함
2. Zustand를 이용하여 iconButton 핸들링
   - pnpm install zustand

# 문제점

서버사이드에서 api 요청 후 응답 데이터를 props으로 데이터 넘기는데 이를 클라이언트 사이드에서 이를 zustand store에 넣는 불필요한 과정이 있음. 가능하다면 서버사이드에서 바로 zustand store에 넣고싶음
-> use Effect가 답인가

# 로딩 대체 ui

로딩 컴포넌트 자체가 클라이언트 컴포넌트여서
화면 로드되는 짧은 시간동안 잠시 안보이는 문제가 있음
이를 개선하기 위해 state로 대체 ui를 표시하도록 수정하려 했으나
클라이언트 컴포넌트가 로드 되었는지 아닌지 확실하게 알기 어려웠음

애초에 컴포넌트가 로드되지 않아도 페이지의 레이아웃이 변경되지 않도록 css를 수정하는 방식으로 해결함

# 일단 해보기 성능개선
