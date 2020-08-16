import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';



@Component({
  selector: 'app-groups-head',
  templateUrl: './groups-head.component.html',
  styleUrls: ['./groups-head.component.css']
})
export class GroupsHeadComponent implements OnInit {
  teams = [];
  preliminaryRound: any = {};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.teams = this.dataService.getTeams();
    this.preliminaryRound = this.dataService.getPreliminaryConfig();
  }

}
