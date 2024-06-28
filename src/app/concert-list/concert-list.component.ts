import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Concert } from '../concert.model';

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.css']
})
export class ConcertListComponent implements OnInit {
  concerts: Concert[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToConcertDetail(id: string): void {
    this.router.navigate(['/concert', id]);
  }
}
