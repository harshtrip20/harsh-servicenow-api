// Vercel backend function
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const instance = process.env.SN_INSTANCE;
  const user = process.env.SN_USER;
  const pass = process.env.SN_PASS;

  const response = await fetch(`https://${instance}.service-now.com/api/now/table/x_harsh_contact_message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Basic " + Buffer.from(`${user}:${pass}`).toString("base64"),
    },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(500).json({ message: "Failed to create record", error: data });
  }

  res.status(200).json({ message: "Record created in ServiceNow", data });
}
