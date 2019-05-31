import { ViewContainerRef, Component, Injector, ComponentFactoryResolver, ComponentRef, ReflectiveInjector, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../query';
import { Subscription } from 'apollo-client/util/Observable';

import { TextComponent } from '../tags/text/text.component';
import { SelectComponent } from '../tags/select/select.component';
import { CheckboxComponent } from '../tags/checkbox/checkbox.component';
import { RadiobuttonComponent } from '../tags/radiobutton/radiobutton.component';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent implements OnInit {
  @ViewChild('questionsDiv', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  title = 'frontend';
  components: any = []
  survey: any
  questions: any = {}
  inputForm: FormGroup
  inputList: FormArray
  status = "draft"
  public contactList: FormArray;
  //checkSizeValue = [0, 1]
  questionTypeValue = "text"
  private querySubscription: Subscription;


  constructor(
    private apollo: Apollo,
    private cfr: ComponentFactoryResolver,
    private fb: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private _router: Router
  ) {

  }


  ngOnInit() {
    let id;
    this._Activatedroute.paramMap.subscribe(params => {
      id = params['params'].id
    });

    this.getSurvey(id).then(response => {
      this.survey = response
      this.status = this.survey.status
      this.questions = JSON.parse(this.survey.data)
      this.renderQuestions()
      this.inputForm = this.fb.group({
        inputs: this.fb.array([this.createInput()])
      });

      this.inputList = this.inputForm.get('inputs') as FormArray
    })

  }

  getSurvey(id) {
    return new Promise((resolve, reject) => {
      console.log(id)
      this.apollo.watchQuery({
        query: Query.Survey,
        variables: {
          id: parseInt(id),
        },
      }).valueChanges.subscribe(response => {
        console.log(response);
        console.log(response.data['survey'])
        resolve(response.data['survey'])
      });
    })

  }

  renderQuestions() {
    for (let val in this.questions) {
      var type = this.questions[val].type
      const injector: Injector = ReflectiveInjector.resolveAndCreate([
        {
          provide: 'config',
          useValue: {
            label: this.questions[val].label,
            description: this.questions[val].description,
            option: this.questions[val].option,
            value: val,
            status: this.status
          }
        }
      ]);
      switch (type) {
        case "text": {
          let cr: ComponentRef<TextComponent> = this.viewContainer.createComponent(this.cfr.resolveComponentFactory(TextComponent), parseInt(val), injector)
          this.components.push({ index: this.components.length + 1 })
          cr.instance._ref = cr;
          cr.onDestroy(() => {
            console.log("hay algo?: " + cr.instance.value)

            this.deleteQuestion(cr.instance.value)
          })
          break;
        }
        case "checkbox": {
          let cr: ComponentRef<CheckboxComponent> = this.viewContainer.createComponent(this.cfr.resolveComponentFactory(CheckboxComponent), parseInt(val), injector);
          this.components.push({ index: this.components.length + 1 })
          cr.instance._ref = cr;
          cr.onDestroy(() => {
            console.log("hay algo?: " + cr.instance.value)

            this.deleteQuestion(cr.instance.value)
          })
          //meter boton
          break;
        }
        case "radio": {
          let cr: ComponentRef<RadiobuttonComponent> = this.viewContainer.createComponent(this.cfr.resolveComponentFactory(RadiobuttonComponent), parseInt(val), injector);
          this.components.push({ index: this.components.length + 1 })
          cr.instance._ref = cr;
          cr.onDestroy(() => {
            console.log("hay algo?: " + cr.instance.value)

            this.deleteQuestion(cr.instance.value)
          })
          break;
        }
        case "select": {
          let cr: ComponentRef<SelectComponent> = this.viewContainer.createComponent(this.cfr.resolveComponentFactory(SelectComponent), parseInt(val), injector);
          this.components.push({ index: this.components.length + 1 })
          cr.instance._ref = cr;
          cr.onDestroy(() => {
            console.log("hay algo?: " + cr.instance.value)

            this.deleteQuestion(cr.instance.value)
          })
          break;
        }
      }
    }
  }

  deleteQuestion(id) {
    console.log("id a eliminar: " + id)
    console.log(this.questions)
    console.log(delete this.questions[id])
    console.log(this.questions)
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
    var graphNumber = Object.keys(this.questions).length;
    console.log(questionNumber)
    var question = {
      type: "text",
      label: label,
      option: "null",
      description: description
    }
    if (this.questions[questionNumber] != undefined) {      
      questionNumber = questionNumber + 1      
    }
    
    this.questions[questionNumber] = question
    console.log(this.questions)
    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          label: question.label,
          description: question.description,
          value: questionNumber,
          status: this.status
        }
      }
    ]);
    
    console.log("hey there")
    const factory = this.cfr.resolveComponentFactory(TextComponent);
    const cr: ComponentRef<TextComponent> = this.viewContainer.createComponent(factory, graphNumber, injector);
    cr.instance._ref = cr;
    cr.onDestroy(() => {
      console.log("hay algo?: " + cr.instance.value)

      this.deleteQuestion(cr.instance.value)
    })
  }

  addCheckQuestion(label: string, description: string) {
    var option = []
    var questionNumber = Object.keys(this.questions).length;
    var graphNumber = Object.keys(this.questions).length;
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
    if (this.questions[questionNumber] != undefined) {      
      questionNumber = questionNumber + 1      
    }
    this.questions[questionNumber] = question

    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          label: question.label,
          description: question.description,
          option: question.option,
          number: questionNumber,
          value: questionNumber,
          status: this.status
        }
      }
    ]);

    const factory = this.cfr.resolveComponentFactory(CheckboxComponent);
    const cr: ComponentRef<CheckboxComponent> = this.viewContainer.createComponent(factory, graphNumber, injector);
    cr.instance._ref = cr;
    cr.onDestroy(() => {
      console.log("hay algo?: " + cr.instance.value)

      this.deleteQuestion(cr.instance.value)
    })
  }

  addRadioQuestion(label: string, description: string) {
    var option = []
    var questionNumber = Object.keys(this.questions).length;
    var graphNumber = Object.keys(this.questions).length;
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
    if (this.questions[questionNumber] != undefined) {      
      questionNumber = questionNumber + 1      
    }
    this.questions[questionNumber] = question

    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          label: question.label,
          description: question.description,
          option: question.option,
          number: questionNumber,
          value: questionNumber,
          status: this.status
        }
      }
    ]);

    const factory = this.cfr.resolveComponentFactory(RadiobuttonComponent);
    const cr: ComponentRef<RadiobuttonComponent> = this.viewContainer.createComponent(factory, graphNumber, injector);
    cr.instance._ref = cr;
    cr.onDestroy(() => {
      console.log("hay algo?: " + cr.instance.value)

      this.deleteQuestion(cr.instance.value)
    })
  }

  addSelectQuestion(label: string, description: string) {
    var option = []
    var questionNumber = Object.keys(this.questions).length;
    var graphNumber = Object.keys(this.questions).length;
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
    if (this.questions[questionNumber] != undefined) {      
      questionNumber = questionNumber + 1      
    }
    this.questions[questionNumber] = question

    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          label: question.label,
          description: question.description,
          option: question.option,
          number: questionNumber,
          value: questionNumber,
          status: this.status
        }
      }
    ]);

    const factory = this.cfr.resolveComponentFactory(SelectComponent);
    const cr: ComponentRef<SelectComponent> = this.viewContainer.createComponent(factory, graphNumber, injector);
    cr.instance._ref = cr;
    cr.onDestroy(() => {
      console.log("hay algo?: " + cr.instance.value)

      this.deleteQuestion(cr.instance.value)
    })
  }

  // checkboxSize(checkSize) {
  //   this.checkSizeValue = Array.from(Array(parseInt(checkSize)).keys())
  //   //console.log(this.checkSizeValue)
  // }

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

  editSurvey() {
    console.log(this.survey)
    //this.loading_edit = true;
    this.apollo.mutate({
      mutation: Query.editSurvey,
      variables: {
        id: parseInt(this.survey.id),
        name: this.survey.name,
        description: this.survey.description,
        data: JSON.stringify(this.questions),
        status: this.survey.status
      },
    }).subscribe(({ data }) => {
      //this.loading_edit = false;
      console.log(data);
    }), (error) => {
      console.log('error', error)
    }
  }

  editStatusSurvey(survey) {
    this.apollo.mutate({
      mutation: Query.editSurvey,
      variables: {
        id: parseInt(this.survey.id),
        name: this.survey.name,
        description: this.survey.description,
        data: this.survey.data,
        status: "finalized"
      },
    }).subscribe(({ data }) => {
      console.log(data);
    }), (error) => {
      console.log('error', error)
    }
  }

}
