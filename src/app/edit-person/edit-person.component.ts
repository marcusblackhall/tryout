import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../model/person.model';
import { SinkService } from '../sink.service';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {


  editForm: FormGroup = new FormGroup(
    {
      'id': new FormControl(''),
      'imageUrl': new FormControl(''),
      'name': new FormControl('', Validators.required),
      'age': new FormControl('', Validators.required)
    }
  );

  editMode: boolean = false;
  btnText:string = 'Update';
  id: number | undefined;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private personService: SinkService,

  ) { }

  ngOnInit(): void {

    console.log("Url " + this.router.url);
    if (this.router.url === "/addPerson") {
      this.editMode = false;
      this.btnText = 'Create';

      return;
    }
    this.editMode = true;
    this.activatedRoute.params.pipe(
      filter(
        (params: any) => params && params['id']
      ),
      map((params) => {
        return this.id = params['id'];
      }),
      switchMap((personId: number) => {
        return this.personService.getPerson(personId);
      })
    ).subscribe(
      (person: Person) => {
        this.editForm.setValue(
          {
            name: person.name,
            age: person.age,
            imageUrl: person.imageurl,
            id: person.id
          }

        );
      }

    );

  }

  onSubmit() {
    console.log(this.editForm.value);


    let name = this.editForm.value["name"];
    let age = this.editForm.value["age"];
    let id = this.editForm.value["id"];
    let imageUrl = this.editForm.value['imageUrl'];
    let person = new Person(name, age, imageUrl,id);

    if (this.editMode) {
      this.personService.updatePerson(person).subscribe(
        (person: Person) => {
          console.log("person updated successfully " + person);
        }

      );
    } else {
      this.personService.addPerson(person).subscribe(
        (addedPerson: Person) => {
           console.log("added person " + addedPerson.name);
           this.router.navigate(['/', 'persons']);

          }


      );


    }


  }

}
