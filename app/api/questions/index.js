import axios from 'axios';
export async function fetchUserLikeSkills(fb_uid) {
  try {
    const response = await axios.post('/api/users/get-user', {
      fb_uid,
    });
    return response.data.result.rows;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network error');
  }
}
