import { Campanha } from '../models/campanha.model';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root'})
export class CampanhaService {
  private campanhas: Campanha[] = [];

  getCampanha() {

  }


  addCampanha(
    title: string,
    description: string
  ) {
    const campanha: Campanha = {
      title,
      description
    };
  }
}
