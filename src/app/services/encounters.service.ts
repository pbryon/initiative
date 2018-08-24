import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Encounter} from '../models/encounter';
import {Endpoint} from './endpoint';

@Injectable()
export class EncountersService extends Endpoint<Encounter> {
  constructor( http: HttpClient ) {
    super( http, 'Encounter', 'api/encounters');
  }
}
