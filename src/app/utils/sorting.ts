import {Actor} from '../models/actor';
import {Creature} from '../models/creature';
import {Character} from '../models/character';
import {Entity} from "../models/entity";

export function nameSort( a: Entity, b: Entity ) : number {
  if(a.name < b.name) return -1;
  if(a.name > b.name) return 1;
  return 0;
}

export function initSort( a: Actor, b: Actor ) : number {
  let aCreature = a instanceof Creature;
  let bCreature = b instanceof Creature;

  // two Events should be compared by startingRound:
  if ( !aCreature && aCreature === bCreature )
    return roundSort( a, b);

  // Events come before Creatures:
  if ( aCreature !== bCreature )
    return aCreature ? 1 : -1;

  if ( a instanceof Creature && b instanceof Creature ) {
    if (a.init !== b.init)
      return b.init - a.init;

    if (a.initModifier !== b.initModifier)
      return b.initModifier - a.initModifier;

    return nameSort(a, b);
  }
}

export function roundSort( a: Actor, b: Actor ) : number {
  return a.startingRound - b.startingRound;
}
