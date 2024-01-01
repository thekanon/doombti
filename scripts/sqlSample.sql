-- DELETE 테이블;
--DELETE FROM QuestionOptions;
--DELETE FROM questions;
DELETE FROM surveys;

-- delete row
DELETE FROM surveys WHERE Id = '942915c1-587f-4510-856d-2c8c78956eb5';


-- select 테이블;
select *
from Questions;
where Answerid = '9319ac1f-bea3-497b-83f3-962d0b3f5a2f';

-- 현재 테이블의 row수를 구하는 쿼리
select count(*) from Questions;

-- 현재 테이블의 특정 컬럼의 종류를 구하는 쿼리
SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name   = 'questions';

-- 신규 테이블 생성
CREATE TABLE QuestionOptions (
    Id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    QuestionId int NOT NULL,
    OptionText nvarchar(100) NOT NULL,
    IsAnswer bit NOT NULL
);

-- 해당 테이블에 존재하는 각 컬럼 이름을 구하는 쿼리;
SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public' -- 스키마명을 입력하세요, 기본값은 'public'
  AND table_name   = 'questions'; -- 테이블명을 입력하세요

-- 테이블 정보 보는 쿼리
SELECT *
FROM information_schema.columns
WHERE table_schema = 'public' -- 스키마명
  AND table_name   = 'survey_options'; -- 테이블명

  
--테이블 입력 권한 체크
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 테이블 생성
CREATE TABLE surveys (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    category character varying(100) NOT NULL,
    createdat bigint NOT NULL,
    icon character varying(255) NOT NULL,
    PRIMARY KEY (id)
);


-- option table 생성 
CREATE TABLE survey_options (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    survey_id uuid NOT NULL,
    survey_category character varying NOT NULL,
    survey_text character varying NOT NULL,
    createdat bigint NOT NULL,
    icon character varying(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (survey_id) REFERENCES surveys (id)
);


SELECT *
FROM information_schema.tables
WHERE table_name = 'step_questions';

select *
from surveys;

select *
from survey_options
where survey_id = 'cfc5d2e3-92a1-4feb-acaa-26413fe05f69'
;

-- surveys row 추가
INSERT INTO surveys (title, category, createdat, icon)
VALUES
(
'선호하는 기술스택을 선택해주세요',
'선호기술', 
1609632000, 
'icon3.png'
);

-- survey_options 옵션 추가 
INSERT INTO survey_options (survey_id, survey_category, survey_text, createdat, icon)
VALUES
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'JavaScript', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'Python', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'HTML/CSS', 1609631000, 'icon3.png'),
('fea84e08-83ad-42b7-bc42-83258ac7b38a', '선호기술/아직 직무가 없어요', 'SQL', 1609631000, 'icon3.png');


INSERT INTO users (name, password, email, job_id, continuous_goal_achievement, set_goal, id, fb_uid, likedtechoption, careeryearnumber, mbti)
VALUES 
('John Doe','password', 'johndoe@example.com', NULL, TRUE, 5, 'user_id', 'fb_user_id', NULL, '5년차', 'INTJ');
