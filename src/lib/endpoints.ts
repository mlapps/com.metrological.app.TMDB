import { CastData } from "./models/CastModel";
import { ContainerData } from "./models/ContainerModel";
import { DetailsData } from "./models/DetailsModel";
import { PersonData } from "./models/PersonModel";
import { GenresResponse } from "./types";

const apiKey = '66683917a94e703e14ca150023f4ea7c';
const base = 'https://api.themoviedb.org/3';

export const getPopularUrls = async (type: string) =>{
    return Promise.all([
        `genre/${type}/list`,
        `discover/${type}`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}&with_companies=7|33&vote_average.gte=7`).then(r => r.json())
    })) as unknown as [GenresResponse, ContainerData];
}

export const getDetailUrl = async (type: string, id: string): Promise<DetailsData> => {
    return fetch(`${base}/${type}/${id}?api_key=${apiKey}`).then(r => r.json());
};

export const getCreditsUrl = async (type: string, id: string): Promise<CastData> => {
    return fetch(`${base}/${type}/${id}/credits?api_key=${apiKey}`).then(r => r.json());
};

export const getSimilarUrls = async (type: string, id: string)=> {
    return Promise.all([
        `genre/${type}/list`,
        `${type}/${id}/similar`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}`).then(r => r.json())
    })) as unknown as [GenresResponse, ContainerData];
};

export const getPeopleUrl = async (id: string): Promise<PersonData> => {
    return fetch(`${base}/person/${id}?api_key=${apiKey}`).then(r => r.json());
};

export const getCreditsUrls = async (type: string, peopleId: string) => {
    return Promise.all([
        `genre/${type}/list`,
        `person/${peopleId}/${type}_credits`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}`).then(r => r.json())
    })) as unknown as [GenresResponse, CastData];
};
