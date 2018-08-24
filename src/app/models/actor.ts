import {Entity} from './entity';
import {ActorImage} from "./actor-image";

export class Actor extends Entity {
  static icon = 'fa-clock';
  public icon: string = Actor.icon;
  public startingRound: number;
  public visible: boolean;
  public active: boolean;
  public description: string;
  public image: ActorImage = new ActorImage();

  constructor( fields: {
    id?: number,
    name?: string,
    startingRound?: number,
    visible?: boolean,
    active?: boolean,
    description?: string,
    image?: {
      name?: string,
      id?: number,
      url?: string
    }
  } = {} ) {
    super(fields);
    this.description = fields.description;
    this.startingRound = fields.startingRound || -1;
    this.visible = fields.visible || true;
    this.active = fields.active || false;
    this.image = new ActorImage(fields.image );
  }

  public canAct( round: number ) : boolean {
    return round === this.startingRound;
  }

  public describe() : string {
    return this.visible ? '' : 'invisible';
  }

  public describeInitMod() : string {
    return '';
  }

  public getType() : string {
    return 'event';
  }
}
