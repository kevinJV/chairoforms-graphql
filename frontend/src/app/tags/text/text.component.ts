import { Component, Input, Inject} from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
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
