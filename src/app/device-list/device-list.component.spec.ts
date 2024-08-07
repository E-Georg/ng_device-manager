import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicelistComponent } from './device-list.component';

describe('DevicelistComponent', () => {
  let component: DevicelistComponent;
  let fixture: ComponentFixture<DevicelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicelistComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DevicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
