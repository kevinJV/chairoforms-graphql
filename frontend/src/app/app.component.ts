import { ViewContainerRef, Component, Injector, ComponentFactoryResolver, ComponentRef, ReflectiveInjector, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from './query'
import { Subscription } from 'apollo-client/util/Observable';

import { TextComponent } from './tags/text/text.component';
import { SelectComponent } from './tags/select/select.component';
import { CheckboxComponent } from './tags/checkbox/checkbox.component';
import { RadiobuttonComponent } from './tags/radiobutton/radiobutton.component';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  forms: any = []
  questions: any = {}
  inputForm: FormGroup
  inputList: FormArray
  public contactList: FormArray;

  questionTypeValue = "text"
  checkSizeValue = [0, 1]

  private querySubscription: Subscription;

  constructor(
    private apollo: Apollo,
    private cfr: ComponentFactoryResolver,
    private vc: ViewContainerRef,
    private fb: FormBuilder
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

  }

  ngOnInit() {
    this.getforms()
    this.renderQuestions()

    this.inputForm = this.fb.group({
      inputs: this.fb.array([this.createInput()])
    });

    this.inputList = this.inputForm.get('inputs') as FormArray
  }

  renderQuestions() {
    var questionNumber = Object.keys(this.questions).length;
    var question = {
      type: "text",
      label: "Test Question",
      option: "null",
      description: "Testtt"
    }
    this.questions[questionNumber] = question
    console.log(this.questions)
    for (let val in this.questions) {
      var type = this.questions[val].type
      const injector: Injector = ReflectiveInjector.resolveAndCreate([
        {
          provide: 'config',
          useValue: this.questions[val]
        }
      ]);
      switch (type) {
        case "text": {
          let cr: ComponentRef<TextComponent> = this.vc.createComponent(this.cfr.resolveComponentFactory(TextComponent), questionNumber, injector);
          break;
        }
        case "checkbox": {
          let cr: ComponentRef<CheckboxComponent> = this.vc.createComponent(this.cfr.resolveComponentFactory(CheckboxComponent), questionNumber, injector);
          break;
        }
        case "radio": {
          let cr: ComponentRef<RadiobuttonComponent> = this.vc.createComponent(this.cfr.resolveComponentFactory(RadiobuttonComponent), questionNumber, injector);
          break;
        }
        case "select": {
          let cr: ComponentRef<SelectComponent> = this.vc.createComponent(this.cfr.resolveComponentFactory(SelectComponent), questionNumber, injector);
          break;
        }
      }
    }
  }


  selectQuestionType(type: string) {
    this.questionTypeValue = type

    this.inputForm = this.fb.group({
      inputs: this.fb.array([this.createInput()])
    });

    this.inputList = this.inputForm.get('inputs') as FormArray

    console.log(this.inputList)
  }

  addTextQuestion(label, description) {
    var questionNumber = Object.keys(this.questions).length;
    var question = {
      type: "text",
      label: label,
      option: "null",
      description: description
    }
    this.questions[questionNumber] = question
    console.log(this.questions)

    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          label: question.label,
          description: question.description
        }
      }
    ]);

    const factory = this.cfr.resolveComponentFactory(TextComponent);
    const cr: ComponentRef<TextComponent> = this.vc.createComponent(factory, questionNumber, injector);
  }

  addCheckQuestion(label: string, description: string) {
    var option = []
    var questionNumber = Object.keys(this.questions).length;

    for (let i = 0; i < this.inputList.length; i++) {
      option.push(this.getInputFormGroup(i).value['option'])
    }
    console.log(option)

    var question = {
      type: "checkbox",
      label: label,
      option: option,
      description: description
    }

    this.questions[questionNumber] = question

    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          label: question.label,
          description: question.description,
          option: question.option,
          number: questionNumber
        }
      }
    ]);

    const factory = this.cfr.resolveComponentFactory(CheckboxComponent);
    const cr: ComponentRef<CheckboxComponent> = this.vc.createComponent(factory, questionNumber, injector);
  }

  addRadioQuestion(label: string, description: string) {
    var option = []
    var questionNumber = Object.keys(this.questions).length;

    for (let i = 0; i < this.inputList.length; i++) {
      option.push(this.getInputFormGroup(i).value['option'])
    }
    console.log(option)

    var question = {
      type: "radio",
      label: label,
      option: option,
      description: description
    }

    this.questions[questionNumber] = question

    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          label: question.label,
          description: question.description,
          option: question.option,
          number: questionNumber
        }
      }
    ]);

    const factory = this.cfr.resolveComponentFactory(RadiobuttonComponent);
    const cr: ComponentRef<RadiobuttonComponent> = this.vc.createComponent(factory, questionNumber, injector);
  }

  addSelectQuestion(label: string, description: string) {
    var option = []
    var questionNumber = Object.keys(this.questions).length;

    for (let i = 0; i < this.inputList.length; i++) {
      option.push(this.getInputFormGroup(i).value['option'])
    }
    console.log(option)

    var question = {
      type: "radio",
      label: label,
      option: option,
      description: description
    }

    this.questions[questionNumber] = question

    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          label: question.label,
          description: question.description,
          option: question.option,
          number: questionNumber
        }
      }
    ]);

    const factory = this.cfr.resolveComponentFactory(SelectComponent);
    const cr: ComponentRef<SelectComponent> = this.vc.createComponent(factory, questionNumber, injector);
  }

  checkboxSize(checkSize) {
    this.checkSizeValue = Array.from(Array(parseInt(checkSize)).keys())
    //console.log(this.checkSizeValue)
  }

  createInput(): FormGroup {
    return this.fb.group({
      option: ['', Validators.compose([Validators.required])]
    });
  }

  addInput() {
    //console.log(this.createInput())
    this.inputList.push(this.createInput())
  }

  removeInput(index) {
    this.inputList.removeAt(index)
  }

  getInputFormGroup(index): FormGroup {
    this.inputList = this.inputForm.get('inputs') as FormArray;
    const formGroup = this.inputList.controls[index] as FormGroup;
    return formGroup;
  }

  get inputFormGroup() {
    return this.inputForm.get('inputs') as FormArray;
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
