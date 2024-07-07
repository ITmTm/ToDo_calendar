import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://isdayoff.ru/',
  timeout: 1000
});

instance.interceptors.response.use(
  response => response,
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

export const isDayOff = async (date: Date): Promise<boolean> => {
  const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '');
  try {
    const response = await instance(`${formattedDate}`);
    return response.data === '1';
  } catch (err) {
    console.error(`Error fetching holiday data for ${date}:`, err);
    return false;
  }
};