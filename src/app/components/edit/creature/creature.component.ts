import {Component, Input, OnInit} from '@angular/core';
import {Creature} from "../../../models/creature";
import {EditComponent} from "../edit.component";
import {UpdateService} from "../../../services/update.service";
import {ActivatedRoute} from "@angular/router";
import {CreaturesService} from "../../../services/creatures.service";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-edit-creature',
  templateUrl: './creature.component.html',
  styleUrls: ['../edit.components.scss']
})
export class EditCreatureComponent extends EditComponent implements OnInit {
  @Input() item: Creature = new Creature();

  constructor(
    update: UpdateService,
    route: ActivatedRoute,
    private service: CreaturesService,
    private images: ImageService
  ) {
    super(update, route);
  }

  ngOnInit() {
    this
      .httpGet( this.service )
      .subscribe( x => this.item = x
        ? new Creature(x)
        : new Creature()
    );
  }

  public save() : void {
    this.httpPostWithImage(this.service, this.images, this.item);
  }
}
