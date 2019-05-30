import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import * as Query from '../query';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  surveys:any=[]
  surveyForm: FormGroup;
  loading = false;
  update = false;
  item_id = 0


  constructor(private formBuilder: FormBuilder,
    private apollo:Apollo){
      this.surveyForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
    this.getSurveys();
  }

  ngOnInit() {
  }

  getSurveys(){
    this.apollo.watchQuery({query:Query.Surveys}).valueChanges.subscribe(response=>{
      console.log(response);
      this.surveys=response.data['surveys'];
    });
  }

  createSurveys(){
    this.loading = true;
    this.apollo.mutate({
      mutation: Query.createSurvey,
      variables: {
         name: this.surveyForm.get('name').value,
         description: this.surveyForm.get('description').value
      },
      update: (proxy, {data : {createProduct}}) =>{
        const data: any = proxy.readQuery({query:Query.Surveys});

        console.log(data,createProduct);
        this.surveys.push(createProduct);

        proxy.writeQuery({query:Query.Surveys,data});
      }
    }).subscribe(({data})=>{
       this.loading = false;
       console.log(data);
    }),(error) =>{
      console.log('error',error)
    }
  }

  editSurvey(){

  }

  removeSurvey(id){
    this.apollo.mutate({
      mutation: Query.removeSurvey,
      variables: {
         id: id,
      },
      update: (proxy, {data : {removeProduct}}) =>{

        const data:any= proxy.readQuery({query:Query.Surveys});

        const product = this.surveys.find( p => p.id === id);
        const index = this.surveys.indexOf(product, 0);
        this.surveys.splice(index,1);

        proxy.writeQuery({query:Query.Surveys,data});
      }
    }).subscribe(({data})=>{
       console.log(data);
    }),(error) =>{
      console.log('error',error)
    }
  }

}
