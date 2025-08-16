// functions/get-talent-submissions.js
import fetch from "node-fetch";

export async function handler() {
  const formId = "talent-show"; // updated form ID
  const token = "nfp_uM5awoizEeFMXoR3kd1ReTrdS3Zgt5XZ7527"; // Personal token

  try {
    const res = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: "Failed to fetch submissions" }) };
    }

    const data = await res.json();

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
