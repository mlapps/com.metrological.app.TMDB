import fs from 'fs';
import https from 'https';

const basePath = './static/data/';
export const writeToJson = (data = {}, path = '') => {
    fs.writeFileSync(basePath + path, JSON.stringify(data, null, 2));
}

export const downloadImage = (id, type = 'poster') => {
    if (id === null) return;
    id = id.replace('/', '');

    const size = { poster: 'w500', backdrop: 'w1280', profile: 'w300' }[type];
    const baseImageUrl = `https://image.tmdb.org/t/p/${size}/`;

    https.get(baseImageUrl + id, (res) => {
        res.pipe(fs.createWriteStream(`${basePath}${size}-${id}`));
    });
}