import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ConcertListComponent } from './concert-list/concert-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ConcertDetailComponent } from './concert-detail/concert-detail.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'concerts', component: ConcertListComponent },
  { path: 'concert/:id', component: ConcertDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ConcertListComponent,
    MainPageComponent,
    ConcertDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
