import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openMap() {
    window.open('http://maps.google.com?q=15.770778, 76.754528', '_blank');
  }

}
