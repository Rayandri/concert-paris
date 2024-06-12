import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.css']
})
export class ConcertListComponent implements OnInit {
  concerts: { name: string, date: string, venue: string }[] = [
    { name: 'Concert A', date: '2024-06-15', venue: 'Venue A' },
    { name: 'Concert B', date: '2024-07-20', venue: 'Venue B' },
    { name: 'Concert C', date: '2024-08-10', venue: 'Venue C' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
