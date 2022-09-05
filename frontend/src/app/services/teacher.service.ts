import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  signup(data: any){
    console.log(this.url);
    console.log(this.url+
      "/teacher/signup");
    console.log(data);
    return this.httpClient.post(this.url+
      "/teacher/signup", data, {
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }
}
