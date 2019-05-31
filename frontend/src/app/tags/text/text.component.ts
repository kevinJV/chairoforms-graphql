import { Component, Input, Inject, OnInit, Output,EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {

  @Input() name: string;
  @Output() close = new EventEmitter<void>();
  _ref:any; 
  data:any;  
  public config: any;
  question = "question"
  value = ""
  description = "description"
  placeholder = "respuesta"
  status = ""
  constructor(@Inject('config') config) {
    this.config = config;
    //console.log(this.config)
    this.value = this.config.value
    // console.log(this.config.numOptions)
    this.question = this.config.label
    this.description = this.config.description
    this.status = this.config.status

  }
 
  removeObject(){

    this._ref.destroy();
  }  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log("emit")
    this.close.emit(); 
  }


}
