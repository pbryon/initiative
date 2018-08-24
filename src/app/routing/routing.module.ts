import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { TrackerComponent } from '../components/tracker/tracker.component';
import {AppComponent} from "../app.component";
import {EditEventComponent} from "../components/edit/event/event.component";
import {EditCreatureComponent} from "../components/edit/creature/creature.component";
import {EditCharacterComponent} from '../components/edit/character/character.component';

const routes: Routes = [
  { path: '', redirectTo: '/encounters', pathMatch: 'full' },
  { path: 'encounters', component: TrackerComponent },
  { path: 'encounters/clear', redirectTo: '/encounters', pathMatch: 'full' },
  { path: 'encounters/:id', component: TrackerComponent },
  { path: 'events', component: EditEventComponent },
  { path: 'events/:id', component: EditEventComponent },
  { path: 'creatures', component: EditCreatureComponent },
  { path: 'creatures/:id', component: EditCreatureComponent },
  { path: 'characters', component: EditCharacterComponent },
  { path: 'characters/:id', component: EditCharacterComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})
export class RoutingModule { }
