import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entity} from "../../models/entity";
import {Encounter} from "../../models/encounter";
import {Router} from "@angular/router";
import {Actor} from "../../models/actor";
import {Creature} from "../../models/creature";
import {Character} from "../../models/character";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() items: Entity[] = [];
  @Output() public changeRoute: EventEmitter<string> = new EventEmitter<string>();
  @Output() public addActor: EventEmitter<Actor> = new EventEmitter<Actor>();

  constructor(private router: Router) { }

  ngOnInit() {

  }

  public addText() : string {
    let first = this.items[0];
    return first ? `Add a new ${first.getType()}` : '';
  }
  public onCreateNew() : void {
    this.changeRoute.emit( this.items[0].getUrl(false) );
  }

  public onRowClick( item: Entity ) : void {
    if ( item instanceof Encounter )
      this.changeRoute.emit( item.getUrl(true) );
    else if ( item instanceof Actor )
      this.addActor.emit(item);
  }

  public onEditClick( item: Entity ) : void {
    this.changeRoute.emit( item.getUrl(true) );
  }
}
