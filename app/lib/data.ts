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
import {
  getUserLikeSkillsQuery,
  getFilteredSurveyOptionsQuery,
  getAfterRegisterQuestionsQuery,
  getQuestionsWithOptionsQuery,
  getCategoryListQuery,
} from '@/app/lib/queries/question';
import { getUserInfoQuery, getUserQuery } from '@/app/lib/queries/user';

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
  noStore();
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
    const result = await getQuestionsWithOptionsQuery();

    return result.rows;
  } catch (error) {
    console.error('Failed to fetch questions with options:', error);
    throw new Error('Failed to fetch questions with options.');
  }
}

export async function getCategoryList() {
  noStore();

  try {
    const result = await getCategoryListQuery();

    return result.rows;
  } catch (error) {
    console.error('Failed to fetch category list:', error);
    throw new Error('Failed to fetch category list.');
  }
}

export async function getUser(id: string) {
  noStore();
  try {
    const user = await getUserQuery(id);
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchAfterRegisterQuestions() {
  noStore();
  try {
    const result = await getAfterRegisterQuestionsQuery();

    return result.rows;
  } catch (error) {
    console.error('Failed to fetch questions with options:', error);
    throw new Error('Failed to fetch questions with options.');
  }
}

export async function getUserInfo(id: string) {
  noStore();
  try {
    const result = await getUserInfoQuery(id);
    return result.rows;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw new Error('Failed to fetch user info.');
  }
}

export async function getUserLikeSkills(fb_uid: string) {
  noStore();
  try {
    const result = await getUserLikeSkillsQuery(fb_uid);
    return result.rows;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw new Error('Failed to fetch user info.');
  }
}

// getFilteredSurveyOptionsQuery
export async function getFilteredSurveyOptions(category: string) {
  noStore();
  try {
    const result = await getFilteredSurveyOptionsQuery(category);
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
