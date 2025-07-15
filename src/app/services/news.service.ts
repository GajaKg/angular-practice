import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  GetAll(): any {
    return this._http.get("https://hacker-news.firebaseio.com/v0/topstories.json");
  }

  GetDetailByID(id: number) {
    return this._http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
  }
}
