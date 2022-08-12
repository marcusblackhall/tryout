import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person.model';
import { SinkService } from '../sink.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css'],
  animations: [
    trigger('enabledStateChange', [
      state(
        'default',
        style({
			opacity: 1,
		})
	),
	state(
		'disabled',
		style({
			opacity: 0.5,
        })
      ),
      transition('* => void', animate('300ms ease-out')),
    ])

,

trigger('fadeSlideInOut', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateY(10px)' }),
		animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
	]),
	transition('* => void', [
		animate('1000ms', style({ opacity: 0, 'background-color': 'pink', transform: 'translateY(10px)' })),
	]),
]),
  ]
})
export class ListPersonsComponent implements OnInit {

  persons: Person[] = [];
  trashCan = faTrashCan;
  stateLeave = 'enter';
  constructor(private sink: SinkService) { }

  ngOnInit(): void {
    this.getPersons();

  }

  getPersons() {
    this.sink.getPersons()

      .subscribe(
        (persons: Person[]) => {
          this.persons = persons;
        }

      );

  }

  deletePerson(idx:number,id:any){
    console.log("deleting idx " + idx);
    this.stateLeave = "leaving"
    this.sink.deleteperson(+id)
    .subscribe(()=> {

        this.persons.splice(idx,1);

    });
  }

}
