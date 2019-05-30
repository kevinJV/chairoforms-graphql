import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
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
