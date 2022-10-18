import {getCreditsUrl, getCreditsUrls, getDetailUrl, getPeopleUrl, getPopularUrls, getSimilarUrls} from "../src/lib/endpoints";

export const getPopularContent = async (type)=>{
    try {
        const urls = await getPopularUrls(type);
        const response = await Promise.all(urls);
        const [g, data] = await Promise.all(
            response.map((d)=>d.json())
        );
        return data;
    } catch (e){
        console.log(e)
    }
}

export const getDataWithType = async (functionType = 'details', type = 'movie', id)=> {
    const fn = {
        details: getDetailUrl,
        credits: getCreditsUrl
    }
    const url = await fn[functionType](type, id);
    const response = await url.json();
    return response;
}

export const getData = async (functionType = 'people', id)=>{
    const fn = {
        people: getPeopleUrl
    }
    const url = await fn[functionType](id);
    const response = await url.json();
    return response;
}