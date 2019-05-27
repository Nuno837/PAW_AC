import { Component, Input } from '@angular/core';
import { CampanhaService } from '../../services/campanha.service';
import { Campanha } from '../../models/campanha.model';

@Component({
  selector: 'app-campanha-list',
  templateUrl: './campanha-list.component.html',
  styleUrls: ['./campanha-list.component.css']
})
export class CampanhaListComponent {
   campanhas: Campanha[] = [];

   constructor(
    public campanhaService: CampanhaService
   ) {}

   ngOnInit() {
   }
}
