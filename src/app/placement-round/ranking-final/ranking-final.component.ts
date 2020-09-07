import { Component, OnInit, Input } from '@angular/core';
import { IRankingGroup, IRankingTeam } from '../../shared/interface'

@Component({
  selector: 'app-ranking-final',
  templateUrl: './ranking-final.component.html',
  styleUrls: ['./ranking-final.component.css']
})
export class RankingFinalComponent implements OnInit {

  @Input() placementRound: any;
  constructor() { }

  ngOnInit(): void {
  }

  // calc(rankingGroup, preliminaryRankingGroup) {
  calc() {
    console.log('final calc started')
    let sortBy = [{
      prop:'bigPointsWon',
      direction: -1
    },{
      prop:'smallPointsWon',
      direction: -1
    },{
      prop:'smallPointsLost',
      direction: 1
    }];

    this.placementRound.ranking.forEach((rankingGroup, preliminaryRankingGroup) => {
      rankingGroup.forEach(rankingTeam => {
        let teamID = rankingTeam.teamID;

        let bigPointsWon = 0;
        let bigPointsLost = 0;
        let smallPointsWon = 0;
        let smallPointsLost = 0;

        // console.log(rankingGroup.group)
        // let groupSchedule = this.placementRound.games.find(game => game.name === rankingGroup.group);
        // console.log(groupSchedule);
        let activeGames = this.placementRound.schedule.filter(game => (game.preliminaryRankingGroup === preliminaryRankingGroup) && (game.teamA === teamID || game.teamB === teamID));
        // console.log(activeGames)
        activeGames.forEach(game => {
          if (teamID === game.teamA) {
            bigPointsWon += game.bigPointsA;
            bigPointsLost += game.bigPointsB;
          } else {
            bigPointsWon += game.bigPointsB;
            bigPointsLost += game.bigPointsA;
          }

          game.game.forEach(subGame => {
            if (teamID === game.teamA) {
              smallPointsWon += subGame.pointsA;
              smallPointsLost += subGame.pointsB;
            } else {
              smallPointsWon += subGame.pointsB;
              smallPointsLost += subGame.pointsA;
            }
          })
        })

        rankingTeam.bigPointsWon = bigPointsWon;
        rankingTeam.bigPointsLost = bigPointsLost;
        rankingTeam.smallPointsWon = smallPointsWon;
        rankingTeam.smallPointsLost = smallPointsLost;
      })


      rankingGroup.sort( function(a: IRankingTeam, b: IRankingTeam) {
        let i = 0, result = 0;
        while(i < sortBy.length && result === 0) {
          result = sortBy[i].direction*(a[ sortBy[i].prop ] < b[ sortBy[i].prop ] ? -1 : (a[ sortBy[i].prop ] > b[ sortBy[i].prop ] ? 1 : 0));
          i++;
        }
        return result;
      })
    })

  };

}
