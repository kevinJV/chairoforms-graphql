import { Component, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  public config: any;
  value = ""
  constructor(@Inject('config') config) {
    this.config = config;
    console.log(this.config.value)
    console.log(this.config.numOptions)
    this.value = this.config.value
  }
  @Input() name: string;
}