import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { SelectComponent } from './tags/select/select.component';
import { CheckboxComponent } from './tags/checkbox/checkbox.component';
import { RadiobuttonComponent } from './tags/radiobutton/radiobutton.component';
import { TextComponent } from './tags/text/text.component';

@NgModule({
  declarations: [
    AppComponent,

    TextComponent,
    SelectComponent,
    CheckboxComponent,
    RadiobuttonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
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
