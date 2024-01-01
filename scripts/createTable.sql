CREATE TABLE user_solved_questions (
    uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    questionId UUID NOT NULL,
    userId UUID NOT NULL,
    createdAt BIGINT NOT NULL,
    answer TEXT,
    correct BOOLEAN,
    FOREIGN KEY (questionId) REFERENCES questions(id),
    FOREIGN KEY (userId) REFERENCES users(uid)
);


CREATE TABLE user_survey_responses (
    uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    surveyId UUID NOT NULL,
    userId UUID NOT NULL,
    createdAt BIGINT,
    answer TEXT,
    FOREIGN KEY (surveyId) REFERENCES surveys(id),
    FOREIGN KEY (userId) REFERENCES users(uid)
);

ALTER TABLE users
ADD COLUMN job_id UUID REFERENCES survey_options(id),
ADD COLUMN favorite_technology_id UUID REFERENCES survey_options(id),
ADD COLUMN continuous_goal_achievement BOOLEAN,
ADD COLUMN set_goal INTEGER;
