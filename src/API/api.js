function fetchSearch(search, page) {
  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=23006232-27664577dbbc234e8c464ad7c&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Request ${search} not found`));
  });
}

const api = {
  fetchSearch,
};

export default api;
