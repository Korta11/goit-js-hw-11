import axios from 'axios';

async function fetchImages(query, currentPage, resultPerPage) {
  const configUrl = {
    params: {
      key: '37781116-9e1c4f75106a9de0660afdf06',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: currentPage,
      per_page: resultPerPage,
    },
  };
  const data = await axios('https://pixabay.com/api/', configUrl);
  return data;
}

export { fetchImages };
