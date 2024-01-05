import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';

import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

// export async function getUser(email: string) {
//   try {
//     const user = await sql`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0] as User;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

export async function getQuestionsWithOptions() {
  noStore();

  try {
    const result = await sql`
      SELECT 
          q.id AS question_id,
          q.title,
          q.category,
          q.createdat,
          q.icon,
          q.answerid,
          json_agg(json_build_object('id', o.id, 'text', o.text)) AS options
      FROM 
          questions q
      JOIN 
          questionoptions o ON q.id = o.questionid
      GROUP BY 
          q.id, q.title, q.category, q.createdat, q.icon, q.answerid
      ORDER BY 
          RANDOM()
      LIMIT 5;
    `;

    return result.rows;
  } catch (error) {
    console.error('Failed to fetch questions with options:', error);
    throw new Error('Failed to fetch questions with options.');
  }
}

export async function getCategoryList() {
  noStore();

  try {
    const result = await sql`
      select distinct Category 
      from Questions
      order by Category;
    `;

    return result.rows;
  } catch (error) {
    console.error('Failed to fetch category list:', error);
    throw new Error('Failed to fetch category list.');
  }
}

export async function getUser(id: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE uid=${id}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchAfterRegisterQuestions() {
  try {
    const result = await sql`
      SELECT 
          s.id AS survey_id,
          s.title,
          s.category,
          s.createdat,
          s.icon,
          cq.display_order,
          multiflag,
          json_agg(
            json_build_object(
              'id', so.id, 
              'category', so.survey_category, 
              'text', so.survey_text
            )
          ) 
          AS options
      FROM 
          surveys s
      JOIN 
          survey_options so ON s.id = so.survey_id
      JOIN
          conditional_questions cq ON s.id = cq.surveyid
      WHERE
          cq.condition_type = 'AfterRegistration'
      GROUP BY 
          s.id, s.title, s.category, s.createdat, s.icon, cq.display_order
      ORDER BY 
          cq.display_order;
    `;

    return result.rows;
  } catch (error) {
    console.error('Failed to fetch questions with options:', error);
    throw new Error('Failed to fetch questions with options.');
  }
}

export async function getUserInfo(id: string) {
  try {
    const result = await sql`
      select
        u.uid,
        u.fb_uid,
        u.name,
        u.email,
        job_option.survey_text AS job_description,
        u.continuous_goal_achievement,
        u.set_goal,
        tech_option.survey_text AS liked_technology,
        u.careeryearnumber,
        u.mbti
      from 
        users u
      LEFT JOIN survey_options job_option ON u.job_id = job_option.id
      LEFT JOIN survey_options tech_option ON u.likedtechoption = tech_option.id
      where fb_uid = ${id};
    `;
    return result.rows;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw new Error('Failed to fetch user info.');
  }
}

// export async function upsertUserSurveyResponses(userId, answerList) {
//   try {
//     // 현재 시간을 epoch 시간으로 변환
//     const createdAt = Date.now();

//     // 각 답변에 대한 삽입 또는 업데이트 쿼리를 실행
//     await Promise.all(
//       answerList.map(async (answer) => {
//         await sql`
//         INSERT INTO user_survey_responses (
//           surveyId,
//           userId,
//           createdAt,
//           answer
//         ) VALUES (
//           ${answer.id},
//           ${userId},
//           ${createdAt},
//           ${answer.text}
//         )
//         ON CONFLICT (surveyId, userId) DO UPDATE SET
//           createdAt = ${createdAt},
//           answer = ${answer.text};
//       `;
//       }),
//     );

//     console.log('Responses successfully upserted');
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to upsert survey responses.');
//   }
// }

// export async function insertUser(user: User) {
//   try {
//     const result = await sql`
//       INSERT INTO users (uid, email, name, image_url)
//       VALUES (${user.uid}, ${user.email}, ${user.name}, ${user.image_url})
//       RETURNING *;
//     `;
//     return result.rows[0] as User;
//   } catch (error) {
//     console.error('Failed to insert user:', error);
//     throw new Error('Failed to insert user.');
//   }
// }
