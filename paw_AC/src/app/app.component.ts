<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';

import { Reserva } from './models/reserva.model';
import { AuthService } from './auth/auth.service';
>>>>>>> 8ed7854fdca537925041a65fb32f05f871f9431b

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
export class AppComponent {
  title = 'paw';
=======
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {

    this.authService.autoAuthUser();
  }

>>>>>>> 8ed7854fdca537925041a65fb32f05f871f9431b
}
