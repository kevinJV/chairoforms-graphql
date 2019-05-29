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
  constructor(@Inject('config') config) {
    this.config = config;
    console.log(this.config.value)
    console.log(this.config.numOptions)
    this.value = this.config.value
    this.options = this.config.options
    console.log(this.options)
  }
  @Input() name: string;

}
