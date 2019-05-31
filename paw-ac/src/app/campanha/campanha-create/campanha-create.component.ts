import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Campanha } from 'src/app/models/campanha.model';
import { CampanhaService } from 'src/app/services/campanha.service';

@Component({
  selector: 'app-campanha-create',
  templateUrl: './campanha-create.component.html',
  styleUrls: ['./campanha-create.component.css']
})
export class CampanhaCreateComponent {

  public criarCampanha: FormGroup;

  campanhas: any[];

  imagePreview: string;

  constructor(
    private formBuilder: FormBuilder,
    public campanhaService: CampanhaService,
  ) {
    this.criarCampanha = this.formBuilder.group({
      title: ['', [Validators.required]],
      image: [''],
      description: ['', [Validators.required]],
      iban: ['', [Validators.required]],
      goal: ['', [Validators.required]]
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.criarCampanha.patchValue({ imagePreview: file });
    this.criarCampanha.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddCampanha() {
    this.campanhaService.addCampanha(
      this.criarCampanha.value.title,
      this.criarCampanha.value.image,
      this.criarCampanha.value.description,
      this.criarCampanha.value.iban,
      this.criarCampanha.value.goal
    );
    console.log(this.criarCampanha);

    this.criarCampanha.reset();
  }

}
