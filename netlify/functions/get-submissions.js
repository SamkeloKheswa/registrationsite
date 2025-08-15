exports.handler = async function(event, context) {

  const SITE_ID = "9c904389-224f-4546-b948-594ecd41499d"; // Your Site ID
  const FORM_NAME = "talent-registration";
  const TOKEN = process.env.NETLIFY_API_TOKEN; // Environment variable

  try {
    // Get all forms for the site
    const res = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/forms`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    const forms = await res.json();

    // Find the specific form
    const form = forms.find(f => f.name === FORM_NAME);

    if (!form) {
      return { statusCode: 404, body: JSON.stringify({ error: "Form not found" }) };
    }

    // Get submissions for the form
    const submissionsRes = await fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    const submissions = await submissionsRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify(submissions)
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
