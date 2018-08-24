import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Entity} from "../models/entity";

@Injectable()
export class UpdateService {
  private entitySource = new Subject<Entity>();
  public entity = this.entitySource.asObservable();

  public emit(change: Entity) : void {
    this.entitySource.next(change);
  }
}
