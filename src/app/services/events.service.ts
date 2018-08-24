import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Actor} from '../models/actor';
import {Endpoint} from './endpoint';

@Injectable()
export class EventsService extends Endpoint<Actor> {
  constructor( http: HttpClient ) {
    super( http, 'Event', 'api/events');
  }
}
