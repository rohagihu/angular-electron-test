import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-part03-game-schedules',
  templateUrl: './part03-game-schedules.component.html',
  styleUrls: ['./part03-game-schedules.component.css']
})
export class Part03GameSchedulesComponent implements OnInit {

  @Output() done = new EventEmitter<number>();
  @Output() undo = new EventEmitter<number>();

  testArr = ['0', '1', '2', '3', '4'];
  preliminaryRound: any = {};
  schedule = [];
  // c = 0;
  // testArr.slice(0,-1).forEach((el,i) => c = c + (i+1));

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.preliminaryRound = this.dataService.getPreliminaryConfig();
    if (this.preliminaryRound.schedule.length === 0) {
      this.shuffle();
    } else {
      this.schedule = this.preliminaryRound.schedule;
    }
  }

  shuffle() {
    // let teamsA = [...this.testArr];
    // let teamsB = [...this.testArr];
    let matchesCount = 0;
    const tempArr = [...this.testArr];
    this.schedule = [];
    tempArr.slice(0, -1).forEach((el, i) => matchesCount = matchesCount + (i + 1));
    let cTemp = 0;
    while (cTemp < matchesCount ) {
      console.log(cTemp);
      const v1 = Math.floor(Math.random() * tempArr.length);
      let v2 = null;
      let whileCTempA = 0;
      let whileCTempB = 0;
      let timeout = false;
      while (
        v2 === null ||
        v2 === v1 ||
        this.schedule.some(el => (el.teamA === v1 && el.teamB === v2) || (el.teamA === v2 && el.teamB === v1))
      ) {
        v2 = Math.floor(Math.random() * tempArr.length);
        whileCTempB++;
        if (whileCTempB > 100) {
          console.log('timeout');
          timeout = true;
          break;
        }
      }
      const obj = {
        teamA: v1,
        teamB: v2
      };
      // teamsA.splice(v1, 1);
      // teamsB.splice(v2, 1);
      // console.log(matchesCount)

      // console.log(teamsA, 'teamsA')
      // console.log(teamsB, 'teamsB')
      if (!timeout) {
        console.log(v1, v2);
        this.schedule.push(obj);
        cTemp++;
      }
      whileCTempA++;
      if (whileCTempA > 100) {
        break;
      }
    }
    console.log(this.schedule);
    this.dataService.savePreliminarySchedule(this.schedule);
  }

  stepBack() {
    this.undo.emit(3);
  }
  next() {
    // this.dataService.savePreliminaryConfig(this.preliminaryRound);
    this.done.emit(3);
  }

}
