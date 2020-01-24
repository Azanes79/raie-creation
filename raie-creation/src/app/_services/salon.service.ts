import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  private server = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }


  public getAllSalon() {
    return this.http.get<any[]>(this.server + 'salon/').pipe(_salon => { return _salon});
  }

}
