import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MursComponent } from './murs.component';

describe('MursComponent', () => {
  let component: MursComponent;
  let fixture: ComponentFixture<MursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
