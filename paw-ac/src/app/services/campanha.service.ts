import { Campanha } from '../models/campanha.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/campanhas/';

@Injectable({ providedIn: 'root'})
export class CampanhaService {
  private campanhas: Campanha[] = [];
  private campanhasUpdated = new Subject<{campanhas: Campanha[], campanhaCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getCampanhas(campanhaPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${campanhaPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; campanhas: any; maxCampanhas: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((campanhasData) => {
        return {
          campanhas: campanhasData.campanhas.map(campanha => {
            return {
              id: campanha._id,
              title: campanha.title,
              description: campanha.description
            };
          }),
          maxCampanhas: campanhasData.maxCampanhas
        };
      })
    )
      .subscribe(transformedCampanhasData => {
        this.campanhas = transformedCampanhasData.campanhas;
        this.campanhasUpdated.next({
          campanhas: [...this.campanhas],
          campanhaCount: transformedCampanhasData.maxCampanhas
        });
      });
  }

  getPostUpdateListener() {
    return this.campanhasUpdated.asObservable();
  }

  addCampanha(
    title: string,
    image: string,
    description: string
  ) {
    const campanha: Campanha = {
      id: null,
      title,
      image,
      description
    };
    console.log(campanha);
    this.http.post<{ message: string, campanhaId: string }>(BACKEND_URL, campanha)
    .subscribe(responseData => {
        this.router.navigate(['/']);
    });
  }
}
