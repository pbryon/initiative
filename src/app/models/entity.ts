export abstract class Entity {
  protected static currentId: number = 1;
  public id: number;
  public name: string;

  constructor( fields: {
    id?: number,
    name?: string,
  } = {} ) {
    this.name = fields.name || 'untitled';
    this.id = fields.id || Entity.currentId++;
  }

  abstract getType() : string;

  public getUrl( withId: boolean ) : string {
    let baseUrl = `${this.getType()}s`;
    return withId
      ? baseUrl + `/${this.id}`
      : baseUrl;
  }

  public isEvent() : boolean {
    return this.hasOwnProperty('description')
      && ! this.isCreature();
  }

  public isCreature() : boolean {
    return this.hasOwnProperty('hp');
  }

  public isCharacter() : boolean {
    return this.hasOwnProperty('player');
  }
}
