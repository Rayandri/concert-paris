import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { Concert } from '../concert.model';
import { ConcertService } from '../concert.service';

@Component({
  selector: 'app-concert-detail',
  templateUrl: './concert-detail.component.html',
  styleUrls: ['./concert-detail.component.css']
})
export class ConcertDetailComponent implements OnInit {
  concert: Concert | null = null;
  topSongs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private concertService: ConcertService,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getConcert();
  }

  getConcert(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.concertService.getConcertById(id).subscribe(
        concert => {
          if (concert) {
            this.concert = concert;
            this.getTopSongs(concert.artist);
          } else {
            console.error('Concert non trouvé');
          }
        },
        error => {
          console.error('Erreur lors de la récupération du concert:', error);
        }
      );
    }
  }

  getTopSongs(artist: string): void {
    const apiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(artist)}&limit=5&output=jsonp`;

    this.http.jsonp<any>(apiUrl, 'callback').subscribe(
      (response: any) => {
        this.topSongs = response.data || [];
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des top chansons:', error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
