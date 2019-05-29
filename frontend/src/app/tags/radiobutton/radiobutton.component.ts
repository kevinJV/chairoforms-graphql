import { Component, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.css']
})
export class RadiobuttonComponent {
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

