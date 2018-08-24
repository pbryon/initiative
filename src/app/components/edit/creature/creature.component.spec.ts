import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreatureComponent } from './creature.component';

describe('EditCreatureComponent', () => {
  let component: EditCreatureComponent;
  let fixture: ComponentFixture<EditCreatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCreatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
