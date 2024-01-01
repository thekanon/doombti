import axios from 'axios';

export async function fetchUserData(fb_uid) {
  try {
    const response = await axios.post('/api/users/get-user', {
      fb_uid,
    });
    return response.data.result.rows;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network error');
  }
}

export async function fetchUserList() {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network error');
  }
}

export async function registerUser(user, answerList) {
  try {
    const response = await axios.post('/api/users/register-user', {
      user,
      answerList,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network error');
  }
}
