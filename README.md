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

일단해보기 눌렀을때 서버사이드에서 api를 가져오는데
기다리는동안 표시할 ui가 필요했음.
loading을 스켈레톤으로 수정함

# question 페이지 답변한 것 표시하기

- 세션스토리지를 통해 답변한 것을 표시함
- submit 누르면 세션스토리지에 일단 저장함

# confirm ui 구현

듀오링고에 있는 하단에서 올라오는 confirm ui를 구현

# 컨펌 인터렉션 구현

컨펌 누르면 지금까지 선택한 답변을 채점하여 정답을 보여줌

# submit 시 정답 ui

문제 - 정답
문제 - 정답
한개씩 나오고
마지막에 정답을 보여주는 방식으로 만들어보자

# 문제 풀때마다 서버에 저장해야할텐데

- 일단 샘플은 서버에 저장하지 말자

# GPT 프롬프트 작성

1. If I give you a 'category', you create a variable called question
2. The question should be the same structure as below
   {
   "category": "JavaScript/Scope",
   "question": "자바스크립트에서 '변수의 범위(scope)'에 대한 설명으로 올바른 것은 무엇입니까?",
   "options": [
   "'let' 키워드로 선언된 변수는 함수 레벨 스코프를 가집니다.",
   "전역 변수는 코드의 어느 곳에서나 접근할 수 있습니다.",
   "'var' 키워드로 선언된 변수는 블록 레벨 스코프를 가집니다.",
   "지역 변수는 선언된 함수 내부에서만 접근할 수 있습니다.",
   ],
   "correct_answer": 1
   "answer_description": "자바스크립트에서 전역 변수는 코드의 어느 곳에서나 접근할 수 있습니다. 이는 전역 변수가 전체 스크립트에 걸쳐 존재하며, 어떤 함수나 블록 내부가 아닌 최상위 레벨에서 선언됐기 때문입니다. 전역 변수의 이러한 특성은 강력하지만, 예상치 못한 충돌이나 오류를 야기할 수 있어 주의해서 사용해야 합니다. 반면에, 지역 변수(함수 내부에서 선언된 변수)는 해당 함수 내에서만 접근 가능하며, 'let'과 'const'는 블록 레벨 스코프를, 'var'는 함수 레벨 스코프를 가집니다."
   }
3. All contents should be written in Korean, and returned to code blocks.
4. It's not just a terminology description, but it's a key and difficult question needed in practice. Please.
   example) JavaScript의 "Promise" 객체는 어떤 용도로 사용되나요?, JavaScript/Observer에서 어떻게 이벤트 감시자를 만들 수 있나요?

# 선호하는 언어를 선택하면 그 언어로 문제가 나오도록

- 일단 열심히 추가한 insert 문제들을 한번에 불러오자.
- select category 페이지를 만들자.
- 카테고리 목록을 보여주고 클릭 시 해당 카테고리를 중복으로 선택할 수 있는 react 컴포넌트를 만들어보자.

# 회원가입 완료

- 회원가입 되면 해당 계정으로 로그인 할 수 있도록 추가 정보를 입력할 수 있어야 함
- 직무, 선호 언어, 연차, 좋아하는 기술을 선택할 수 있어야 함.
- ## 추가 정보 입력 하는 qusetion 페이지

  거의 다 끝났어요.
  필수는 아니지만 여러분들에 대해 더 알고싶은 것이 있어요.
  직무
  아직 직무가 없어요
  프론트엔드
  백엔드
  앱
  데이터
  디자인
  기획
  마케팅
  기타

  기술

1. 아직 직무가 없어요
   JavaScript
   Python
   HTML/CSS
   SQL
   Java
   C#
   PHP
   Ruby
   Swift
   Kotlin
2. 프론트엔드
   JavaScript (React, Angular, Vue.js)
   TypeScript
   HTML/CSS (Sass, Less)
   Webpack
   Node.js
   GraphQL
   Redux
   Bootstrap
   jQuery
   Gatsby
3. 백엔드
   Python (Django, Flask)
   Java (Spring, Hibernate)
   Node.js (Express)
   Ruby on Rails
   C# (ASP.NET)
   PHP (Laravel)
   Go
   SQL (MySQL, PostgreSQL)
   NoSQL (MongoDB)
   Docker
4. 앱
   Swift (iOS)
   Kotlin (Android)
   Java (Android)
   React Native
   Flutter
   Xamarin
   Objective-C (iOS)
   Cordova
   Firebase
   C#
