import { Component, OnDestroy } from '@angular/core';
import {   Subscription } from 'rxjs';
import {map} from 'rxjs/operators';
import { Person } from './model/person.model';
import { SinkService } from './sink.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'teststream';
  results:number[] = [];
  persons:Person[] = [];

  sub:Subscription = new Subscription();

  constructor(private sink:SinkService){

  }
  ngOnDestroy(): void {
    if (this.sub){
    this.sub.unsubscribe;
    }
  }



  startStream(){

    this.sink.startEventSource();
    this.sub = this.sink.subject.subscribe( (data:number) => {
      console.log("processing " + data );
      this.results.push(data);
    });
  }

  getPersons(){
      this.sink.getPersons()

      .subscribe(
        (persons:Person[]) => {
          this.persons = persons;
        }

      );

  }


}
