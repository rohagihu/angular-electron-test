import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry.component';
import { IconsModule } from 'angular-bootstrap-md'
import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md'

import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [RegistryComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [RegistryComponent]
})
export class RegistryModule { }
