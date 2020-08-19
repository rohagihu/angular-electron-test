import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  preliminaryRound: any = {};

  games: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.games = this.dataService.getGames();
    this.preliminaryRound = this.dataService.getPreliminaryConfig();
  }

  get test() {
    let bigPoints0 = 0;
    this.games[0].schedule.filter(game => game.teamA === 0 || game.teamB === 0).forEach(game => {
      if (game.teamA === 0) {
        bigPoints0 += game.bigPointsA;
      } else {
        bigPoints0 += game.bigPointsB;
      }
    });
    return 'Team0: ' + bigPoints0;
  }

}
