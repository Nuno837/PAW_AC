import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-campanha-create',
  templateUrl: './campanha-create.component.html',
  styleUrls: ['./campanha-create.component.css']
})
export class CampanhaCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  public criarCampanha: FormGroup;
  @Output() campanhaCreated = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.criarCampanha = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  onAddCampanha() {
    const campanha = {
      title: this.criarCampanha.value.enteredTitle,
      description: this.criarCampanha.value.enteredContent
    };
    console.log(this.criarCampanha.value.enteredTitle);

    this.campanhaCreated.emit(campanha);

  }
}
