import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupCreateComponent implements OnInit, OnDestroy{
  valida = true;
  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder

  ) {
    this.criarUser = this.formBuilder.group({
      nome: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      latlng: ['', [Validators.required]],
      iban: ['', [Validators.required]],
      nif: ['', [Validators.required, Validators.max(999999999)]]
    });
  }
  public criarUser: FormGroup;
  private authStatusSub: Subscription;

  ngOnInit() {
    this.authStatusSub =  this.authService.getAuthStatusListener().subscribe(
      authStatus => {
      }
    );
   }
   onSignup() {

    if (this.criarUser.invalid) {
      return;
    }
    this.authService.createUser(
      this.criarUser.value.nome,
      this.criarUser.value.username,
      this.criarUser.value.password,
      this.criarUser.value.morada,
      this.criarUser.value.latlng,
      this.criarUser.value.iban,
      this.criarUser.value.nif
      );
    }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}

