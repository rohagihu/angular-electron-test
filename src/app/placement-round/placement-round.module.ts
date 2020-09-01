import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacementRoundRoutingModule } from './placement-round-routing.module' //<-- import
import { SharedModule } from '../shared/shared.module';
import { PlacementRoundComponent } from './placement-round.component';


@NgModule({
  declarations: [
    PlacementRoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlacementRoundRoutingModule
  ],
  exports: [PlacementRoundComponent]
})
export class PlacementRoundModule { }
