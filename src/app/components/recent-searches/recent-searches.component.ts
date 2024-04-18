import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch,faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss']
})
export class RecentSearchesComponent implements OnInit {

  recentSearches = [
    'Top Artist', 'Top Songs', 'Top Album',
    'Latest Hits'
  ];
  faSearch=faSearch;
  searchField = '';

  constructor() { }

  ngOnInit(): void {
  }

  setSearch(search: string){
    this.searchField = search;
  }

  search(){
    console.log('Searching', this.searchField);
  }

}
