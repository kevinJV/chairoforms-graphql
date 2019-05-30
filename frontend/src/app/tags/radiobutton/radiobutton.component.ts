import { Component, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.css']
})
export class RadiobuttonComponent {
  public config: any;
  options: any = []
  value = ""
  question = "question"
  description = "description"
  placeholder = "choose"
  constructor(@Inject('config') config) {
    this.config = config;
    this.description = this.config.description
    this.value = this.config.value
    this.options = this.config.option    
    this.question = this.config.label
  }
  @Input() name: string;
}

