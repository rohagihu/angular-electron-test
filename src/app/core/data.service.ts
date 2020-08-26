import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  teamsAmount = 15;
  teamsGroups = 3;
  teams = [];
  // teamGroups = [];

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
    colors: ['red', 'cyan lighten-1', 'amber darken-2', 'green darken-3', 'indigo'],
    schedule: [],
    teamGroups: [],
    games: []
  };



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
