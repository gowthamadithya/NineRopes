
import axios from 'axios';


export const fetchAccessToken = async () => {
  try {
    const clientAuth = {
      username: import.meta.env.VITE_Client_Auth_User_Name,
      password: import.meta.env.VITE_Client_Auth_Password,
    };
    const requestUserDetails = {
      grant_type: 'password',
      username: import.meta.env.VITE_Request_User_Details_User_Name,
      password: import.meta.env.VITE_Request_User_Details_Password,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      requestUserDetails,
      {
        auth: clientAuth,
        headers: headers,
      }
    );
    console.log(response.data.access_token);
    localStorage.clear()
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('accessExpireTime', Math.round(Date.now()) + response.data.expires_in);
    return response.data.access_token
  } catch (error) {
    console.error('Error fetching access token:', error);
  }
  };

export default RedditApi;



const API_BASE_URL = 'https://oauth.reddit.com'
export const accessToken = localStorage.getItem("accessToken")
export const accessExpiretime = localStorage.getItem("accessExpireTime")

async function RedditApi(url, method, payload = null) {
  let config = {}
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    //   "User-Agent": "ChangeMeClient/0.1 by YourUsername"
    //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0'
    //   'User-Agent': null
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
    
    // if (response.status === 401) {
    //     localStorage.clear();
    //     Redirect to login page if authentication fails
    //     window.location.href = '/login';
    // }
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

