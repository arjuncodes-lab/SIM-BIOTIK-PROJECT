import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRouting } from './map-routing';

describe('MapRouting', () => {
  let component: MapRouting;
  let fixture: ComponentFixture<MapRouting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapRouting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapRouting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
