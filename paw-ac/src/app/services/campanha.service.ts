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
              description: campanha.description,
              iban: campanha.iban,
              goal: campanha.goal
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

  getCampanhaUpdateListener() {
    return this.campanhasUpdated.asObservable();
  }

  getCampanha(id: string) {
    return{...this.campanhas.find(c => c.id === id)};
  }

  updateCampanha(
    id: string,
    title: string,
    image: string,
    description: string,
    iban:string,
    goal:number
  ) {
    const campanha: Campanha = {
      id: id,
      title: title,
      image: image,
      description: description,
      iban: iban,
      goal: goal
    };
    this.http.put(BACKEND_URL + id, campanha)
    .subscribe(response => console.log(response));
  }

  addCampanha(
    title: string,
    image: string,
    description: string,
    iban:string,
    goal:number
  ) {
    const campanha: Campanha = {
      id: null,
      title,
      image,
      description,
      iban,
      goal
    };
    console.log(campanha);
    this.http.post<{ message: string, campanhaId: string }>(BACKEND_URL, campanha)
    .subscribe(responseData => {
        this.router.navigate(['/']);
    });
  }

  deleteCampanha(campanhaId: string){
    return this.http.delete(BACKEND_URL + campanhaId);
  }
}

