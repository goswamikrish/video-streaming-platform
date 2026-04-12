import axios from "axios";

const BASE_URL='https://youtube-v31.p.rapidapi.com';
const options = {
  
  params: {
  
    maxResults: '50'
  },
  headers: {
    'x-rapidapi-key': '70d5924dc9msh2ed264d34fc1f67p192788jsn3356317d075b',
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
  }
};
export const  fetchAPI = async (url)=>{
  const {data}=  await axios.get(`${BASE_URL}/${url}`,options)
  return data;
}