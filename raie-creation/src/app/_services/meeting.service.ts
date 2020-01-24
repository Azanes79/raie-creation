import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private server = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  public getAllMeeting() {
    return this.http.get<any[]>(this.server + 'meeting/').pipe(_meeting => { return _meeting});
  }
}
