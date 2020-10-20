import { TOPICS, SUGAR } from './constants';
import { requestTopic } from './api';

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
        sessionStorage.setItem(`${SUGAR}${requests.topics[i]}`,JSON.stringify(response[i]));
        data[requests.topics[i]] = response[i];
      }
    })
  );

  return data;

}