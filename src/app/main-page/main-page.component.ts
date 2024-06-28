// main-page.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcertService } from '../concert.service';
import { Concert } from '../concert.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  concerts: Concert[] = [];
  searchTerm: string = '';
  selectedCountry: string = '';
  selectedGenre: string = '';

  countries: string[] = ['France', 'USA', 'UK'];

  constructor(
    private concertService: ConcertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getConcerts();
  }

  getConcerts(): void {
    this.concertService.getConcerts(this.selectedCountry, this.selectedGenre, this.searchTerm)
      .subscribe(concerts => this.concerts = concerts);
  }

  applyFilters(): void {
    this.getConcerts();
  }

  showConcertDetails(concert: Concert): void {
    this.router.navigate(['/concert', concert.id]);
  }

  onCountryChange(): void {
    this.getConcerts();
  }
}
