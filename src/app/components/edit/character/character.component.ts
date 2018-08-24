import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../../models/character";
import {UpdateService} from '../../../services/update.service';
import {EditComponent} from "../edit.component";
import {ActivatedRoute} from '@angular/router';
import {CharactersService} from "../../../services/characters.service";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-edit-character',
  templateUrl: './character.component.html',
  styleUrls: ['../edit.components.scss']
})
export class EditCharacterComponent extends EditComponent implements OnInit {
  @Input() item: Character = new Character();

  constructor(
    update: UpdateService,
    route: ActivatedRoute,
    private service: CharactersService,
    private images: ImageService,
  ) {
    super(update, route);
  }

  ngOnInit() {
    this
      .httpGet(this.service)
      .subscribe( x => this.item = x
        ? new Character(x)
        : new Character()
    );
  }

  public save() : void {
    this.httpPostWithImage(this.service, this.images, this.item);
  }
}
