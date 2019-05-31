import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './tags/select/select.component';
import { CheckboxComponent } from './tags/checkbox/checkbox.component';
import { RadiobuttonComponent } from './tags/radiobutton/radiobutton.component';
import { TextComponent } from './tags/text/text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule,MatTabsModule,MatListModule,MatCardModule,MatExpansionModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatRadioModule, MatRadioGroup } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    SelectComponent,
    CheckboxComponent,
    RadiobuttonComponent,
    HomeComponent,
    SurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatSidenavModule,
    FormsModule
  ],
  entryComponents: [
    TextComponent,
    SelectComponent,
    CheckboxComponent,
    RadiobuttonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
