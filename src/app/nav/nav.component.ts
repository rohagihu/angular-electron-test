import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // progress: any = null;

  constructor(private dataServive: DataService) { }

  ngOnInit(): void {
    // this.progress = this.dataServive.getProgress();
    // console.log(this.progress)
  }

  // startPlacementRound() {
  //   this.dataServive.startPlacementRound();
  //   this.progress = this.dataServive.getProgress();
  // }

  saveDB() {
    this.dataServive.saveDB();
  }
  getDB() {
    this.dataServive.getDB();
  }

}
