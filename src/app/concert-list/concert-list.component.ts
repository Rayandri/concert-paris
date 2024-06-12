import { Component, OnInit } from '@angular/core';
import { ConcertService } from '../concert.service';
import { Concert } from '../concert.model';

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.css']
})
export class ConcertListComponent implements OnInit {
  concerts: Concert[] = [];

  constructor(private concertService: ConcertService) { }

  ngOnInit(): void {
    this.getConcerts();
  }

  getConcerts(): void {
    this.concertService.getConcerts()
      .subscribe(concerts => this.concerts = concerts);
  }
}
