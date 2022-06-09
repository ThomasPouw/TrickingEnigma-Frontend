import {HttpClient} from "@angular/common/http";

export class Token{
  constructor(private http: HttpClient) {}
  API_Token(){
    let Token = ""
    this.http.post('https://dev-yw9oh5an.us.auth0.com/oauth/token',
      {
        grant_type: 'client_credentials',
        client_id: 'GHQa52igJs2ccnZJj3SeDGbrG2gVilPm',
        client_secret: '0e6rjJ6sv8oQZZVSvi4MvW9yPuTmgUGtOkLhO-_BuoWsYPJH3A8kubrJIp5UOywW',
        audience: 'https://dev-yw9oh5an.us.auth0.com/api/v2/'
      },
      {headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Headers': ['access-control-allow-origin'],
          'access-control-allow-origin': "http://localhost:4200/"
        }
      }
    ).subscribe((token: any) => {
      const expiresAt = JSON.stringify((token.expiresIn * 1000) + new Date().getTime());
      sessionStorage.setItem('access_token', token.accessToken);
      sessionStorage.setItem('id_token', token.idToken);
      sessionStorage.setItem('expires_at', expiresAt);
    })
  }
}