5. 데이터
   Python
   Pandas
   NumPy
   R
   SQL
   NoSQL
   Hadoop
   Spark
   TensorFlow
   Keras
   PyTorch
   Jupyter
6. 디자인
   JavaScript
   HTML/CSS
   Adobe XD
   Sketch
   Figma
   InVision
   Photoshop
   Illustrator
   After Effects
   Axure
7. 기획
   SQL
   Python
   JavaScript
   Java
   R
   PHP
   C#
   Excel VBA
   Swift
   Kotlin
8. 마케팅
   JavaScript
   HTML/CSS
   Python
   SQL
   PHP
   Ruby
   Java
   C#
   Excel VBA
   R
9. 기타
   Python
   JavaScript
   Java
   C++
   C#
   Ruby
   PHP
   Go
   Rust
   TypeScript

연차
아직 경력이 없어요
1년 미만
1~3년
3~5년
5~10년
10년 이상

특별히 좋아하는 기술
컴퓨터 공학의 기초를 단단히 쌓고싶어요.
알고리즘을 틈틈히 공부하고 싶어요.
데이터 분석/시각화 등 데이터를 활용하는 것에 고민이 많아요.
프롬프트 엔지니어링 등 AI에 대해 배워보고 싶어요.
성장에 대해 고민하고, 커리어를 발전시키는것을 고민하고 있어요'
트렌디한 프론트엔드 기술에 관심이 많아요.
트렌디한 백엔드 기술에 관심이 많아요.
제가 가진 기술로 뭔갈 해서 수익을 내고 싶어요.

MBTI
ISTJ
ISFJ
INFJ
INTJ
ISTP
ISFP
INFP
INTP
ESTP
ESFP
ENFP
ENTP
ESTJ
ESFJ
ENFJ
ENTJ

# 회원가입 프로세스

구글 계정으로 연동 시
로그인 성공 시 uid로 유저를 가져옴
유저가 없으면 setRegister
유저가 있으면 dashboard로 이동

User가 푼 문제 테이블
uid - primary key
questionId - question 테이블의 id
userId - Users 테이블의 uid
createdAt - 푼 날짜
answer - 푼 답
correct - 맞았는지 틀렸는지

User가 응답한 설문 테이블
uid - primary key
surveyId - survey 테이블의 id
userId - Users 테이블의 uid
createdAt - 설문 날짜
answer - 응답한 답

Users 테이블
uid - primary key
직무 - 직무에 대한 id(특정 survey_options 테이블의 id) ㅜ
좋아하는 기술 - 좋아하는 기술에 대한 id(특정 survey_options 테이블의 id)
연속 목표 달성 - 연속 목표 달성 여부(true, false)
설정한 목표 - 설정한 목표(숫자)

# 클라이언트 api 호출

pnpm install react-query
pnpm install axios

# 회원가입 완료 후 추가 정보 페이지

전부 선택 후 submit 누르면 서버에 저장
-> 서버에 저장하고 로그인 페이지로 이동

## 직무 선택 시 선호기술 필터링

현재 index가 1인 경우
answerList[0]의 text로 필터링

## 회원가입 제출 버튼 눌렀을때 동작

0. 결과 페이지로 이동해야함
1. 유저 정보를 서버에 저장해야함
   유저 정보 : 파이어베이스 uid, 닉네임, 이메일, 직무, 선호기술, 연차, 좋아하는 기술, mbti, 목표, 목표 달성 여부
   아직 선호기술, 연차, MBTI는 구현하지 않음 - 컬럼 추가 및 설정 변경
   - likedTechOption
   - careerYearNumber
   - mbti
2. 유저가 응답한 설문을 서버에 저장해야함
3. 대시보드로 이동해야함

이 데이터베이스에서
users의 favorite_technology_id에
survey_options의 특정 id를 복수로 저장할 수 있는 일반적인 방법이 있을까?

제출 버튼 눌렀을때 회원가입 정보 입력끗

## 대시보드에서 데이터 가져오기

서버사이드에서 가져올 수 있으면 좋겠는데
서버사이드에서 파이어베이스 uid를 가져올 수 있을까?
https://velog.io/@sanglee/Next.js-Firebase%EB%A1%9C-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%A7%8C%EB%93%A4%EA%B8%B0

있다.
방법

1. firebase SDK admin 설정
2. getAuth 이후 토큰을 쿠키에 저장(nookies 사용)
3. 페이지 서버사이드에서 쿠키를 가져와서 사용

## multi select 구현

multi Select로 특정 문항을 선택할 수 있도록 구현함
저장 시 해당 문항도 저장되도록 구현함
