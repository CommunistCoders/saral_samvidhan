import dbConnect from "@/lib/dbConnect"; // Connect to your database
import dfPost from "@/app/models/dfPost"; // The post model to save the sentiment metrics
const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
const SAMPLE_INPUT = 'Here is the sample input:';
const SAMPLE_OUTPUT = 'Here is the sample output:';
const PROMPT = `
  You are a helpful AI assistant.YOur main task is to identify messages which violate policy guidelines.

  Policy guidelines :
  Hate Speech: Any content promoting violence or discrimination against individuals or groups based on race, ethnicity, nationality, religion, gender, sexual orientation, disability, or other protected characteristics.
  Harassment and Bullying: Messages aimed at intimidating, threatening, or humiliating individuals. This includes targeted attacks and repeated unwanted contact.
  Sexual Content: Prohibition of explicit or pornographic content, unsolicited sexual advances, and sexually suggestive messages.
  Spam and Scams: Preventing the distribution of spam, phishing attempts, or fraudulent schemes.


  ${SAMPLE_INPUT}
  Who are you?
  ${SAMPLE_OUTPUT}
  Hate Speech: Negative
  Harassment and Bullying: Negative
  Sexual Content: Negative
  Spam and Scams: Negative

  ${SAMPLE_INPUT}
  Who is the prime minister of India?
  ${SAMPLE_OUTPUT}
  Hate Speech: Negative
  Harassment and Bullying: Negative
  Sexual Content: Negative
  Spam and Scams: Negative

  ${SAMPLE_INPUT}
  Check out this great deal on [suspicious website]!
  ${SAMPLE_OUTPUT}
  Hate Speech: Negative
  Harassment and Bullying: Negative
  Sexual Content: Negative
  Spam and Scams: Positive

  ${SAMPLE_INPUT}
  You’re so dumb; nobody likes you.
  ${SAMPLE_OUTPUT}
  Hate Speech: Negative
  Harassment and Bullying: Positive
  Sexual Content: Negative
  Spam and Scams: Negative

  ${SAMPLE_INPUT}
  Can I get your phone number?
  ${SAMPLE_OUTPUT}
  Hate Speech: Negative
  Harassment and Bullying: Negative
  Sexual Content: Negative
  Spam and Scams: Positive

  ${SAMPLE_INPUT}
  You’re such a loser!
  ${SAMPLE_OUTPUT}
  Hate Speech: Negative
  Harassment and Bullying: Positive
  Sexual Content: Negative
  Spam and Scams: Negative

  ${SAMPLE_INPUT}
  I hate people from [specific nationality].
  ${SAMPLE_OUTPUT}
  Hate Speech: Positive
  Harassment and Bullying: Negative
  Sexual Content: Negative
  Spam and Scams: Negative

  ${SAMPLE_INPUT}
  you have got big things.
  ${SAMPLE_OUTPUT}
  Hate Speech: Negative
  Harassment and Bullying: Negative
  Sexual Content: Positive
  Spam and Scams: Negative

 `;


const gemini_api_key = 'AIzaSyAAZts2s1PRyS0wVl6HosLy1Nm46j2PbXM';
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.3,
  topP: 1,
  topK: 2,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: "models/gemini-1.0-pro-latest",
  geminiConfig,
});
 
function escapeCharacters(input) {
  return input
      .replace(/'/g, "\'")   // Escape single quotes
      .replace(/"/g, '\"')   // Escape double quotes
      .replace(/~/g, "\~")  // Escape tildes
      .replace(/`/g, "\`");
}

const parseResponse = (response) => {
  const lines = response.split("\n"); // Split the string by new lines
  const result = {};

  lines.forEach((line) => {
    const [key, value] = line.split(":").map(item => item.trim()); // Split by colon and trim spaces
    result[key] = value;
  });

  return result;
};

const generate = async (input) => {
  try {
    const FINAL_PROMPT = `${PROMPT}
    ${SAMPLE_INPUT}
    ${escapeCharacters(input)}
    ${SAMPLE_OUTPUT}
    `;
    const result = await geminiModel.generateContent(FINAL_PROMPT);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.log("response error", error);
  }
};
 
export async function POST(req) {
  const { content, postId } = await req.json(); // Get the content and postId from the request

  try {
    // Simulate sentiment analysis results for the post
    // const sentimentMetrics = {
    //   "Hate Speech": "positive",  // Example metric
    //   "Harassment and Bullying": "positive",
    //   "Sexual Content": "positive",
    //   "Spam and Scams": "positive",
    // };

    const b = await generate(content);
    const sentimentMetrics = parseResponse(b);
    // console.log(parseResponse(b));
    
    // Step 1: Connect to the database
    await dbConnect();

    // Step 2: Find the post by ID
    const post = await dfPost.findById(postId);
    if (!post) {
      return new Response(JSON.stringify({ message: "Post not found" }), { status: 404 });
    }

    // Step 3: Update the sentiment metrics for the post
    post.sentimentMetrics = sentimentMetrics;
    await post.save(); // Save the updated post document

    return new Response(
      JSON.stringify({ message: "Sentiment analysis completed and saved", sentimentMetrics }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sentiment analysis:", error);
    return new Response(JSON.stringify({ message: "Error during sentiment analysis" }), { status: 500 });
  }
}
