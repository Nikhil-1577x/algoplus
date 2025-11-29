/**
 * LeetCode API Service
 * Uses a public proxy API to bypass CORS restrictions
 */

// Using a public LeetCode API proxy that handles CORS
const LEETCODE_PROXY_API = 'https://leetcode-stats-api.herokuapp.com';

/**
 * Fetch user profile and statistics
 * @param {string} username - LeetCode username
 * @returns {Promise<Object>} User data including solved problems and stats
 */
export const fetchUserProfile = async (username) => {
  try {
    const response = await fetch(`${LEETCODE_PROXY_API}/${username}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found. Please check the username.');
      }
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'User not found');
    }

    return parseUserData(data);
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    throw error;
  }
};

/**
 * Parse and format the raw API response
 */
const parseUserData = (data) => {
  // The proxy API returns data in a different format
  return {
    username: data.username || 'Unknown',
    realName: data.name || data.username,
    avatar: data.avatar || '',
    ranking: data.ranking || 0,
    streak: data.streak || 0,
    totalActiveDays: data.totalActiveDays || 0,
    solved: {
      all: data.totalSolved || 0,
      easy: data.easySolved || 0,
      medium: data.mediumSolved || 0,
      hard: data.hardSolved || 0
    },
    recentSubmissions: data.recentSubmissions || []
  };
};

/**
 * Alternative: Fetch using LeetCode's public profile page (fallback)
 * This scrapes the public profile if the proxy fails
 */
export const fetchUserProfileFallback = async (username) => {
  try {
    // Try the official LeetCode GraphQL endpoint with a different approach
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://leetcode.com',
        'Referer': `https://leetcode.com/${username}/`
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });

    const data = await response.json();

    if (data.errors || !data.data.matchedUser) {
      throw new Error('User not found');
    }

    const stats = data.data.matchedUser.submitStats.acSubmissionNum;

    return {
      username: data.data.matchedUser.username,
      realName: username,
      avatar: '',
      ranking: 0,
      streak: 0,
      totalActiveDays: 0,
      solved: {
        all: stats.find(s => s.difficulty === 'All')?.count || 0,
        easy: stats.find(s => s.difficulty === 'Easy')?.count || 0,
        medium: stats.find(s => s.difficulty === 'Medium')?.count || 0,
        hard: stats.find(s => s.difficulty === 'Hard')?.count || 0
      },
      recentSubmissions: []
    };
  } catch (error) {
    console.error('Fallback fetch failed:', error);
    throw error;
  }
};
