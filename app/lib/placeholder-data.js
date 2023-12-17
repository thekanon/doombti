const { v4: uuidv4 } = require('uuid');

// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

// 예제 씨드 데이터
const questions = [
  {
    id: 'b9b1a8f7-3c7a-4c9b-a3c4-3c15dbb2f7e6',
    title: 'JavaScript에서 "hoisting"이란 무엇인가요?',
    category: 'JavaScript/Scope',
    createdAt: 1602624845,
    icon: 'https://img.icons8.com/color/48/000000/question.png',
    answerId: '3b241101-e2bb-4255-8caf-4136c566a962',
  },
  // 추가 문항 1
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'JavaScript의 "closure"란 무엇인가요?',
    category: 'JavaScript/Functions',
    createdAt: 1602625000,
    icon: 'https://img.icons8.com/color/48/000000/question.png',
    answerId: '123e4567-e89b-12d3-a456-426614174001',
  },
  // 추가 문항 2
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    title: 'JavaScript의 "Promise" 객체는 어떤 용도로 사용되나요?',
    category: 'JavaScript/Asynchronous',
    createdAt: 1602625160,
    icon: 'https://img.icons8.com/color/48/000000/question.png',
    answerId: '223e4567-e89b-12d3-a456-426614174001',
  },
  // 추가 문항 3
  {
    id: '223e4567-e89b-12d3-a456-426614174002',
    title: 'JavaScript에서 "this" 키워드는 어떤 상황에서 어떻게 사용되나요?',
    category: 'JavaScript/Objects',
    createdAt: 1602625320,
    icon: 'https://img.icons8.com/color/48/000000/question.png',
    answerId: '123e4567-e89b-12d3-a456-426614174002',
  },
  // 추가 문항 4
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    title:
      'JavaScript에서 "Event Bubbling"과 "Event Capturing"은 무엇을 의미하나요?',
    category: 'JavaScript/Events',
    createdAt: 1602625480,
    icon: 'https://img.icons8.com/color/48/000000/question.png',
    answerId: '223e4567-e89b-12d3-a456-426614174003',
  },
];

const questionOptions = [
  {
    id: uuidv4(),
    questionId: 'b9b1a8f7-3c7a-4c9b-a3c4-3c15dbb2f7e6',
    text: '페이지가 로드될 때 스크립트를 서버에서 클라이언트로 전송하는 과정',
  },
  {
    id: uuidv4(),
    questionId: 'b9b1a8f7-3c7a-4c9b-a3c4-3c15dbb2f7e6',
    text: '함수 내에서만 사용할 수 있는 변수를 선언하는 방법',
  },
  {
    id: '3b241101-e2bb-4255-8caf-4136c566a962',
    questionId: 'b9b1a8f7-3c7a-4c9b-a3c4-3c15dbb2f7e6',
    text: '변수와 함수 선언을 스크립트의 맨 위로 끌어올리는 JavaScript의 기본 행동',
  },
  {
    id: uuidv4(),
    questionId: 'b9b1a8f7-3c7a-4c9b-a3c4-3c15dbb2f7e6',
    text: 'CSS 스타일을 JavaScript로 동적으로 조작하는 방법',
  },

  // 추가 문항 1의 옵션
  {
    id: uuidv4(),
    questionId: '123e4567-e89b-12d3-a456-426614174000',
    text: '함수와 관련된 변수를 외부 스코프에서 접근 가능하게 하는 기능',
  },
  {
    id: uuidv4(),
    questionId: '123e4567-e89b-12d3-a456-426614174000',
    text: '프로게이머의 닉네임',
  },
  {
    id: uuidv4(),
    questionId: '123e4567-e89b-12d3-a456-426614174000',
    text: '함수 실행 후 반환값을 전달받는 방법',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    questionId: '123e4567-e89b-12d3-a456-426614174000',
    text: '내부 함수가 외부 함수의 컨텍스트에 접근할 수 있게 하는 기능',
  },

  // 추가 문항 2의 옵션
  {
    id: uuidv4(),
    questionId: '123e4567-e89b-12d3-a456-426614174001',
    text: '배열을 순차적으로 처리하는 반복문',
  },
  {
    id: uuidv4(),
    questionId: '123e4567-e89b-12d3-a456-426614174001',
    text: 'api를 호출할 때 사용하는 함수',
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174001',
    questionId: '123e4567-e89b-12d3-a456-426614174001',
    text: '비동기 연산의 최종 완료(또는 실패)를 나타내는 객체',
  },
  {
    id: uuidv4(),
    questionId: '123e4567-e89b-12d3-a456-426614174001',
    text: '특정 시간 후에 코드를 실행하는 타이머 함수',
  },

  // 추가 문항 3의 옵션
  {
    id: uuidv4(),
    questionId: '223e4567-e89b-12d3-a456-426614174002',
    text: '현재 실행 중인 함수를 가리키는 참조자',
  },
  {
    id: uuidv4(),
    questionId: '223e4567-e89b-12d3-a456-426614174002',
    text: '함수가 호출될 때 함수가 선언된 위치를 가리키는 키워드',
  },
  {
    id: uuidv4(),
    questionId: '223e4567-e89b-12d3-a456-426614174002',
    text: '전역 객체에 접근하는 방법',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    questionId: '223e4567-e89b-12d3-a456-426614174002',
    text: '함수가 호출될 때 함수가 속한 객체를 가리키는 키워드',
  },
  // 추가 문항 4의 옵션
  {
    id: uuidv4(),
    questionId: '123e4567-e89b-12d3-a456-426614174003',
    text: 'DOM 요소에서 이벤트를 다루는 두 가지 다른 방식',
  },
  {
    id: uuidv4(),
    questionId: '123e4567-e89b-12d3-a456-426614174003',
    text: '웹 페이지의 로딩 속도를 개선하는 기술',
  },
  {
    id: uuidv4(),
    questionId: '123e4567-e89b-12d3-a456-426614174003',
    text: '이벤트가 발생한 요소에서 상위 요소로 전파되는 과정',
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174003',
    questionId: '123e4567-e89b-12d3-a456-426614174003',
    text: '이벤트가 최상위 요소에서 시작하여 실제 이벤트 대상까지 도달하는 두 단계의 과정',
  },
];

module.exports = {
  users,
  customers,
  invoices,
  revenue,
  questions,
  questionOptions,
};
