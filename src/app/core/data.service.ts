import { Injectable } from '@angular/core';

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
    teamGroups: []
  };



  constructor() { }

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
    ]
    for (let i = 0; i < this.teamsAmount; i++) {
      this.teams.push({
        id: i,
        name: arr[i]
        // name: 'Team ' + String.fromCharCode(65 + i) + ' (' + String.fromCodePoint(0x1F604 + i) + ')'
      })
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
}
