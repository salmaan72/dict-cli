import axios from 'axios';

async function axiosRequest({method = 'get', endPoint, word}) {
    let response
    if(method.toLowerCase() === 'get') {
        try {
            if(endPoint === 'randomWord') {
                response = await axios.get(`${process.env.HOST}/words/${endPoint}?api_key=${process.env.API_KEY}`);    
            }
            else {
                response = await axios.get(`${process.env.HOST}/word/${word}/${endPoint}?api_key=${process.env.API_KEY}`);
            }
        } catch(err) {
            console.log(`\nWord not found.\n\n`);
            process.exit(1);
        }
        
    }

    return response && response.data;
}

export {axiosRequest};