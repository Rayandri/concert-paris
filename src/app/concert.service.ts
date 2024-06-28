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
  private apiKey = 'mRj1NAiGMCTvjJ8IwP1HxnwT9VoujEMe';

  constructor(private http: HttpClient) { }

  getConcerts(country?: string, genre?: string, artist?: string): Observable<Concert[]> {
    let url = `${this.ticketmasterUrl}?apikey=${this.apiKey}`;

    if (country) {
      url += `&countryCode=${this.getCountryCode(country)}`;
    }

    if (genre) {
      url += `&classificationName=${genre}`;
    }

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        const events = response._embedded?.events || [];
        const concerts: Concert[] = events
          .filter((event: any) => {
            const isMusicEvent = event.classifications.some((cls: any) => cls.segment.name === 'Music');
            const matchesArtist = !artist || event._embedded.attractions?.some((attraction: any) =>
              attraction.name.toLowerCase().includes(artist.toLowerCase())
            );
            return isMusicEvent && matchesArtist;
          })
          .map((event: any) => {
            return {
              id: event.id,
              name: event.name,
              date: event.dates.start.localDate,
              venue: event._embedded.venues[0].name,
              artist: event._embedded.attractions ? event._embedded.attractions[0].name : 'N/A',
              genre: event.classifications ? event.classifications[0].genre.name : 'N/A',
              imageUrl: event.images ? event.images[0].url : '',
              description: event.info
            };
          });
        
        concerts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return concerts;
      }),
      catchError(() => of([]))
    );
  }

  getConcertById(id: string): Observable<Concert | null> {
    const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((event: any) => ({
        id: event.id,
        name: event.name,
        date: event.dates.start.localDate,
        venue: event._embedded.venues[0].name,
        artist: event._embedded.attractions ? event._embedded.attractions[0].name : 'N/A',
        genre: event.classifications ? event.classifications[0].genre.name : 'N/A',
        imageUrl: event.images ? event.images[0].url : '',
        description: event.info
      })),
      catchError(() => of(null))
    );
  }

  private getCountryCode(country: string): string {
    const countryCodes: { [key: string]: string } = {
      'France': 'FR',
      'USA': 'US',
      'UK': 'GB'
    };
    return countryCodes[country] || '';
  }
}
