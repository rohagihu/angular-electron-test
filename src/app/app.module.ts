import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ItemsState } from './store/items.state';

import { RegistryModule } from './registry/registry.module';
import { NgxsTestComponent } from './ngxs-test/ngxs-test.component';

import { DataService } from './core/data.service';


export function appInit(dataService: DataService): any {
  return () => dataService.init();
}


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
    RegistryModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [DataService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
