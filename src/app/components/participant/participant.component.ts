import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from '../../models/actor';
import {Character} from "../../models/character";
import {Creature} from "../../models/creature";
import {roundSort, initSort} from "../../utils/sorting";

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  @Input() participants: Actor[];
  @Input() selected: number;
  @Output() removed: EventEmitter<Actor> = new EventEmitter<Actor>();
  @Output() selectionChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() damaged: EventEmitter<Creature> = new EventEmitter<Creature>();

  constructor() { }

  public select(actor: Actor) : void {
    this.selectionChanged.emit(actor.id);
  }

  ngOnInit() {
    this.sortParticipants();
  }

  public sortParticipants() : Actor[] {
    if ( this.participants.length === 0 )
      return this.participants;

    let first = this.participants[0];
    if ( first.isEvent() )
      return this.sortByRound();
    else if ( first.isCreature() )
      return this.sortByInit();
  }

  public onRemoveItem(actor: Actor) : void {
    this.removed.emit(actor);
  }

  public onDamaged(actor: Creature): void {
    this.damaged.emit(actor);
  }

  private sortByRound() : Actor[] {
    return this.participants.sort(
      function(a, b) {
        return roundSort(a, b);
      }
    );
  }

  private sortByInit() : Actor[] {
    return this.participants.sort(
      function(a: Creature, b: Creature) {
        return initSort(a, b);
      }
    );
  }
}
