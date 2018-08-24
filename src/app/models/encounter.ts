import {Actor} from './actor';
import {Entity} from './entity';
import {Creature} from './creature';
import {Character} from "./character";
import {initSort, roundSort} from "../utils/sorting";

export class Encounter extends Entity {
  static icon = 'fa-gavel';
  public icon = Encounter.icon;
  public participants = [];
  public roundParticipants = [];
  public current: number;
  public round: number;

  constructor( fields: {
    id?: number,
    name?: string,
    participants?: Array<any>,
    current?: number,
    round?: number,
  } = {} ) {
    super(fields);
    this.current = fields.current || -1;
    this.round = fields.round || 0;
    this.participants = this.mapParticipants(fields);
    this.roundParticipants = this.participants;
  }

  private mapParticipants( fields ) : Actor[] {
      let typed: Actor[] = [];

      if ( !fields.hasOwnProperty('participants') )
        return typed;

      let participants = fields['participants'];
      for (let item of participants) {
        if (item.hasOwnProperty('player') )
          typed.push(new Character(item));
        else if (item.hasOwnProperty('hp') )
          typed.push( new Creature(item));
        else if (item.hasOwnProperty('description') )
          typed.push(new Actor(item));
        else
          console.log('not typed: ', item);
      }

      return typed;
  }

  public havePrevious() : boolean {
    return this.current > 0;
  }

  public haveNext() : boolean {
    return this.current < this.roundParticipants.length - 1;
  }

  public describeNext() : string {
    if ( !this.hasStarted() )
      return 'Start encounter';

    if ( !this.haveNext() )
      return 'Start new round';

    return 'Next turn';
  }

  public hasStarted() : boolean {
    return this.round > 0;
  }

  public start(initiative: {[id: number]: number }) : void {
    this.round = 1;
    let participants = this.participants.map(
      x => {
        x.init = initiative[x.id];
        return x;
      }
    );
    this.resetRoundParticipants(participants);
  }

  private resetRoundParticipants(actors: Actor[] ) {
    console.log( 'resetting participants: ', actors );
    this.roundParticipants = actors.map(
      x => {
        x.active = false;
        return x;
      }
    ).filter(
      x => x.canAct(this.round)
    ).sort( function(a, b) {
      return initSort(a, b);
    });

    this.current = 0;
    this.setActive(0, true);
  }

  public next () : void {
    this.adjustCurrent(+1);
  }

  public previous () : void {
    this.adjustCurrent(-1);
  }

  private adjustCurrent ( adjustment: number ) {
    if ( ! this.hasStarted() )
      return;

    console.log( 'looking for new actor, current: ', this.current );
    this.setActive( this.current, false);

    let done = false;
    let max = this.roundParticipants.length;
    while ( !done ) {
      this.current += adjustment;

      if ( this.current >= max ) {
        this.round++;
        this.resetRoundParticipants(this.participants);
        max = this.roundParticipants.length;
      }
      else if ( this.current < 0) {
        if ( this.round > 1 ) {
          this.current = max - 1;
          this.round--;
        }
        else {
          this.current = 0;
          break;
        }
      }

      console.log( `  -> checking current ${this.current} of ${max - 1}`);
      let latest = this.roundParticipants[this.current];
      done = latest.canAct(this.round) && latest.visible;
      this.setActive(this.current, done);
    }
    console.log( '==> active: ', this.roundParticipants[this.current].name );
  }


  public add ( actor: Actor ) : void {
    let exists = this.participants.findIndex( x => x.id === actor.id);

    if ( exists >= 0)
      return;

    this.participants.push(actor);
  }

  public remove( actor: Actor ) : void {
    console.log( 'removing: ', actor );
    let notActor = x => x.id !== actor.id;

    this.participants = this.participants
      .filter(x => notActor(x) );
    this.roundParticipants = this.roundParticipants
      .filter( x => notActor(x) );

    console.log( 'participants now: ', this.participants );
  }

  public getEvents() : Actor[] {
    return this.roundParticipants.filter(
      x => !(x instanceof Creature)
    ).sort( function(a,b) {
      return roundSort(a, b);
    });
  }

  public getCreatures() : Creature[] {
    return this.roundParticipants.filter(
      x => (x instanceof Creature)
    ).sort( function (a, b) {
      return initSort(a, b);
    });
  }

  private setActive( index: number, active: boolean ) {
    if ( index < 0 || index >= this.roundParticipants.length )
      return;

    this.roundParticipants[index].active = active;
  }

  public getType() : string {
    return 'encounter';
  }
}
