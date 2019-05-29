import { ViewContainerRef, Component, Injector, ComponentFactoryResolver, ComponentRef, ReflectiveInjector, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from './query'
import { Subscription } from 'apollo-client/util/Observable';

import { TextComponent } from './tags/text/text.component';
import { SelectComponent } from './tags/select/select.component';
import { CheckboxComponent } from './tags/checkbox/checkbox.component';
import { RadiobuttonComponent } from './tags/radiobutton/radiobutton.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  forms: any = []
  questionTypeValue = "text"
  private querySubscription: Subscription;

  constructor(
    private apollo: Apollo,
    private cfr: ComponentFactoryResolver,
    private vc: ViewContainerRef
  ) {
    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          question: 'Holaaaaa',
          options: ["a", "b"]
        }
      }
    ]);
    // {
    //   data: [
    //     question1: { type: "check",  label: '1', option: ["a", "b"] },
    //     question2: { type: "text",  label: '1', option: 'nothing' },
    //     question3: { type: "radio", label: '1', option: ["a", "b"] },
    //     question4: { type: "select", label: '1', option: ["a", "b"] }
    //   ]
    // }

    const factory2 = cfr.resolveComponentFactory(TextComponent);
    const cr2: ComponentRef<TextComponent> = vc.createComponent(factory2, 0, injector);

    // const factory3 = cfr.resolveComponentFactory(SelectComponent);
    // const cr3: ComponentRef<SelectComponent> = vc.createComponent(factory3, 0, injector);

    // const factory4 = cfr.resolveComponentFactory(CheckboxComponent);
    // const cr4: ComponentRef<CheckboxComponent> = vc.createComponent(factory4, 0, injector);

    // const factory5 = cfr.resolveComponentFactory(RadiobuttonComponent);
    // const cr5: ComponentRef<RadiobuttonComponent> = vc.createComponent(factory5, 0, injector);
  }

  ngOnInit() {
    this.getforms()
  }

  SelectQuestionType(type:string) {
    this.questionTypeValue = type
    console.log(type)
  }

  getforms() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: Query.forms
    }).valueChanges.subscribe(({ data, loading }) => {

      this.forms = data['forms']
      console.log(this.forms)
    })
  }
}
