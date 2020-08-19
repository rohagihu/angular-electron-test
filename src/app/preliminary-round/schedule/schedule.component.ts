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

  games: any[] = [];

  selectedMatch = null;
  iGroup = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.preliminaryRound = this.dataService.getPreliminaryConfig();

    ['A', 'B', 'C'].forEach(el => {
      const temp = JSON.stringify(this.preliminaryRound.schedule);
      this.games.push({
        name: el,
        schedule: JSON.parse(temp)
      });
    });
    this.dataService.saveGames(this.games);


    // TEST DATA
    this.games.forEach(group => {
      group.schedule.forEach(game => {
        game.game.forEach(match => {
          match.pointsA = Math.floor(Math.random() * 15);
          match.pointsB = Math.floor(Math.random() * 15);
        });
        let bigA = 0;
        let bigB = 0;
        game.game.filter(el => el.pointsA !== 0 || el.pointsB !== 0).forEach(el => {
          if (el.pointsA > el.pointsB) {
            bigA++;
            bigA++;
          }
          else if (el.pointsB > el.pointsA) {
            bigB++;
            bigB++;
          }
          else {
            bigA++;
            bigB++;
          }
        });
        game.bigPointsA = bigA;
        game.bigPointsB = bigB;
      });
    });
    this.dataService.saveGames(this.games);

    console.log(this.preliminaryRound);
    console.log(this.games);
  }

  gameCalcPoints(game) {
    let bigA = 0;
    let bigB = 0;
    game.filter(el => el.pointsA !== 0 && el.pointsB !== 0).forEach(el => {
      if (el.pointsA > el.pointsB) {
        bigA++;
        bigA++;
      }
      else if (el.pointsB > el.pointsA) {
        bigB++;
        bigB++;
      }
      else {
        bigA++;
        bigB++;
      }
    });
    console.log((bigA !== 0 && bigB !== 0) ? (bigA + ':' + bigB) : null)
    return (bigA !== 0 && bigB !== 0) ? (bigA + ':' + bigB) : null;
  }

  openScoreModal(item, iGroup) {
    this.selectedMatch = item;
    this.iGroup = iGroup;
    this.scoringModal.show();
    console.log(item);
  }

  onClose(event) {
    let bigA = 0;
    let bigB = 0;
    this.selectedMatch.game.filter(el => el.pointsA !== 0 || el.pointsB !== 0).forEach(el => {
      if (el.pointsA > el.pointsB) {
        bigA++;
        bigA++;
      }
      else if (el.pointsB > el.pointsA) {
        bigB++;
        bigB++;
      }
      else {
        bigA++;
        bigB++;
      }
    });
    this.selectedMatch.bigPointsA = bigA;
    this.selectedMatch.bigPointsB = bigB;
    this.selectedMatch = null;
    this.iGroup = null;
    this.dataService.saveGames(this.games);
  }

}
