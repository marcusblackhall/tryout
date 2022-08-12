import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditPersonComponent } from '../edit-person/edit-person.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ListPersonsComponent } from '../list-persons/list-persons.component';

 const routes:Routes = [
  { path: 'persons' , component: ListPersonsComponent},
  {

    path: 'editPerson/:id',
    component: EditPersonComponent
  },

  { path: 'addPerson', component:  EditPersonComponent},
  {
    path: '' , redirectTo: '/persons',pathMatch: 'full'
  },
  {
    path: "**", component: NotFoundComponent
  }




];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutesModule { }
