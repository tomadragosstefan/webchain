import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { University } from './university.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'webchain';
  universities: University[] = [];
  countries : string[] = [];

  nameFilter = "";
  countryFilter = "";

  constructor(private data: DataService){}

  filterTable(){
    this.data.getUniversities(this.nameFilter, this.countryFilter).subscribe(universities =>{
      this.universities =  universities;
    });
  }

  ngOnInit(): void {
    let countries:string[] = [];

    this.data.getUniversities("","").subscribe(
      universities=>{

        this.universities =  universities;
        
        let countries = new Set();

        this.universities.forEach(university=>{
          countries.add(university.country);
        })

        this.countries = Array.from(countries) as string[];
        this.countries.sort();
      }
    );
  }

}
