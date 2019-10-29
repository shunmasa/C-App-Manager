import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { resolve } from 'path';

axios.defaults.baseURL = 'http://localhost:5000/api';


//for refactor root path
//type AxiosResponse//response.data //type difinition
const responseBody = (response: AxiosResponse) => response.data;

//delay the function 
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() =>
    resolve(response), ms))
//return new Promise <AxiosResponse>(resolve=> timer(()=>{
// callback
//}))
// .then(sleep(time))
const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}
//return type Promise Parameter , will return promise and this parameter type when got props 
const Activities = {
  list: (): Promise<IActivity[]> => requests.get('/activities'),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post('/activities', activity),
  update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`)
}
//create,update path activity as 2 arg
//list display only //details dispalay specific items


export default {
  Activities
}

//path ACtivities as object

//post,put need body and url

//body just {} objects