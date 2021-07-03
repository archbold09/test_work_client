import API from '@/api/config';

const API_URL = process.env.VUE_APP_URL_SERVER_API;

const getMovies = (optionMovie) => {
  return API({
    method: 'GET',
    url: `${API_URL}/movies/${optionMovie}`,
  });
};

const getDetailMovie = (idMovie) => {
  return API({
    method: 'GET',
    url: `${API_URL}/movies/detail/${idMovie}`,
  });
};

export default { getMovies, getDetailMovie };
