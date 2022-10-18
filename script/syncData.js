import fetch from 'node-fetch';
import { getPeopleUrl } from '../src/lib/endpoints';
global.fetch = fetch;

import { getPopularContent, getData, getDataWithType } from './api';
import { writeToJson, downloadImage } from './write';

import * as fsExtra from "fs-extra";
fsExtra.emptyDirSync('./static/data');

const sync = async (type = 'movies')=>{
    const list = await getPopularContent(type);

    //write to json
    writeToJson(list, `${type}.json`);

    list.results.forEach(async (item)=>{
        console.log('Proccessing: ', item.title || item.name);
        const id = item.id;

        //get poster
        downloadImage(item.poster_path, 'poster');

        const data = await getDataWithType('details', type, id);
        writeToJson(data, `${type}-${id}.json`);

        //get backdrop
        downloadImage(data.backdrop_path, 'backdrop');

        //get cast
        const credits = await getDataWithType('credits', type, id);
        writeToJson(credits, `${type}-${id}-credits.json`);

        //get cast data
        credits.cast.forEach(async (people)=>{
            const data = await getData('people', people.id);
            writeToJson(data, `people-${id}.json`);

            //get profile picture
            downloadImage(data.profile_path, 'profile');
        })

    })
}

sync('movie');
sync('tv');

//write an empty json for utility *shrug*
writeToJson({}, 'empty.json');
