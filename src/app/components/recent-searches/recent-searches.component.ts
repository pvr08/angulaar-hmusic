import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss']
})
export class RecentSearchesComponent implements OnInit {

  recentSearches = [
    'Top Brazil', 'Top Global', 'Sertanejo Warm-up',
    'Funk Hits', 'Pagode Party'
  ];

  searchField = '';

  constructor() { }

  ngOnInit(): void {
  }

  setSearch(search: string){
    this.searchField = search;
  }

  search(){
    console.log('Searching...', this.searchField);
  }

}
