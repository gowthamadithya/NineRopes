import axios from 'axios';

const API_BASE_URL = 'https://oauth.reddit.com' //'http://localhost:4000';
async function handleRequest(url, method, payload = null) {
  try {
    // Dispatch loading action if needed
    // store.dispatch(setLoading(true));

    // const authToken = localStorage.getItem('authToken');
    const headers = {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    let response;

    switch (method) {
      case 'GET':
        response = await axios.get(`${API_BASE_URL}${url}`, { headers });
        break;
      case 'POST':
        response = await axios.post(`${API_BASE_URL}${url}`, payload, { headers });
        break;
      case 'PUT':
      case 'PATCH':
        response = await axios.put(`${API_BASE_URL}${url}`, payload, { headers });
        break;
      case 'DELETE':
        response = await axios.delete(`${API_BASE_URL}${url}`, { headers });
        break;
      default:
        throw new Error(`Invalid method: ${method}`);
    }
    
    if (response.status === 401) {
        localStorage.clear();
        // Redirect to login page if authentication fails
        // window.location.href = '/login';
    }
    if (!response) {
      console.error('API request failed', response);
      throw new Error(response.statusText);
    }
    return response.data;
    
  } catch (error) {
    console.error('Error during API request', error);
    throw error;
  } 
//   finally {
//     Dispatch loading action if needed
//     store.dispatch(setLoading(false));
//   }
}

export default handleRequest;
