const API_URL = 'http://localhost:5000/api';

/**
 * Sync user stats with our backend
 */
export const syncUserToBackend = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/sync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userData.username,
                leetcodeUsername: userData.username,
                stats: userData.solved
            }),
        });
        return await response.json();
    } catch (error) {
        console.error('Backend Sync Error:', error);
        // Don't block the UI if backend fails
        return null;
    }
};

/**
 * Submit a Ghost Mode run
 */
export const submitBattleRun = async (runData) => {
    try {
        const response = await fetch(`${API_URL}/battle/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(runData),
        });
        return await response.json();
    } catch (error) {
        console.error('Submit Run Error:', error);
        throw error;
    }
};

/**
 * Get Leaderboard for a problem
 */
export const getLeaderboard = async (slug) => {
    try {
        const response = await fetch(`${API_URL}/battle/leaderboard/${slug}`);
        return await response.json();
    } catch (error) {
        console.error('Leaderboard Error:', error);
        return [];
    }
};
