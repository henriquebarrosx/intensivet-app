import axios from 'axios';

export enum ENVIROMENT {
  STAGING = 'https://staging.intensivet.com.br',
  PRODUCTION = 'https://app.intensivet.com.br',
}

export const API = axios.create({
  baseURL: ENVIROMENT.STAGING,
});
