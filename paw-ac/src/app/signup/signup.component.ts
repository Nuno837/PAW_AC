import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupCreateComponent {
  username = ''
  name = ''
  public criarUser: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
 
  ) {
    this.criarUser = this.formBuilder.group({
     
    });
  }

}