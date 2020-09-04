import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

import { IRankingGroup, IRankingTeam, IPlacementGroupScheduleItem } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  teamsAmount = 15;
  teamsGroups = 3;
  teams = [];

  // preliminaryRoundActive = true;
  // placementRoundActive = false;

  groupColors = ['red', 'cyan lighten-1', 'amber darken-2', 'green darken-3', 'indigo']

  preliminaryRound = {
    mode: 'byPoints',
    modeLabel: {
      'byTime': 'nach Zeit',
      'byPoints': 'nach Punkten'
    },
    sets: 2,
    setLimit: 15,
    duration: '12min',
    activeTwoPointsDifference: false,
    colors: this.groupColors,
    schedule: [],
    teamGroups: [],
    games: [],
    ranking: <IRankingGroup[]>[]
  };

  placementRound = {
    schedule: [],
    ranking: <IRankingTeam[]>[],
    colors: this.groupColors,
  }


  constructor(private http: HttpClient) { }

  init() {
    let arr = [
'Schrecksekunde',
'Schreckminute',
'Auszeit Storkow',
'ASV Senden',
'BSG Lexid',
'SV Elstertrebnitz',
'SV Hohenmölsen',
'Röthaer SV',
'Chamäleons',
'Sechser Pack',
'Skihasen',
'Mocca-Edel',
'FahrschulTeam Pfaff',
'SF Neukieritzsch',
'VSG Leipzig 2000'
    ];

    for (let i = 0; i < this.teamsAmount; i++) {
      this.teams.push({
        id: i,
        name: arr[i]
        // name: 'Team ' + String.fromCharCode(65 + i) + ' (' + String.fromCodePoint(0x1F604 + i) + ')'
      });
    }
  }

  getTeams() {
    return this.teams;
  }

  saveTeams(teams) {
    this.teams = teams;
  }

  getPreliminaryConfig() {
    return this.preliminaryRound;
  }

  savePreliminaryConfig(config) {
    this.preliminaryRound = config;
  }

  savePreliminarySchedule(schedule) {
    this.preliminaryRound.schedule = schedule;
  }

  getGames() {
    return this.preliminaryRound.games;
  }

  saveGames(games) {
    this.preliminaryRound.games = games;
  }

  savePreliminaryRanking(ranking) {
    this.preliminaryRound.ranking = ranking
  }

  getPlacementRound() {
    return this.placementRound;
  }


  savePlacementRound(placementRound) {
    this.placementRound = placementRound;
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }


// P1 - P3 spielen alle Endrundenspiele nur auf FeldA, FelbB oder FeldC
// P1 - P3 spielen an Pos 1,3,5
// P4 u. P5 verteilen ihre Spiele auf die restl. Lücken
  shufflePlacementSchedule() {
    let schedule: IPlacementGroupScheduleItem[] = [];

    // possible matches within the 5 groups of 3 teams
    const schemeOfGroupsMatches = [
      {
        teamA: 0,
        teamB: 1,
        referee: 2
      },
      {
        teamA: 1,
        teamB: 2,
        referee: 0
      },
      {
        teamA: 2,
        teamB: 0,
        referee: 1
      }
    ];
    const gameFields = ['A', 'B', 'C'];

    // Behandlung Vorrundenrankinggruppen 1-3
    const top3FieldDistribution = {
      'rank1': null,
      'rank2': null,
      'rank3': null
    }
    const matchPos = [0,2,4]; // this is the match position of the first 3 groups-matches

    let groupIndex = 0;
    for (let group in top3FieldDistribution) {
      let dicedField = null;

      while (
        !dicedField ||
        Object.values(top3FieldDistribution).some(el => el === dicedField)
      ) {
        dicedField = gameFields[Math.floor(Math.random() * 3)]
      }
      top3FieldDistribution[group] = dicedField // set random field for the first 3 group of teams
      const tempSchemeOfGroupsMatches = this.shuffleArray([...schemeOfGroupsMatches]); // shuffle the match scheme
      tempSchemeOfGroupsMatches.forEach((match, i) => {
        const obj: IPlacementGroupScheduleItem = {
          preliminaryRankingGroup: groupIndex,
          teamA: match.teamA,
          teamB: match.teamB,
          'referee': match.referee,
          game: [
            {
              pointsA: 0,
              pointsB: 0,
            },
            {
              pointsA: 0,
              pointsB: 0,
            }
          ],
          bigPointsA: 0,
          bigPointsB: 0,
          fieldName: dicedField,
          fieldPos: matchPos[i]
        };
        schedule.push(obj);
      });
      groupIndex++;
      // console.log(tempSchemeOfGroupsMatches, 'tempSchemeOfGroupsMatches')
    }
    // ENDE // Behandlung Vorrundenrankinggruppen 1-3
    // console.log(top3FieldDistribution, "top3FieldDistribution")


    // Behandlung Vorrundenrankinggruppen 4 und 5
    console.log(schedule)


    // const obj = {
    //   teamA: v1,
    //   teamB: v2,
    //   'referee': referee,
    //   game: [
    //     {
    //       pointsA: 0,
    //       pointsB: 0,
    //     },
    //     {
    //       pointsA: 0,
    //       pointsB: 0,
    //     }
    //   ],
    //   bigPointsA: 0,
    //   bigPointsB: 0
    // };

    // let obj: IPlacementGroupScheduleItem = {
    //   preliminaryRankingGroup: number;
    //   bigPointsA: number;
    //   bigPointsB: number;
    //   game: {
    //     pointsA: number;
    //     pointsB: number;
    //   }[];
    //   teamA: number;
    //   teamB: number;
    // }
  }


  initPlacementRound() {
    console.log('init placement round')
    const ranking = this.preliminaryRound.ranking;
    console.log(ranking)
    const groups = [];
    for (let i = 0; i < 5; i++) {
      const arr: IRankingTeam[] = [];
      let id = 0;
      ranking.forEach(group => {
        let team: IRankingTeam = group.teams[i];
        team = {
          ...team,
          teamID: id,
          bigPointsWon: 0,
          bigPointsLost: 0,
          smallPointsWon: 0,
          smallPointsLost: 0
        };
        arr.push(team);
        id++;
      })
      groups.push(arr);
    }
    this.placementRound.ranking = groups
    this.shufflePlacementSchedule();
    console.log(groups, "groups in placementround")
  }

  // getProgress() {
  //   return {
  //     'placementRoundActive': this.placementRoundActive,
  //     'preliminaryRoundActive': this.preliminaryRoundActive,
  //   }
  // }

  // startPlacementRound() {
  //   this.placementRoundActive = true;
  //   this.preliminaryRoundActive = false;
  // }

  getDB() {
    let val;
    this.http.get('http://localhost:3000/select').subscribe(data => val = data);
    return val;
    // this.http.get('http://localhost:3000/select').subscribe(data => console.log('data', data));
    // return this.http.get('http://localhost:3000/select');
  }
  saveDB() {
    console.log('post');
    // this.http.post<any>('http://localhost:3000/insert', JSON.stringify({ title: 'Angular POST Request Example'}))
    this.http.post<any>('http://localhost:3000/insert', {"title": "blatest"})
    .pipe(
      catchError(val => {
        of(`I caught: ${val}`);
        return throwError(val);
      })
    )
    .subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
    );
  }
}
