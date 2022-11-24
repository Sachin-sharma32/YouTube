import axios from "axios";

const BASE_URL='https://youtube-v31.p.rapidapi.com'
const options = {
  params: {
    type: 'video',
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': 'a040492af0msh5fe87eec17d6c32p139d9djsn2d1f2af2d6cb',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

const fetchData = async(url) =>{
  const {data} = await axios.get(`${BASE_URL}/${url}`, options);
  return data
}

export default fetchData;