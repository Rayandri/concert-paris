import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Concert } from './concert.model';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
  private apiKey = 'YOUR_API_KEY';

  constructor(private http: HttpClient) { }

  getConcerts(): Observable<Concert[]> {
    const city = "Paris";
    const url = `${this.ticketmasterUrl}?city=${city}&apikey=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const events = response._embedded?.events || [];
        return events.map((event: any) => {
          return {
            name: event.name,
            date: event.dates.start.localDate,
            venue: event._embedded.venues[0].name,
            artist: event._embedded.attractions[0].name,
            genre: event.classifications[0].genre.name 
          };
        });
      }),
      catchError(() => of([])) 
    );
  }
}
