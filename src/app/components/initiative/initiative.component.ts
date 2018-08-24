import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Creature} from "../../models/creature";

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.scss']
})
export class InitiativeComponent {
  @Input() actors: Creature[] = [];
  @Input() round: number;
  @Output() initiative: EventEmitter<{ [id: number]: number }> = new EventEmitter <{ [id: number]: number }>();
  public values: { [id: number]: number } = {};
  public error: string = '';

  constructor() { }

  public rollFor( actor: Creature ) : void {
    this.values[actor.id] = this.rollD20(actor.initModifier);
  }

  public rollAll() : void {
    for ( let actor of this.actors ) {
      this.rollFor(actor);
    }
  }

  private rollD20 (modifier: number ) : number {
    let d20 = Math.floor(Math.random() * (20) + 1);
    return d20 + modifier;
  }

  public submit() : void {
    if ( Object.keys(this.values).length !== this.actors.length ) {
      this.error = 'Please fill in or roll initiative for all actors!';
      return;
    }

    this.error = '';
    this.initiative.emit(this.values);
  }
}
