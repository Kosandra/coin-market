import {COINS_API} from "./links";


export const getAllCoins = async () => {
    return await fetch(`${COINS_API}`)
        .then(response => response?.json());
};


export const getPaginationCoins = async (limit?:number, offset?:number) => {
    return await fetch(`${COINS_API}?limit=${limit || ''}&offset=${offset || ''}`)
        .then(response => response?.json());
};

export const getHistory = async (id: string, interval: string) => {
    return await fetch(`${COINS_API}/${id}/history?interval=${interval}`)
        .then(response => response?.json());
};

export const getCoinById = async (id: string)=>{
    return await fetch(`${COINS_API}/${id}`)
        .then(response => response?.json());
}
