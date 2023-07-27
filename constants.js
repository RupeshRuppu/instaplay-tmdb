export const API_KEY = '8737487d5ebf6cc4c3929e608d7f2fd9';

export const REQUEST_TOKEN_URL = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`;

export const LOGIN_URL = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`;

export const DASHBOARD_DATA = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=1`;

/* function that return movie details endpoint taking 'movieId' as a parameter. */
export const getMovieDataUrl = movieId =>
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

export const produceSearchUrl =
  search => `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false
`;

export const produceVideoUrl = key => `https://www.youtube.com/watch?v=${key}`;

export const getVideoDataUrl = id =>
  `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;

export const PORTRAIT = 'PORTRAIT';
export const LANDSCAPE = 'LANDSCAPE';
