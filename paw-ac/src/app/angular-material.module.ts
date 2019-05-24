import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSliderModule,
  MatIconModule,
  MatSelectModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatMenuModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatListModule
  ]
})

export class AngularMaterialModule {}
