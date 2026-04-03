import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/', // Added trailing slash for safety
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials) => {
  const response = await api.post('auth/login', credentials);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await api.post('auth/signup', userData);
  return response.data;
};

export const generateContent = async (data) => {
  const response = await api.post('generate', data);
  return response.data;
};

export const askQuestion = async (question) => {
  const response = await api.post('ask', { question });
  return response.data;
};

export const generateIdeas = async (topic) => {
  const response = await api.post('ideas', { topic });
  return response.data;
};

export const improveContent = async (content) => {
  const response = await api.post('improve', { content });
  return response.data;
};

export const getTrends = async (niche, platform) => {
  const response = await api.post('trends', { niche, platform });
  return response.data;
};

export default api;
