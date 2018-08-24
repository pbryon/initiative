import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Encounter} from '../../models/encounter';
import {ActivatedRoute, Router} from '@angular/router';
import {EncountersService} from '../../services/encounters.service';
import {Actor} from "../../models/actor";
import {Creature} from "../../models/creature";
import {Entity} from "../../models/entity";
import {UpdateService} from "../../services/update.service";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  @Input() encounter: Encounter = new Encounter();
  @Output() createdEncounter: EventEmitter<Encounter> = new EventEmitter<Encounter>();
  public selected: number = -1;
  public save: boolean = false;
  public rollInit: boolean = false;

  constructor(
    private update: UpdateService,
    private route: ActivatedRoute,
    private router: Router,
    private service: EncountersService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.service
      .httpGet(id)
      .subscribe(encounter => {
        if (encounter) {
          this.encounter = new Encounter(encounter);
          console.log('loaded encounter: ', this.encounter);
        }
      });
  }

  public clearEncounter() : void {
    this.router.navigateByUrl('/encounters/clear');
  }

  public addActor( actor: Actor ) : void {
    this.encounter.add(actor);
  }

  public nextActor() : void {
    this.encounter.next();
    this.rollInit = !this.encounter.hasStarted();
  }

  public previousActor() : void {
    this.encounter.previous();
  }

  public getEvents() : Actor[] {
    return this.encounter.getEvents();
  }

  public getCreatures() : Creature[] {
    return this.encounter.getCreatures();
  }

  public firstRoundActors() : Creature [] {
    return this.getCreatures().filter(
      x => x.canAct(1)
    );
  }

  public toggleSave() {
    this.save = !this.save;
  }

  public saveEncounter() : void {
    if ( ! this.save )
      return;

    let exists = this.service
      .httpGet(this.encounter.id)
      .subscribe( _ => true );

    let msg = `saved encounter: ${this.encounter.name}`;

    let operation = exists
      ? this.service.httpPut(this.encounter)
      : this.service.httpPost(this.encounter);

    operation.subscribe( encounter => console.log(msg));

    this.update.emit(this.encounter);
    this.save = false;
  }

  public onInitiativeRolled( initiative: { [id: number]: number }) : void {
    this.encounter.start(initiative);
    this.rollInit = false;
  }

  public onActorDamage( actor: Creature ) : void {
    this.adjustWounds( this.encounter.participants, actor );
    this.adjustWounds( this.encounter.roundParticipants, actor );
  }

  private adjustWounds( list: Entity[], actor: Creature ) {
    let ours = list.find(
      x => x.id === actor.id
    );
    if ( !(ours instanceof Creature ))
      return;

    ours.currentHP = actor.currentHP;
    ours.checkWounds();
  }

  public onItemRemoved( actor: Actor ) : void {
    this.encounter.remove(actor);
  }

  public onSelectionChanged( selected: number ) {
    if ( this.selected === selected )
      this.selected = -1;
    else
      this.selected = selected;
  }
}
