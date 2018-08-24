import {UpdateService} from "../../services/update.service";
import {ActivatedRoute} from "@angular/router";
import {Endpoint} from "../../services/endpoint";
import {Entity} from "../../models/entity";
import {Observable} from "rxjs/Observable";
import {Actor} from "../../models/actor";
import {ActorImage} from "../../models/actor-image";

export abstract class EditComponent {
  constructor(
    private update: UpdateService,
    private route: ActivatedRoute
  ) {}

  protected httpGet<T extends Entity>(service: Endpoint<T>) : Observable<T> {
    let id = + this.route.snapshot.paramMap.get('id');
    return service.httpGet(id);
  }

  protected httpPost<T extends Entity>(service: Endpoint<T>, entity: T) : void {
    this.postEntity(service, entity);

    this.update.emit(entity);
  }

  protected httpPostWithImage<T extends Actor>(service: Endpoint<T>, images: Endpoint<ActorImage>, entity: T) : void {
    this.postEntity(images, entity.image);
    this.postEntity(service, entity);

    this.update.emit(entity);
  }

  private postEntity<T extends Entity>(service: Endpoint<T>, entity: T) : void {
    const entityExists = this
      .httpGet(service)
      .subscribe( x => true );

    let operation = entityExists
    ? service.httpPut(entity)
    : service.httpPost(entity);

    operation.subscribe(
      x => console.log(`saved ${entity.getType()} '${entity.name}'`)
    );
  }
}
