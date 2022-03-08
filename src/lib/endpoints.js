const apiKey = '66683917a94e703e14ca150023f4ea7c';
const base = 'https://api.themoviedb.org/3';

export const getPopularUrls = async (type)=>{
    return [
        `genre/${type}/list`,
        `discover/${type}`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}&with_companies=7|33&vote_average.gte=7`)
    });
}

export const getDetailUrl = async (type, id)=> {
    return fetch(`${base}/${type}/${id}?api_key=${apiKey}`);
};

export const getCreditsUrl = async (type, id)=> {
    return fetch(`${base}/${type}/${id}/credits?api_key=${apiKey}`);
};

export const getSimilarUrls = async (type,id)=> {
    return [
        `genre/${type}/list`,
        `${type}/${id}/similar`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}`)
    });
};

export const getPeopleUrl = async (id)=> {
    return fetch(`${base}/person/${id}?api_key=${apiKey}`);
};

export const getCreditsUrls = async (type,id)=> {
    return [
        `genre/${type}/list`,
        `person/${id}/${type}_credits`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}`)
    });
};