// netlify/functions/get-talent-submissions.js

export async function handler() {
  const formId = "talent-show"; // Your Netlify form name
  const token = process.env.NETLIFY_AUTH_TOKEN; // Store your personal token in Netlify env vars

  try {
    // Use native fetch (Node 18+)
    const res = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: "Failed to fetch submissions" }) };
    }

    const data = await res.json();

    // Map the form submissions to a simpler format
    const submissions = data.map(sub => ({
      fullname: sub.data.fullname || "",
      email: sub.data.email || "",
      phone: sub.data.phone || "",
      category: sub.data.category || "",
      talentCategory: sub.data.talentCategory || "",
      otherTalent: sub.data.otherTalent || "",
      talent: sub.data.talent || "",
      status: sub.data.status || "Pending"
    }));

    return { statusCode: 200, body: JSON.stringify(submissions) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
