import { Component, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.css']
})
export class RadiobuttonComponent {
  _ref:any;
  public config: any;
  options: any = []
  value = ""
  question = "question"
  description = "description"
  placeholder = "choose"
  status =""
  constructor(@Inject('config') config) {
    this.config = config;
    this.description = this.config.description
    this.value = this.config.value
    this.options = this.config.option    
    this.question = this.config.label
    this.status = this.config.status
  }

  removeObject(){
    this._ref.destroy();
  }  
  
  @Input() name: string;
}

