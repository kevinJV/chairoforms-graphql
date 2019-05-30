import { Component, Input, Inject} from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  public config: any;  
  question = "question"
  description = "description"
  placeholder = "answer"
  constructor(@Inject('config') config) {
    this.config = config;
    console.log(this.config.value)
    console.log(this.config.numOptions)    
    this.question = this.config.label
    this.description = this.config.description
  }
  @Input() name: string;
}
