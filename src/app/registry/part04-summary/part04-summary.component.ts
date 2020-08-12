import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-part04-summary',
  templateUrl: './part04-summary.component.html',
  styleUrls: ['./part04-summary.component.css']
})
export class Part04SummaryComponent implements OnInit {

  teams = [];
  preliminaryRound: any = {};

  @Output() done = new EventEmitter<number>();
  @Output() undo = new EventEmitter<number>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.teams = this.dataService.getTeams();
    this.preliminaryRound = this.dataService.getPreliminaryConfig();
  }

  stepBack() {
    this.undo.emit(4);
  }
  next() {
    this.dataService.savePreliminaryConfig(this.preliminaryRound);
    // this.done.emit(2);
  }

}
