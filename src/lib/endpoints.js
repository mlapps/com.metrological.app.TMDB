const apiKey = '66683917a94e703e14ca150023f4ea7c';
const base = 'https://api.themoviedb.org/3';

export const getPopularUrls = async (type)=>{
    return [
        `genre/${type}/list`,
        `${type}/popular`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}`)
    });
}

export const getDetailUrl = async (type, id)=> {
    return fetch(`${base}/${type}/${id}?api_key=${apiKey}`);
};