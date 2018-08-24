import {Component, OnInit} from '@angular/core';
import {Entity} from './models/entity';
import {Creature} from './models/creature';
import {Character} from './models/character';
import {Actor} from './models/actor';
import {Encounter} from './models/encounter';
import {CharactersService} from './services/characters.service';
import {CreaturesService} from './services/creatures.service';
import {EncountersService} from './services/encounters.service';
import {EventsService} from './services/events.service';
import {Router, ActivatedRoute} from '@angular/router';
import {nameSort} from "./utils/sorting";
import {TrackerComponent} from "./components/tracker/tracker.component";
import {Observable} from "rxjs/Observable";
import {UpdateService} from "./services/update.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Initiative tracker';
  private menu: string = 'characters';
  public list: Entity[] = [];
  public example: Entity;
  private creatures: Creature[] = [];
  private characters: Character[] = [];
  private events: Actor[] = [];
  private encounters: Encounter[] = [];
  private tracker: TrackerComponent;
  private currentView: Component;

  constructor(
    private router: Router,
    private update: UpdateService,
    private charactersService: CharactersService,
    private creaturesService: CreaturesService,
    private eventsService: EventsService,
    private encountersService: EncountersService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.update.entity.subscribe(
      entity => this.onCreatedEntity(entity)
    );
  }

  ngOnInit() : void {
    this.loadDbResources();
  }

  private loadDbResources() {
    this.creaturesService
      .httpGetAll()
      .subscribe( creatures => {
        this.creatures = creatures.map( x => new Creature(x));
        this.setListAndSort( this.creatures );
      });
    this.charactersService
      .httpGetAll()
      .subscribe(
        characters => this.characters = characters.map(
          x => new Character(x)
        ));
    this.eventsService
      .httpGetAll()
      .subscribe( events => this.events = events.map(
        x => new Actor(x)
      ));
    this.encountersService
      .httpGetAll()
      .subscribe( encounters => this.encounters = encounters.map(
          x => new Encounter(x)
      ));
  }

  public icon(type: string ) : string {
    switch( type ) {
      case 'character':
        return Character.icon;
      case 'creature':
        return Creature.icon;
      case 'encounter':
        return Encounter.icon;
      case 'event':
        return Actor.icon;
    }
  }

  public setMenu(menu: string ) {
    this.menu = menu;
    switch (menu) {
      case 'characters':
        this.example = new Character();
        this.setListAndSort(this.characters);
        break;
      case 'creatures':
        this.example = new Character();
        this.setListAndSort(this.creatures);
        break;
      case 'events':
        this.example = new Actor();
        this.setListAndSort(this.events);
        break;
      case 'encounters':
        this.example = new Encounter();
        this.setListAndSort(this.encounters);
        break;
    }
  }

  private setListAndSort( list: Entity[] ) {
    this.list = list.sort( function(a, b) {
      return nameSort(a, b);
    });
  }

  public show ( menu: string ) : boolean {
    return this.menu === menu;
  }

  public onActivate( component: Component ) {
    this.currentView = component;
    if (component instanceof TrackerComponent) {
      this.tracker = component;
    }
  }

  public onAddActor( actor: Actor ) : void {
    // switch to tracker component if necessary, keeping the encounter intact
    if ( !(this.currentView instanceof TrackerComponent) ) {
      let encounter = this.tracker ? this.tracker.encounter : null;
      this.router.navigate(['/encounters'])
        .catch( err => console.log(err))
        .then( () => {
          this.tracker.encounter = encounter || this.tracker.encounter;
          this.tracker.addActor(actor);
        });
    }
    else {
      this.tracker.addActor(actor);
      console.log('tracker actors:', this.tracker.encounter.participants);
    }
  }

  public onCreatedEntity( entity: Entity ) : void {
    if ( entity.isCharacter() ) {
      this.addOrReplace( this.characters, entity );
    }
    else if ( entity.isCreature() ) {
      this.addOrReplace( this.creatures, entity );
    }
    else if ( entity.isEvent() ) {
      this.addOrReplace( this.events, entity );
    }
    else {
      this.addOrReplace( this.encounters, entity );
    }
  }

  private addOrReplace<T extends Entity>( collection: T[], entity: T ) : void {
    let index = collection.findIndex(
      x => x.id === entity.id
    );

    if ( index >= 0 )
      collection[index] = entity;
    else
      collection.push(entity);
  }

  public onRouteChange( url: string ) : void {
    this.router.navigate([url])
      .catch( err => console.log(err))
      .then( () => console.log( `changed url to ${url}`) );
  }
}
