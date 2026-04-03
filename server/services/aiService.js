const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Helper to call OpenAI with JSON output enabled
 */
const callOpenAI = async (systemPrompt, userPrompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Adjust model as needed, perhaps gpt-3.5-turbo if cost is a concern
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });
    
    // Parse the JSON string from OpenAI
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to generate AI response");
  }
};

/**
 * 1. CONTENT GENERATION PROMPT
 */
exports.generateContent = async (topic, platform, audience) => {
  const systemPrompt = `You are an elite digital marketing expert and viral content strategist.
Your task is to create high-performing, viral content for a specific platform.
You must return the response IN VALID JSON FORMAT ONLY with the following structure:
{
  "hooks": ["hook 1", "hook 2", "hook 3"],
  "content": "Full content body here...",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "viralScore": 95,
  "suggestions": "Brief suggestions to maximize engagement",
  "bestTimeToPost": "e.g., Tuesday at 9 AM EST"
}
Adopt a platform-specific tone, optimize for high engagement, and sound human.`;

  const userPrompt = `Generate a viral post. Topic: ${topic}. Platform: ${platform}. Target Audience: ${audience}.`;
  
  return await callOpenAI(systemPrompt, userPrompt);
};

/**
 * 2. MARKETING ASSISTANT PROMPT
 */
exports.answerQuestion = async (question) => {
  const systemPrompt = `You are a world-class Marketing Strategist and consultant.
You must return your response IN VALID JSON FORMAT ONLY with the following structure:
{
  "explanation": "Clear, concise explanation",
  "actionableSteps": ["step 1", "step 2", "step 3"],
  "proTips": ["tip 1", "tip 2"],
  "mistakesToAvoid": ["mistake 1", "mistake 2"]
}`;

  const userPrompt = `A user has asked this marketing question: "${question}". Please provide a helpful answer formatted as JSON.`;

  return await callOpenAI(systemPrompt, userPrompt);
};

/**
 * 3. IDEA GENERATOR PROMPT
 */
exports.generateIdeas = async (topic) => {
  const systemPrompt = `You are a highly creative Content Ideation AI.
You must return your response IN VALID JSON FORMAT ONLY with the following structure:
{
  "ideas": [
    { "title": "Idea 1", "description": "Short description", "format": "e.g. Video, Carousel" },
    { "title": "Idea 2", "description": "...", "format": "..." },
    { "title": "Idea 3", "description": "...", "format": "..." },
    { "title": "Idea 4", "description": "...", "format": "..." },
    { "title": "Idea 5", "description": "...", "format": "..." }
  ]
}
Ideas must be innovative, creative, and niche-specific.`;

  const userPrompt = `Generate 5 viral content ideas for the topic/niche: ${topic}.`;

  return await callOpenAI(systemPrompt, userPrompt);
};

/**
 * 4. CONTENT IMPROVER PROMPT
 */
exports.improveContent = async (content) => {
  const systemPrompt = `You are an expert copywriter and editor known for turning mediocre text into highly engaging, viral content.
You must return your response IN VALID JSON FORMAT ONLY with the following structure:
{
  "improvedContent": "The rewritten, vastly improved content...",
  "addedHook": "The new compelling hook added",
  "enhancementsMade": ["clarity improved", "emotional trigger added", "etc"],
  "viralScoreIncrease": "e.g., +25%"
}
Add a hook, improve clarity and engagement, and make it more viral.`;

  const userPrompt = `Here is the draft content to improve: \n"${content}"\n\nRewrite it to be highly engaging.`;

  return await callOpenAI(systemPrompt, userPrompt);
};
