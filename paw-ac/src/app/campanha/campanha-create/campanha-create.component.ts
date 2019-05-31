import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Campanha } from 'src/app/models/campanha.model';
import { CampanhaService } from 'src/app/services/campanha.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-campanha-create',
  templateUrl: './campanha-create.component.html',
  styleUrls: ['./campanha-create.component.css']
})
export class CampanhaCreateComponent implements OnInit{

  public criarCampanha: FormGroup;
  private mode = 'create';
  campanhas: any[];
  private campanhaId: string;
  imagePreview: string;
  private campanha: Campanha;

  constructor(
    private formBuilder: FormBuilder,
    public campanhaService: CampanhaService, public route: ActivatedRoute,
  ) {
    this.criarCampanha = this.formBuilder.group({
      title: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      iban:['', [Validators.required]],
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

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('campanhaId')) {
        this.mode = 'edit';
        this.campanhaId = paramMap.get('postId');
        this.campanha = this.campanhaService.getCampanha(this.campanhaId);
      } else {
        this.mode = 'create';
        this.campanhaId = null;
      }
    });
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
