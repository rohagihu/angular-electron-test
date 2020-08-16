import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  // { path: 'heroes', component: HeroesComponent }
  {
    path: 'registry',
    loadChildren: () => import('./registry/registry.module').then(m => m.RegistryModule)
  },
  {
    path: 'preliminaryround',
    loadChildren: () => import('./preliminary-round/preliminary-round.module').then(m => m.PreliminaryRoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
