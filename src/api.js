
const TAG = "API : ";
const user = {
    name: 'Teo(fake name)',
    email: 'teo@gmail.com',
    password: '',
    token:'',
    token_type:'',
    expires_in:'',
}

function fetchToken(clientID, clientSecret) {
    const params = {
        client_id: clientID, // use your own
        client_secret: clientSecret, // use your own
        grant_type: 'client_credentials'
    }

    const request = new Request('https://api.yelp.com/oauth2/token', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        }),
        body: `client_id=${params.client_id}&client_secret=${params.client_secret}&grant_type=${params.grant_type}`
    });

    return fetch(request)
        .then(response => {
            return response.json()
        })
        .then(json => {

            if("undefined" === typeof json.access_token){
                console.log(TAG+ " Fail " + JSON.stringify(json));
                return null;
            }else{
                console.log(TAG+ " Success " + JSON.stringify(json));
                user.token = json.access_token;
                user.token_type = json.token_type;
                user.expires_in = json.expires_in;
                return user;
            }
        })
}

export default (clientID, clientSecret) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(fetchToken(clientID, clientSecret))
        }, 100)
    })
}


/*
 Example result
 {
 "access_token": "ARolQDdpABpYZYLfO1NkbZ2hDzMwg_5pFz9KUoVITe2oBtXRhxSzMBamA5TTHA5vttN23P1EfONq_Iedo1Yvqm0IjFHOjtMdmDUb6lmQ22qIK_Ll7LajjpBi0OjQWHYx",
 "token_type": "Bearer",
 "expires_in": 15533847
 }
 */
