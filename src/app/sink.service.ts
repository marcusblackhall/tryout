import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Person } from './model/person.model';

@Injectable({
  providedIn: 'root'
})
export class SinkService implements OnInit,OnDestroy {


  subject = new Subject<number>();

  constructor(
        private http:HttpClient
    ) {



    }
  ngOnDestroy(): void {


  }
  ngOnInit(): void {

  }

  getPersons() :Observable<Person[]> {
    return this.http.get<Person[]>("http://localhost:8080/api/persons");
  }

  getPerson(id:number){

    return this.http.get<Person>("http://localhost:8080/api/persons/" + id  );

  }

  addPerson(person: Person){

    const body = {name: person.name, age: person.age, imageurl: person.imageurl};

    return this.http.post<Person>("http://localhost:8080/api/persons",body
    );

  }

  deleteperson(id:number){

    return this.http.delete("http://localhost:8080/api/persons/" + id);

  }

  updatePerson(person:Person){

    const body = {
      name: person.name,
      age: person.age,
      imageurl: person.imageurl,
      id : person.id
    };
    return this.http.put<Person>("http://localhost:8080/api/persons/"+ person.id,
     body
    );



  }


  startEventSource(){

    let eventSource = new EventSource("http://localhost:8080/sink");
   if (eventSource.CLOSED){
    console.log("reopening event source");
    eventSource = new EventSource("http://localhost:8080/sink");
   }

   eventSource.addEventListener("message", (message:any) =>{
    console.log("recieved " + message.data);
    this.subject.next(+message.data);
   });



   eventSource.onerror = (error) =>{
     console.log("event source is closed");
     eventSource.close();
   };



  }

}
