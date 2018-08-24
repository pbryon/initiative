import {Entity} from "./entity";

export class ActorImage extends Entity {
  public url; string = '';

  constructor( fields: {
    name?: string,
    id?: number,
    url?: string,
  } = {} ) {
    super(fields);
    this.url = fields.url;
    this.name = this.name || this.url;
  }

  public getType(): string {
    return 'image';
  }
}
