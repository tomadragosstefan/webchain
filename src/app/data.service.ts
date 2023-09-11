import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { University } from './university.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUniversities(name: string, country: string): Observable<University[]>{

    const params = new HttpParams()
    .set('name', name )
    .set('country', country);


    return this.http.get<University[]>(`http://universities.hipolabs.com/search`,{ params });//?name=middle&country=turkey
  }

}
