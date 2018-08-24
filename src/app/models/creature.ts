import {Actor} from './actor';

export class Creature extends Actor {
  static icon = 'fa-paw';
  public icon = Creature.icon;
  public hp: number;
  public ac: number;
  public currentHP: number;
  public initModifier: number;
  public init: number;

  public dead: boolean = false;
  public bleeding: boolean = false;

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
    init?: number,
    dead?: boolean,
    bleeding?: boolean,
    image?: {
      name?: string,
      id?: number,
      url?: string
    }
  } = {} ) {
    super(fields);
    this.hp = fields.hp;
    this.currentHP = fields.currentHP || this.hp;
    this.initModifier = fields.initModifier || 0;
    this.init = fields.init;
    this.ac = fields.ac || 10;
    this.dead = fields.dead || false;
    this.bleeding = fields.bleeding || false;
  }

  public adjustHP (amount: number ) : boolean {
    if ( amount === 0 )
      return false;

    let left = this.currentHP + amount;
    left = left > this.hp ? this.hp : left;
    left = left < 0       ? 0       : left;
    this.currentHP = left;

    this.checkWounds();

    return true;
  }

  public canAct( round: number ) : boolean {
    return round >= this.startingRound
      && !this.dead;
  }

  public describe () : string {
    const base = super.describe();
    this.checkWounds();

    if ( this.dead )
      return 'dead';

    if (this.bleeding)
      return 'bleeding';

    return base || 'healthy';
  }

  public describeInitMod() : string {
    let sign = this.initModifier > 0 ? '+' : '';
    return `${sign}${this.initModifier}`;
  }

  public checkWounds () : void {
    this.dead = this.currentHP === 0;
    this.bleeding = this.currentHP < this.hp / 2;
  }

  public getType() : string {
    return 'creature';
  }
}
