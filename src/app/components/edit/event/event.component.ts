import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";
import {EditComponent} from "../edit.component";
import {UpdateService} from '../../../services/update.service';
import {EventsService} from "../../../services/events.service";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './event.component.html',
  styleUrls: ['../edit.components.scss']
})
export class EditEventComponent extends EditComponent implements OnInit  {
  @Input() item: Actor = new Actor();

  constructor(
      update: UpdateService,
      route: ActivatedRoute,
      private service: EventsService,
      private images: ImageService
    ) {
    super(update, route);
  }

  ngOnInit() {
    this
      .httpGet(this.service)
      .subscribe( x => this.item = x
        ? new Actor(x)
        : new Actor()
      );
  }

  public save() : void {
    this.httpPostWithImage(this.service, this.images, this.item);
  }
}
