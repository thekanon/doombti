INSERT INTO surveys (title, category, createdat, icon)
VALUES
(
'선호하는 기술스택을 선택해주세요',
'선호기술',
1609632000,
'icon3.png'
);

INSERT INTO surveys (title, category, createdat, icon)
VALUES
(
'귀하의 연차를 선택해주세요',
'연차',
1609633000,
'icon3.png'
);

INSERT INTO surveys (title, category, createdat, icon)
VALUES
(
'특별히 좋아하는 기술이나 도메인을 선택해주세요',
'특별히 좋아하는 기술',
1609634000,
'icon3.png'
);

INSERT INTO surveys (title, category, createdat, icon)
VALUES
(
'귀하의 MBTI 유형을 선택해주세요',
'MBTI',
1609635000,
'icon3.png'
);


-- survey_options 옵션 추가 
INSERT INTO survey_options (survey_id, survey_category, survey_text, createdat, icon)
VALUES
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'JavaScript', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'Python', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'HTML/CSS', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'SQL', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'Java', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'C#', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'PHP', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'Ruby', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'Swift', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'Kotlin', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'JavaScript', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'React', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'Angular', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'Vue.js', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'TypeScript', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'HTML/CSS (Sass, Less)', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'Webpack', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'Node.js', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'GraphQL', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'Redux', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'Bootstrap', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'jQuery', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/프론트엔드', 'Gatsby', 1609631000, 'icon3.png');


INSERT INTO survey_options (survey_id, survey_category, survey_text, createdat, icon)
VALUES
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Python (Django, Flask)', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Django', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Flask', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Java (Spring, Hibernate)', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Spring', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Hibernate', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Node.js (Express)', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Express', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Ruby on Rails', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'C# (ASP.NET)', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'ASP.NET', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'PHP', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Go', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'SQL', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'NoSQL', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/백엔드', 'Docker', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/앱', 'Swift', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/앱', 'Kotlin', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/앱', 'Java', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/앱', 'React Native', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/앱', 'Flutter', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/앱', 'Xamarin', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/앱', 'Objective-C', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/앱', 'C#', 1609631000, 'icon3.png');

INSERT INTO survey_options (survey_id, survey_category, survey_text, createdat, icon)
VALUES
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'Python', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'Pandas', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'NumPy', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'R', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'SQL', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'NoSQL', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'Hadoop', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'Spark', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'TensorFlow', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'Keras', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'PyTorch', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/데이터', 'Jupyter', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/디자인', 'JavaScript', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/디자인', 'HTML/CSS', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/디자인', 'Adobe XD', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/디자인', 'Sketch', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/디자인', 'Figma', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/디자인', 'InVision', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/디자인', 'Photoshop', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/디자인', 'Illustrator', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/디자인', 'After Effects', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/디자인', 'Axure', 1609631000, 'icon3.png');

INSERT INTO survey_options (survey_id, survey_category, survey_text, createdat, icon)
VALUES
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기획', 'SQL', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기획', 'Python', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기획', 'JavaScript', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기획', 'Java', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기획', 'R', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기획', 'PHP', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기획', 'C#', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기획', 'Excel VBA', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기획', 'Swift', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기획', 'Kotlin', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/마케팅', 'JavaScript', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/마케팅', 'HTML/CSS', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/마케팅', 'Python', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/마케팅', 'SQL', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/마케팅', 'PHP', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/마케팅', 'Ruby', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/마케팅', 'Java', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/마케팅', 'C#', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/마케팅', 'Excel VBA', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/마케팅', 'R', 1609631000, 'icon3.png');

INSERT INTO survey_options (survey_id, survey_category, survey_text, createdat, icon)
VALUES
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기타', 'Python', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기타', 'JavaScript', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기타', 'Java', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기타', 'C++', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기타', 'C#', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기타', 'Ruby', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기타', 'PHP', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기타', 'Go', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기타', 'Rust', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/기타', 'TypeScript', 1609631000, 'icon3.png');

INSERT INTO survey_options (survey_id, survey_category, survey_text, createdat, icon)
VALUES
('39ff1b35-8920-4a05-b6f1-6f9c7657be29', '연차', '아직 경력이 없어요', 1609631000, 'icon3.png'),
('39ff1b35-8920-4a05-b6f1-6f9c7657be29', '연차', '1년 미만', 1609631000, 'icon3.png'),
('39ff1b35-8920-4a05-b6f1-6f9c7657be29', '연차', '1년 이상 3년 미만', 1609631000, 'icon3.png'),
('39ff1b35-8920-4a05-b6f1-6f9c7657be29', '연차', '3년 이상 5년 미만', 1609631000, 'icon3.png'),
('39ff1b35-8920-4a05-b6f1-6f9c7657be29', '연차', '5년 이상 10년 미만', 1609631000, 'icon3.png'),
('39ff1b35-8920-4a05-b6f1-6f9c7657be29', '연차', '10년 이상', 1609631000, 'icon3.png');

INSERT INTO survey_options (survey_id, survey_category, survey_text, createdat, icon)
VALUES
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ISTJ', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ISFJ', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'INFJ', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'INTJ', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ISTP', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ISFP', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'INFP', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'INTP', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ESTP', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ESFP', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ENFP', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ENTP', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ESTJ', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ESFJ', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ENFJ', 1609631000, 'icon3.png'),
('41ac8852-7da9-448c-bdce-2a9d205fb4d1', 'MBTI', 'ENTJ', 1609631000, 'icon3.png');

INSERT INTO survey_options (survey_id, survey_category, survey_text, createdat, icon)
VALUES
('cfc5d2e3-92a1-4feb-acaa-26413fe05f69', '특별히 좋아하는 분야', '컴퓨터 공학의 기초를 단단히 쌓고싶어요.', 1609631000, 'icon3.png'),
('cfc5d2e3-92a1-4feb-acaa-26413fe05f69', '특별히 좋아하는 분야', '알고리즘을 틈틈히 공부하고 싶어요.', 1609631000, 'icon3.png'),
('cfc5d2e3-92a1-4feb-acaa-26413fe05f69', '특별히 좋아하는 분야', '데이터 분석/시각화 등 데이터를 활용하는 것에 고민이 많아요.', 1609631000, 'icon3.png'),
('cfc5d2e3-92a1-4feb-acaa-26413fe05f69', '특별히 좋아하는 분야', '프롬프트 엔지니어링 등 AI에 대해 배워보고 싶어요.', 1609631000, 'icon3.png'),
('cfc5d2e3-92a1-4feb-acaa-26413fe05f69', '특별히 좋아하는 분야', '성장에 대해 고민하고, 커리어를 발전시키는것을 고민하고 있어요', 1609631000, 'icon3.png'),
('cfc5d2e3-92a1-4feb-acaa-26413fe05f69', '특별히 좋아하는 분야', '트렌디한 프론트엔드 기술에 관심이 많아요.', 1609631000, 'icon3.png'),
('cfc5d2e3-92a1-4feb-acaa-26413fe05f69', '특별히 좋아하는 분야', '트렌디한 백엔드 기술에 관심이 많아요.', 1609631000, 'icon3.png'),
('cfc5d2e3-92a1-4feb-acaa-26413fe05f69', '특별히 좋아하는 분야', '제가 가진 기술로 뭔갈 해서 수익을 내고 싶어요.', 1609631000, 'icon3.png');
