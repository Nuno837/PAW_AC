import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-campanha-create',
  templateUrl: './campanha-create.component.html',
  styleUrls: ['./campanha-create.component.css']
})
export class CampanhaCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  @Output() campanhaCreated = new EventEmitter();

  onAddCampanha() {
    const campanha = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.campanhaCreated.emit(campanha);

  }
}
