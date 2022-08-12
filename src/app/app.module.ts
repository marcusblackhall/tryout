import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { AppRoutesModule } from './app-routes/app-routes.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListPersonsComponent } from './list-persons/list-persons.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    EditPersonComponent,
    NotFoundComponent,
    ListPersonsComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutesModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
