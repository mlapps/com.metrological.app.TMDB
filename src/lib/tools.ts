export const getImgUrl = (imgPath: string, width = 185)=> {
    return `//image.tmdb.org/t/p/w${width}${imgPath}`
};

/**
 * Predicate for a filter() function to filter out null/undefined values in a typesafe way
 *
 * @param value
 * @returns
 */
export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return !(value === null || value === undefined);
}
