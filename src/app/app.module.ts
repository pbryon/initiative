import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import {RoutingModule} from './routing/routing.module';
import {InMemoryDataService} from './services/in-memory-data.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CharactersService} from './services/characters.service';
import {CreaturesService} from './services/creatures.service';
import {EventsService} from './services/events.service';
import {EncountersService} from './services/encounters.service';
import { ListComponent } from './components/list/list.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InitiativeComponent } from './components/initiative/initiative.component';
import { UpdateService } from './services/update.service';
import { EditEventComponent } from './components/edit/event/event.component';
import { EditCreatureComponent } from './components/edit/creature/creature.component';
import { EditCharacterComponent } from './components/edit/character/character.component';
import { ImageService } from './services/image.service';

@NgModule({
  declarations: [
    AppComponent,
    TrackerComponent,
    ListComponent,
    ParticipantComponent,
    ToolbarComponent,
    InitiativeComponent,
    EditEventComponent,
    EditCreatureComponent,
    EditCharacterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    RoutingModule
  ],
  providers: [Location, CharactersService, CreaturesService, EventsService, EncountersService, UpdateService, ImageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
