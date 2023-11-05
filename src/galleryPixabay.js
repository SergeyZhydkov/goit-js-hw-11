// 40445040-67f89a7fafc58354e1c48a261
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '40445040-67f89a7fafc58354e1c48a261';
async function getCard(dataInput, page) {
  return await axios.get(
    `${BASE_URL}/?key=${API_KEY}&q=${dataInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
}
export { getCard };
