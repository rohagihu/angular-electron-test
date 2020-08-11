import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-part03-summary',
  templateUrl: './part03-summary.component.html',
  styleUrls: ['./part03-summary.component.css']
})
export class Part03SummaryComponent implements OnInit {

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
    this.undo.emit(3)
  }
  next() {
    this.dataService.savePreliminaryConfig(this.preliminaryRound);
    this.done.emit(2)
  }

}
