import { Component, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  public config: any;
  options: any = []
  value = ""
  question = "question"
  description = "description"  
  number = ""
  constructor(@Inject('config') config) {
    this.config = config;
    this.description = this.config.description
    this.value = this.config.value
    this.options = this.config.option
    this.number = this.config.number
    this.question = this.config.label
  }
  @Input() name: string;
}