import { Injectable } from '@angular/core';
import {ActorImage} from "../models/actor-image";
import {Endpoint} from "./endpoint";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ImageService extends Endpoint<ActorImage> {

  constructor( http: HttpClient) {
    super(http, 'Image', 'api/images');
  }

}
