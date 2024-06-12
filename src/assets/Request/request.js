const key = "625e9887277656254835820dae81ec90";
const searchURL = "https://api.themoviedb.org/3/search/movie";
const movieDetailsURL = 'https://api.themoviedb.org/3/movie/';

export const request = {
    requestPopular:`https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
    requestTopRated:`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
    requestUpComing:`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`
};

export const searchMovies = async (userInput)=>{
    const res = await fetch(`${searchURL}?query=${userInput}&api_key=${key}`);
    const data = await res.json();
    return data.results;
}

export const getMoviesDetails = async (movieID)=>{
    const res = await fetch(`${movieDetailsURL}${movieID}?api_key=${key}`);
    const data = await res.json();
    return data;
}