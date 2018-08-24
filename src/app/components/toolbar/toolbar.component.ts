import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../models/actor";
import {Creature} from "../../models/creature";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() actor: Actor;
  @Output() deleted: EventEmitter<Actor> = new EventEmitter<Actor>();
  @Output() damaged: EventEmitter<Creature> = new EventEmitter<Creature>();
  public delete; boolean;
  public amount: number = 0;
  constructor() { }

  ngOnInit() {
  }

  public maxHP( factor: number ) : number {
    if ( !(this.actor instanceof Creature) )
      return 0;

    return factor * this.actor.hp;
  }

  public applyDamage() : void {
    if ( !(this.actor instanceof Creature) )
      return;
    this.actor.adjustHP(this.amount);
    this.damaged.emit(this.actor);
    this.amount = 0;
  }

  public toggleInvisible(value?: boolean) : void {
    this.actor.visible = value || !this.actor.visible;
  }

  public toggleDelete( value?: boolean) : void {
    this.delete = value || !this.delete;
  }

  public removeItem() : void {
    this.deleted.emit(this.actor);
  }
}
