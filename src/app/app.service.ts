import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'https://api.myjson.com/bins/1fq8pm';

  constructor(private httpClient: HttpClient) {}

  getData(){
     return this.httpClient.get(this.apiURL)
  }
}