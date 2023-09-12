import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { University } from './university.interface';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'webchain';
  universities$: Observable<University[]> = new Observable();
  countries$: Observable<string[]> = new Observable();

  countries : string[] = [];

  nameFilter = "";
  countryFilter = "";

  constructor(private data: DataService){}

  filterTable(){
    this.universities$ = this.data.getUniversities(this.nameFilter, this.countryFilter);
  }

  ngOnInit(): void {
    this.universities$ = this.data.getUniversities(this.nameFilter, this.countryFilter);

    this.countries$ = this.universities$.pipe(map(university => 
      {
        const scrambledCountries = university.map(university => university.country);
        const setCountries = new Set(scrambledCountries);
        const countries = Array.from(setCountries);
        countries.sort();
        countries.unshift("");
        return countries;
      }
    ));
  }

}
