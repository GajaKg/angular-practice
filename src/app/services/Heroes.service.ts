import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroes } from '../models/Hero.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  constructor(private httpClient: HttpClient) { }

  getAllHeroes(): Observable<Heroes[]> {
    return this.httpClient.get<Heroes[]>("https://akabab.github.io/superhero-api/api/all.json");
  }
}
