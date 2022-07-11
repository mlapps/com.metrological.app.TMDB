import { DetailsData } from "./models/Details";
import { PeopleData } from "./models/People";
import { CreditsResponse, DetailResponse, DiscoverResponse, GenresResponse, PeopleResponse, SimilarResponse } from "./types";

const apiKey = '66683917a94e703e14ca150023f4ea7c';
const base = 'https://api.themoviedb.org/3';

export const getPopularUrls = async (type: string) =>{
    return [
        `genre/${type}/list`,
        `discover/${type}`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}&with_companies=7|33&vote_average.gte=7`).then(r => r.json())
    }) as unknown as [GenresResponse, DiscoverResponse];
}

export const getDetailUrl = async (type: string, id: string): Promise<DetailsData> => {
    return fetch(`${base}/${type}/${id}?api_key=${apiKey}`).then(r => r.json());
};

export const getCreditsUrl = async (type: string, id: string): Promise<CreditsResponse> => {
    return fetch(`${base}/${type}/${id}/credits?api_key=${apiKey}`).then(r => r.json());
};

export const getSimilarUrls = async (type: string, id: string)=> {
    return [
        `genre/${type}/list`,
        `${type}/${id}/similar`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}`).then(r => r.json())
    }) as unknown as [GenresResponse, SimilarResponse];
};

export const getPeopleUrl = async (id: string): Promise<PeopleData> => {
    return fetch(`${base}/person/${id}?api_key=${apiKey}`).then(r => r.json());
};

export const getCreditsUrls = async (type: string, id: string) => {
    return Promise.all([
        `genre/${type}/list`,
        `person/${id}/${type}_credits`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}`).then(r => r.json())
    })) as unknown as [GenresResponse, CreditsResponse];
};