import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-part04-summary',
  templateUrl: './part04-summary.component.html',
  styleUrls: ['./part04-summary.component.css']
})
export class Part04SummaryComponent implements OnInit {

  teams = [];
  preliminaryRound: any = {};

  groupA = [];
  groupB = [];
  groupC = [];

  @Output() done = new EventEmitter<number>();
  @Output() undo = new EventEmitter<number>();

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.teams = this.dataService.getTeams();
    this.preliminaryRound = this.dataService.getPreliminaryConfig();
  }

  stepBack() {
    this.undo.emit(4);
  }


  setTeams() {
    for (let i = 0; i <= 4; i++) {
      const obj = {
        team: this.teams[i]
      };
      this.groupA.push(obj);
    }
    for (let i = 5; i <= 9; i++) {
      const obj = {
        team: this.teams[i]
      };
      this.groupB.push(obj);
    }
    for (let i = 10; i <= 14; i++) {
      const obj = {
        team: this.teams[i]
      };
      this.groupC.push(obj);
    }

    this.preliminaryRound.teamGroups.push(
      {
        name: 'A',
        teams: this.groupA
      },
      {
        name: 'B',
        teams: this.groupB
      },
      {
        name: 'C',
        teams: this.groupC
      }
    );
    // console.log(this.preliminaryRound);
  }


  next() {
    this.setTeams();
    this.dataService.savePreliminaryConfig(this.preliminaryRound);
    this.router.navigate(['preliminaryround']);
  }
}
