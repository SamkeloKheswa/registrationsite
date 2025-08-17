import fetch from 'node-fetch';

export async function handler() {
  const PROJECT_ID = '9c904389-224f-4546-b948-594ecd41499d';
  const PERSONAL_TOKEN = 'nfp_uM5awoizEeFMXoR3kd1ReTrdS3Zgt5XZ7527';
  const FORM_NAME = 'talent-show';

  try {
    const res = await fetch(`https://api.netlify.com/api/v1/forms/${FORM_NAME}/submissions`, {
      headers: {
        Authorization: `Bearer ${PERSONAL_TOKEN}`
      }
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: 'Failed to fetch submissions' })
      };
    }

    const data = await res.json();

    // Map submissions to only required fields
    const submissions = data.map(s => ({
      fullname: s.data.fullname || '',
      email: s.data.email || '',
      phone: s.data.phone || '',
      category: s.data.category || '',
      talentCategory: s.data.talentCategory || '',
      otherTalent: s.data.otherTalent || '',
      talent: s.data.talent || '',
      status: s.data.status || 'Pending'
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(submissions)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
