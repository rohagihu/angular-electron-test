import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { NavRoutingModule } from './nav-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    SharedModule,
    NavRoutingModule
  ],
  exports: [NavComponent]
})
export class NavModule { }
