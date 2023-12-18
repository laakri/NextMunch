import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoSettingsComponent } from './resto-settings.component';

describe('RestoSettingsComponent', () => {
  let component: RestoSettingsComponent;
  let fixture: ComponentFixture<RestoSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoSettingsComponent]
    });
    fixture = TestBed.createComponent(RestoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
