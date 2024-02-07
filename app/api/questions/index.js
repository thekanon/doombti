import axios from 'axios';

export async function fetchUserLikeSkills(fb_uid) {
  try {
    const response = await axios.post('/api/questions/get-user-like-skills', {
      fb_uid,
    });
    return response.data.result.rows;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network error');
  }
}

export async function fetchPositionSkills(position) {
  try {
    const response = await axios.post('/api/questions/get-position-skills', {
      position,
    });
    return response.data.result.rows;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network error');
  }
}
