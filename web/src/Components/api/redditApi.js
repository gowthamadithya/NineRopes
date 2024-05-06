import React from 'react';
import axios from 'axios';


// // Function to fetch access token
// export const fetchAccessToken = async () => {
//     const clientId = 'zu3jMHcZUNkgqH01kDJxXg';
//     const clientSecret = 'VUDPuAxmm8OdwFn4sFpau-cB44oFMQ';
//     const postData = {
//         grant_type: 'client_credentials',
//     };
//     try {
//         const response = await axios.post(
//             'https://www.reddit.com/api/v1/access_token',
//             null,
//             {
//                 params: postData,
//                 auth: {
//                     username: clientId,
//                     password: clientSecret,
//                 },
//             }
//         );
//         return response.data.access_token; // Return access token
//     } catch (error) {
//         console.error('Error:', error);
//         throw new Error('Failed to fetch access token');
//     }
// };

export const fetchAccessToken = async () => {
    try {
      const clientAuth = {
        username: 'zu3jMHcZUNkgqH01kDJxXg',
        password: 'VUDPuAxmm8OdwFn4sFpau-cB44oFMQ',
      };
      const postData = {
        grant_type: 'password',
        username: 'ho_eslayer',
        password: 'adithya123',
      };
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'User-Agent': 'ChangeMeClient/0.1 by YourUsername',
      };
      const response = await axios.post(
        'https://www.reddit.com/api/v1/access_token',
        postData,
        {
          auth: clientAuth,
          headers: headers,
        }
      );
      console.log(response.data.access_token);
      localStorage.setItem('accessToken', response.data.access_token);
      return response.data.access_token
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

export default RedditApi;



const API_BASE_URL = 'https://oauth.reddit.com'
export const accessToken = localStorage.getItem("accessToken")
async function RedditApi(url, method, payload = null) {
  try {
    // Dispatch loading action if needed
    // store.dispatch(setLoading(true));

    // const authToken = localStorage.getItem('authToken');
    const headers = {
      // 'Content-Type': 'application/json',
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

