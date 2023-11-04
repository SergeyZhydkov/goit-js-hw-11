// 40445040-67f89a7fafc58354e1c48a261
import axios from 'axios';
import { page } from './index';
import { refs } from './index';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40445040-67f89a7fafc58354e1c48a261';
async function getCard(searchInput, page) {
  const paramsObj = {
    key: `${API_KEY}`,
    q: searchInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  };
  const params = new URLSearchParams(paramsObj);
  return await axios.get(`${BASE_URL}?${params}`);
}
export { getCard };
