const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  questions,
  questionOptions,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
      );
      `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
          INSERT INTO revenue (month, revenue)
          VALUES (${rev.month}, ${rev.revenue})
          ON CONFLICT (month) DO NOTHING;
          `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS customers (
              id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL,
              image_url VARCHAR(255) NOT NULL
            );
          `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
              INSERT INTO customers (id, name, email, image_url)
              VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
              ON CONFLICT (id) DO NOTHING;
            `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedQuestionsAndOptions(client) {
  try {
    // "uuid-ossp" 확장 기능을 활성화합니다.
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // // "Questions" 테이블 생성
    // const createQuestionsTable = await client.sql`
    //   CREATE TABLE IF NOT EXISTS Questions (
    //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    //     title VARCHAR(255) NOT NULL,
    //     category VARCHAR(100) NOT NULL,
    //     createdAt BIGINT NOT NULL,
    //     icon VARCHAR(255) NOT NULL,
    //     answerId UUID
    //   );
    // `;
    // console.log(`Created "Questions" table`);

    // // "QuestionOptions" 테이블 생성
    // const createQuestionOptionsTable = await client.sql`
    //   CREATE TABLE IF NOT EXISTS QuestionOptions (
    //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    //     questionId UUID NOT NULL REFERENCES Questions(id),
    //     text VARCHAR(255) NOT NULL
    //   );
    // `;
    // console.log(`Created "QuestionOptions" table`);

    // "Questions" 테이블에 씨드 데이터 삽입
    const insertedQuestions = await Promise.all(
      questions.map(
        (question) =>
          client.sql`
          INSERT INTO Questions (id, title, category, createdAt, icon, answerId)
          VALUES (${question.id}, ${question.title}, ${question.category}, ${question.createdAt}, ${question.icon}, ${question.answerId})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );
    console.log(`Seeded ${insertedQuestions.length} questions`);

    // "QuestionOptions" 테이블에 씨드 데이터 삽입
    const insertedOptions = await Promise.all(
      questionOptions.map(
        (option) =>
          client.sql`
          INSERT INTO QuestionOptions (id, questionId, text)
          VALUES (${option.id}, ${option.questionId}, ${option.text})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );
    console.log(`Seeded ${insertedOptions.length} question options`);

    return {
      // createQuestionsTable,
      // createQuestionOptionsTable,
      questions: insertedQuestions,
      questionOptions: insertedOptions,
    };
  } catch (error) {
    console.error('Error seeding questions and options:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedQuestionsAndOptions(client);

  // 다른 씨드 함수들...

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

// async function main() {
//   const client = await db.connect();

//   await seedUsers(client);
//   await seedCustomers(client);
//   await seedInvoices(client);
//   await seedRevenue(client);

//   await client.end();
// }
