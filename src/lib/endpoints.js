const apiKey = '66683917a94e703e14ca150023f4ea7c';
const base = 'https://api.themoviedb.org/3';

export const getPopularUrl = async (type)=> {
    return fetch(`${base}/${type}/popular?api_key=${apiKey}`);
};

export const getPopularUrls = async (type)=>{
    return [
        `genre/${type}/list`,
        `${type}/popular`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}`)
    });
}