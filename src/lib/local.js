const base = 'static/data';

export const getPopularUrls = async (type)=>{
    return [
        `genres.json`,
        `/${type}.json`,
    ].map((url)=>{
        return fetch(`${base}/${url}`)
    });
}

export const getDetailUrl = async (type, id)=> {
    return fetch(`${base}/${type}-${id}.json`);
};

export const getCreditsUrl = async (type, id)=> {
    return fetch(`${base}/${type}-${id}-credits.json`);
};

export const getSimilarUrls = async (type,id)=> {
    //disabling similar urls, so we can keep the scope of the project well known
    //else the TMDB will be an inifite "drilldown"
    //screen will remain empty
    return ['',''];
}

export const getPeopleUrl = async (id)=> {
    return fetch(`${base}/people-${id}.json`);
};

export const getCreditsUrls = async (type,id)=> {
    return [
        'genres.json',
        `person/${id}/${type}_credits`,
    ].map((url)=>{
        return fetch(`${base}/${type}-${id}-credits.json`);
    });
};