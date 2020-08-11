import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
  providers: []
})
export class RegistryComponent implements OnInit {

  registrySteps = {
    part1: true,
    part2: false,
    part3: false
  }

  constructor(
  ) {

  }

  ngOnInit(): void {
  }

  next(currentPart) {
    this.registrySteps['part'+currentPart] = false;
    this.registrySteps['part'+(currentPart+1)] = true;
  }

  before(currentPart) {
    this.registrySteps['part'+currentPart] = false;
    this.registrySteps['part'+(currentPart-1)] = true;
  }

  finish(foo) {}

}
