import {Creature} from './creature';

export class Character extends Creature {
  static icon = 'fa-child';
  public player: string;
  public icon = Character.icon;

  constructor( fields: {
    id?: number,
    name?: string,
    startingRound?: number,
    active?: boolean,
    visible?: boolean,
    hp?: number,
    currentHP?: number,
    ac?: number,
    initModifier?: number,
    dead?: boolean,
    bleeding?: boolean,
    player?: string,
    image?: {
      name?: string,
      id?: number,
      url?: string
    }
  } = {} ) {
    super(fields);
    this.player = fields.player;
  }

  public getType() : string {
    return 'character';
  }
}
