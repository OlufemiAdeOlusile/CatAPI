import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const HEADERS = { 'x-api-key': 'DEMO-API-KEY' };

export async function getRequest(path: string) {
    return axios.get(`${BASE_URL}${path}`, { headers: HEADERS });
}

export async function postRequest(path: string, data: any) {
    return axios.post(`${BASE_URL}${path}`, data, { headers: HEADERS });
}

export async function deleteRequest(path: string) {
    return axios.delete(`${BASE_URL}${path}`, { headers: HEADERS });
}