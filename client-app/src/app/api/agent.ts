import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../..';
import { toast } from 'react-toastify';
axios.defaults.baseURL = 'http://localhost:5000/api';

//It allows you to write or execute a piece of your code before the request gets sent.
//It allows you to write or execute a piece of your code before response reaches the calling end.//

axios.interceptors.response.use(undefined, error => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error = make sure API is runnning ')
  }

  const { status, data, config } = error.response;


  if (error.response.status === 404) {
    history.push('/notfound')

  }
  if (status === 400 && config.method === 'get' && data.error.hasOwnProperty('id')) {
    history.push('/notfound')
  }
  if (status === 500) {
    toast.error('Server error - check the terminal for more info')
  }
})
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