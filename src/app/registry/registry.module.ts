import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry.component';

import { SharedModule } from '../shared/shared.module';
import { Part01TeamsComponent } from './part01-teams/part01-teams.component';
import { Part02RulesComponent } from './part02-rules/part02-rules.component';
import { Part03SummaryComponent } from './part03-summary/part03-summary.component';

@NgModule({
  declarations: [RegistryComponent, Part01TeamsComponent, Part02RulesComponent, Part03SummaryComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [RegistryComponent]
})
export class RegistryModule { }
