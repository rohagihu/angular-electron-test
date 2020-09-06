import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacementRoundRoutingModule } from './placement-round-routing.module' //<-- import
import { SharedModule } from '../shared/shared.module';
import { PlacementRoundComponent } from './placement-round.component';
import { InitComponent } from './init/init.component';
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  declarations: [
    PlacementRoundComponent,
    InitComponent,
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlacementRoundRoutingModule
  ],
  exports: [PlacementRoundComponent]
})
export class PlacementRoundModule { }
