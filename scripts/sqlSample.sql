-- DELETE 테이블;
DELETE FROM QuestionOptions;
DELETE FROM questions;

-- select 테이블;
select *
from Questions;
where Answerid = '9319ac1f-bea3-497b-83f3-962d0b3f5a2f';

-- 현재 테이블의 row수를 구하는 쿼리
select count(*) from Questions;

-- 현재 테이블의 특정 컬럼의 종류를 구하는 쿼리
select distinct Category 
from Questions
order by Category;
