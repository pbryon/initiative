import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Character} from '../models/character';
import {Endpoint} from './endpoint';

@Injectable()
export class CharactersService extends Endpoint<Character> {
  constructor( http: HttpClient ) {
    super(http, 'Character', 'api/characters');
  }
}
