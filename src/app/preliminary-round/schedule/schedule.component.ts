import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @ViewChild('scoringModal', {static: true}) public scoringModal;
  preliminaryRound: any = {};

  games: {}[] = [];

  selectedMatch = null;
  iGroup = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.preliminaryRound = this.dataService.getPreliminaryConfig();

    ['A', 'B', 'C'].forEach(el => {
      this.games.push({
        name: el,
        schedule: [...this.preliminaryRound.schedule]
      });
    });


    console.log(this.preliminaryRound);
    console.log(this.games);
  }

  openScoreModal(item, iGroup) {
    this.selectedMatch = item;
    this.iGroup = iGroup;
    this.scoringModal.show();
    console.log(item);
  }

  onClose(event) {
    this.selectedMatch = null;
    this.iGroup = null;
  }

}
