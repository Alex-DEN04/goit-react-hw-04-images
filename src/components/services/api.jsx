import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
export const getImages = async (imageName, page) => {
  const response = axios.get(BASE_URL, {
    params: {
      responseType: 'stream',
      key: '27604632-8d8d559eecaed720301290fe4',
      q: imageName,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page,
    },
  });
  return (await response).data.hits;
};
