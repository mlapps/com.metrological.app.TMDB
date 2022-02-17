// import {Container, Details} from "./models";
// import {Item, Carousel} from "../components";
//
// const apiKey = `66683917a94e703e14ca150023f4ea7c`;
// const listComponents = new Map();
// const itemComponents = new Map();
//
// let stage;
// let genres;
//
// listComponents.set("movie", Carousel);
// listComponents.set("tv", Carousel);
//
// itemComponents.set("movie", Item);
// itemComponents.set("tv", Item);
//
// export const init = (stageInstance) =>{
//     stage = stageInstance;
// };
//
// export const getMovies = async()=> {
//     const movies = await _getPopular("movie");
//     const models = [movies];
//     return _lists(models);
// };
//
// export const getTv = async()=> {
//     const tv = await _getPopular("tv");
//     const models = [tv];
//     return _lists(models);
// };
//
// export const getDetails = (type, id)=> {
//     return _get(`/${type}/${id}`).then(response => {
//         return new Details(response);
//     });
// };
//
// const _getGenres = async()=> {
//     const movie = await _get(`/genre/movie/carousel`).then(response => {
//         return response.genres;
//     });
//
//     const tv = await _get(`/genre/tv/carousel`).then(response => {
//         return response.genres;
//     });
//
//     return [...movie, ...tv]
// };
//
// export const setGenres = (data)=> {
//     genres = data;
// };
//
// const _getPopular = async(type)=> {
//     if (!genres) {
//         genres = await _getGenres();
//     }
//
//     // Promise.all([
//     //     fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`),
//     //     fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`),
//     //     fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`),
//     //     fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
//     // ]).then(function (responses) {
//     //     return Promise.all(responses.map(function (response) {
//     //         return response.json();
//     //     }));
//     // }).then(function (data) {
//     //     console.log(data);
//     // }).catch(function (error) {
//     //     console.log(error);
//     // });
//
//     return _get(`/${type}/popular`).then(response => {
//         return new Container(response, type, genres);
//     });
// };
//
// const _getByGenre = async(type, id)=> {
//     return _get(`/discover/movie`, {with_genres: id}).then(response => {
//         return new Container(response, type, genres);
//     });
// }
//
// const _get = (url,params)=> {
//     let params_str = `?api_key=${apiKey}`;
//
//     for (let key in params) {
//         if (params.hasOwnProperty(key)) {
//             params_str += "&" + key + "=" + encodeURIComponent(params[key]);
//         }
//     }
//
//     return fetch(`https://api.themoviedb.org/3${url}${params_str}`, {
//         'Accept': 'application/json'
//     }).then(response => {
//         if (!response.ok) throw "Response not ok";
//         return response.json();
//     }).catch(error => {
//         console.error('Error loading ' + url, error);
//         throw error;
//     })
// };
//
// const _lists = (models = []) => {
//     if(!Array.isArray(models)){
//         models = [models];
//     }
//     return models.map(carousel => {
//         return stage.c({
//             type: listComponents.get(carousel.type),
//             itemConstruct: itemComponents.get(carousel.type),
//             items: carousel.items
//         });
//     });
// };