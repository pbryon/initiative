import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Creature } from '../models/creature';
import { Character } from '../models/character';
import { Injectable } from '@angular/core';
import { Actor } from '../models/actor';
import {Encounter} from '../models/encounter';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  private buildCreatures() : Creature[] {
    return [
      new Creature({
        name: 'Basilisk',
        hp: 30,
        ac: 15,
        initModifier: 2,
        image: { url: 'https://vignette.wikia.nocookie.net/forgottenrealms/images/2/25/Basilisk-5e.jpg/revision/latest?cb=20161119170756'}
      }),
      new Creature({
        name: 'Kobold',
        hp: 6,
        ac: 12,
        initModifier: -1,
        image: { url: 'https://vignette.wikia.nocookie.net/phaeselis/images/4/4c/PZO9031-KoboldShaman.jpg'}
      }),
      new Creature({
        name: 'Kobold chief',
        hp: 14,
        ac: 15,
        initModifier: 3,
        image: { url: 'https://orig00.deviantart.net/f66e/f/2012/030/5/9/venerable_jikook_of_bluerock__witness_of_214_moons_by_jamesjkrause-d4o4x5p.jpg'}
      }),
      new Creature({
        name: 'Dire Wolf',
        hp: 12,
        ac: 13,
        initModifier: 4,
        image: { url: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/16/484/1000/1000/636376300478361995.jpeg'}
      }),
      new Creature({
        name: 'Ogre',
        hp: 18,
        ac: 12,
        initModifier: 2,
        image: { url: 'https://vignette.wikia.nocookie.net/gems-of-war/images/8/81/Troop_Ogre.png/revision/latest/scale-to-width-down/1000?cb=20160128205020'}
      }),
      new Creature({
        name: 'Hobgoblin',
        hp: 14,
        ac: 15,
        initModifier: 1,
        image: { url: 'https://vignette.wikia.nocookie.net/eberron/images/0/02/82118.jpg/revision/latest/scale-to-width-down/300?cb=20080331185947'}
      })
    ];
  }

  private buildCharacters() : Character[] {
    return [
      new Character({
        name: 'Gothog',
        player: 'Ruben',
        hp: 12,
        ac: 17,
        initModifier: 3,
        image: { url: 'https://i.pinimg.com/originals/55/3a/df/553adf14108659b44c5e67642ce9cf5b.jpg'}
      }),
      new Character({
        name: 'Sylvan',
        player: 'Free',
        hp: 10,
        ac: 16,
        initModifier: 4,
        image: { url: 'https://i.pinimg.com/originals/31/46/01/314601d06dbc06b2c7c33cbc20dac94f.jpg'}
      }),
      new Character({
        name: 'Corillis',
        player: 'Maarten',
        hp: 8,
        ac: 15,
        initModifier: 2,
        image: { url: 'https://i.pinimg.com/originals/6b/63/2a/6b632ae283b1305dfb9fb301b23303f4.jpg'}
      }),
      new Character({
        name: 'Jean',
        player: 'Pieter V.',
        hp: 6,
        ac: 16,
        initModifier: 3,
        image: { url: 'https://i.pinimg.com/originals/89/8f/64/898f641fa152497ea989724e348994e8.png'}
      }),
    ];
  }

  private buildEvents() : Actor[] {
    return [
      new Actor({
        name: 'Cave-in',
        startingRound: 2,
        description: 'The entrance to the cave collapses, trapping all inside.',
        image: { url: 'https://artblart.files.wordpress.com/2012/08/osullivan-virginia-city-mine-cave-in-web.jpg' }
      }),
      new Actor({
        name: 'Earthquake',
        startingRound: 5,
        description: 'STR save DC 14 or be knocked prone.',
        image: { url: 'http://www.abc.net.au/news/image/9508832-3x2-700x467.jpg' }
      }),
      new Actor({
        name: 'Stampede',
        startingRound: 5,
        description: 'The cattle escapes. DEX save DC 14 or take 1d6 + 1 trampling damage.',
        image: { url: 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2016/11/14/104106169-GettyImages-888386-001r.530x298.jpg?v=1490031712' }
      }),
      new Actor({
       name: 'Barn on fire',
       startingRound: 2,
       description: "The barn is set on fire. Don't get too close to the edges!",
        image: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO-LaFzPL6BQywBuY4XqBn18wmIsF2BQPqMtuzkB1vWsZonOni' }
      }),

    ];
  }

  private buildEncounters( creatures: Creature[], characters: Character[], events: Actor[] ) : Encounter[] {
    let farm = new Encounter({ name: 'The farmhouse' });
    let cave = new Encounter({ name: 'The cave' });

    this.add( farm, creatures, 'Dire Wolf');
    this.add( farm, creatures, 'Ogre');
    this.add( farm, creatures, 'Hobgoblin');
    this.add( farm, events, 'Barn on fire');
    this.add( farm, events, 'Stampede');

    this.add( cave, creatures, 'Kobold');
    this.add( cave, creatures, 'Kobold chief');
    this.add( cave, creatures, 'Basilisk');
    this.add( cave, events, 'Cave-in');
    this.add( cave, events, 'Earthquake');

    for ( const character of characters ) {
      farm.add(character);
      cave.add(character);
    }

    return [ farm, cave ];
  }

  private add( encounter: Encounter, collection: Actor[], name: string ) {
    encounter.add(
      collection.find(
      x => x.name === name
      )
    );
  }

  createDb() {
    const creatures = this.buildCreatures();
    const characters = this.buildCharacters();
    const events = this.buildEvents();
    const encounters = this.buildEncounters(creatures, characters, events);

    let output = {creatures, characters, events, encounters};
    console.log( 'db contents:', output);
    return output;
  }
}
