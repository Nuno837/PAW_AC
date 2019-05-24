import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Campanha } from 'src/app/models/campanha.model'
import { CampanhaService } from 'src/app/services/campanha.service';

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
    public campanhaService: CampanhaService,
  ) {
    this.criarCampanha = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  onAddCampanha() {
    this.campanhaService.addCampanha(
      this.criarCampanha.value.title,
      this.criarCampanha.value.description
    );
    console.log(this.criarCampanha.value.enteredTitle);

    this.campanhaCreated.emit(Campanha);

  }
}
