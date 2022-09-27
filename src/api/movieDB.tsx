import axios from "axios";
//EQUEST https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
const movieDB = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie",
    params: {
        api_key: "5c24d7a8f4e87f85e4a925781f3acb3c",
        language: "es-ES",
    },
});

export default movieDB;
