import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Creature} from '../models/creature';
import {Endpoint} from './endpoint';

@Injectable()
export class CreaturesService extends Endpoint<Creature> {
  constructor( http: HttpClient ) {
    super( http, 'Creature', 'api/creatures');
  }
}
