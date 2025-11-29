/**
 * OpenAI Service for AI-Powered Recommendations
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

/**
 * Generate AI-powered problem recommendations based on user stats
 * @param {Object} userData - User's LeetCode statistics
 * @returns {Promise<Object>} Recommendation with problem details
 */
export const getAIRecommendation = async (userData) => {
    if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
    }

    const prompt = `You are a LeetCode mentor. Based on this user's stats, recommend ONE specific LeetCode problem they should solve next.

User Stats:
- Total Solved: ${userData.solved.all}
- Easy: ${userData.solved.easy}
- Medium: ${userData.solved.medium}
- Hard: ${userData.solved.hard}
- Recent Problems: ${userData.recentSubmissions.slice(0, 5).map(s => s.title).join(', ')}

Provide your response in this exact JSON format (no markdown, just raw JSON):
{
  "title": "Problem Title",
  "difficulty": "Easy/Medium/Hard",
  "topic": "Main DSA topic (e.g., Array, Tree, DP, Graph)",
  "reason": "One sentence explaining why this problem is good for them right now"
}`;

    try {
        const response = await fetch(OPENAI_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful LeetCode mentor who recommends problems based on user progress. Always respond with valid JSON only.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 200
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content.trim();

        // Parse the JSON response
        const recommendation = JSON.parse(content);

        return recommendation;
    } catch (error) {
        console.error('Error getting AI recommendation:', error);

        // Fallback recommendation if API fails
        return {
            title: "Two Sum",
            difficulty: "Easy",
            topic: "Array",
            reason: "A classic problem to strengthen your foundation in hash maps and arrays."
        };
    }
};

/**
 * Get personalized insights about user's progress
 */
export const getProgressInsights = async (userData) => {
    if (!OPENAI_API_KEY) {
        return "Keep solving problems consistently to improve your skills!";
    }

    const prompt = `Based on these LeetCode stats, give ONE motivational insight (max 20 words):
- Total: ${userData.solved.all}
- Easy: ${userData.solved.easy}, Medium: ${userData.solved.medium}, Hard: ${userData.solved.hard}

Just respond with the insight text, no JSON.`;

    try {
        const response = await fetch(OPENAI_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'user', content: prompt }
                ],
                temperature: 0.8,
                max_tokens: 50
            })
        });

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error getting insights:', error);
        return "Keep pushing forward! Every problem solved is progress.";
    }
};
