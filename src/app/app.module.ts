import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ItemsState } from './store/items.state';

import { RegistryModule } from './registry/registry.module';
import { NgxsTestComponent } from './ngxs-test/ngxs-test.component';

@NgModule({
  declarations: [
    AppComponent,
    NgxsTestComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([ItemsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    RegistryModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
