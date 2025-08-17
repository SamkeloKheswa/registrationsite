// netlify/functions/get-submissions.js
import fetch from 'node-fetch';

export async function handler() {
  try {
    const siteId = '9c904389-224f-4546-b948-594ecd41499d'; // Your Netlify Site ID
    const formId = 'talent-show'; // Your form name in Netlify
    const token = process.env.NETLIFY_API_TOKEN; // Pull token from environment variables

    if (!token) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API token not found in environment variables' }),
      };
    }

    const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms/${formId}/submissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch submissions' }),
      };
    }

    const submissions = await response.json();

    // Map to your dashboard fields if needed
    const data = submissions.map((s) => ({
      fullname: s.data.fullname || '',
      email: s.data.email || '',
      phone: s.data.phone || '',
      category: s.data.category || '',
      talentCategory: s.data.talentCategory || '',
      otherTalent: s.data.otherTalent || '',
      talent: s.data.talent || '',
      status: s.data.status || 'Pending',
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
