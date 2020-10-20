import { TOPICS, SUGAR } from './constants';
import { requestTopic } from './api';

function removeHTTPExternalResources(data){
  const filteredData = {};
  for(const [k,v] of Object.entries(data)){
    data[k] = v.filter( book => (/^(http:)/).test(book.cover));
    sessionStorage.setItem(`${SUGAR}${k}`,JSON.stringify(data[k]));
  }
  return data;
}

export async function getData(){

  // const data = {};

  // for(const topic in TOPICS){
  //     let books = JSON.parse(localStorage.getItem(`${SUGAR}${topic}`));
  //     if(!books) {
  //         books = await requestTopic(TOPICS[topic]);
  //         localStorage.setItem(`${SUGAR}${topic}`,JSON.stringify(books));
  //     }
  //     data[topic] = books;
  // }

  // return data;

  let data = {};
  const requests = {
    topics: [],
    functions:[]
  } 

  for (const topic in TOPICS){
    let books = JSON.parse(sessionStorage.getItem(`${SUGAR}${topic}`));
    if(books) {
      data[topic] = books;
    }
    else{
      requests.topics.push(topic);
      requests.functions.push(requestTopic(TOPICS[topic]));  
    }
  }

  await Promise.all(requests.functions).then( responses => 
    Promise.all(responses).then( response => {
      for(let i in response){
        data[requests.topics[i]] = response[i];
      }
    })
  );

  data = removeHTTPExternalResources(data);

  return data;

}