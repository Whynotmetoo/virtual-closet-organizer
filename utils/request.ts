// utils/axios.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
// Define the shape of your response data type (you can extend this to include more fields)
// interface ApiResponse<T> {
//   data: T;
//   status: number;
//   message?: string;
// }

// Read baseURL from environment variables
const baseURL = process.env.EXPO_PUBLIC_API_UR || 'https://api.example.com';

// Create the Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token'); // Retrieve token from storage or a context
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle success and error responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response; // Return the entire response object
  },
  (error: AxiosError) => {
    if (error.response) {
      // Request was made and server responded with a status code
      console.error('Error response:', error.response);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something went wrong while setting up the request
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

// Generic GET request function
const get = async <T>(url: string, config?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(url, config);
    return response.data; // Return only the data from the response
  } catch (error) {
    throw error;
  }
};

// Generic POST request function
const post = async <T>(url: string, data?: object, config?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic PUT request function
const put = async <T>(url: string, data?: object, config?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic DELETE request function
const del = async <T>(url: string, params?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete(url, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const patch = async <T>(url: string, data?: object, config?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.patch(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Exporting the utility functions
export { get, post, put, del, patch };