import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Campanha } from 'src/app/models/campanha.model';
import { CampanhaService } from 'src/app/services/campanha.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-campanha-create',
  templateUrl: './campanha-create.component.html',
  styleUrls: ['./campanha-create.component.css']
})
export class CampanhaCreateComponent implements OnInit {

  public criarCampanha: FormGroup;
  campanhas: any[];
  imagePreview: string;
  campanha: Campanha;
  private campanhaId: string;
  private mode = 'create';

  constructor(
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
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

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.campanhaId = paramMap.get('id');
        this.campanha = this.campanhaService.getCampanha(this.campanhaId);
      } else {
        this.mode = 'create';
        this.campanhaId = null;
      }
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
    if (this.mode === 'create'){
    this.campanhaService.addCampanha(
      this.criarCampanha.value.title,
      this.criarCampanha.value.image,
      this.criarCampanha.value.description,
      this.criarCampanha.value.iban,
      this.criarCampanha.value.goal
    );
    console.log(this.criarCampanha);

    this.criarCampanha.reset();
  } else {
    this.campanhaService.updateCampanha(
      this.campanhaId,
      this.criarCampanha.value.title,
      this.criarCampanha.value.image,
      this.criarCampanha.value.description,
      this.criarCampanha.value.iban,
      this.criarCampanha.value.goal
      );
    }
}
}
