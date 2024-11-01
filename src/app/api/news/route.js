import axios from "axios";

export async function GET(req) {
  const NEWS_API_URL = "https://newsapi.org/v2/everything";
  const API_KEY = process.env.NEWSAPI;

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth()).padStart(2, "0");
  const yyyy = today.getFullYear();
  const date = `${yyyy}-${mm}-${dd}`;

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: "law",
        from: date,
        sortBy: "publishedAt",
        apiKey: API_KEY,
      },
    });
    return new Response(JSON.stringify(response.data.articles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data from NewsAPI:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
