import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePollingSessionsComponent } from './live-polling-sessions.component';

describe('LivePollingSessionsComponent', () => {
  let component: LivePollingSessionsComponent;
  let fixture: ComponentFixture<LivePollingSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivePollingSessionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LivePollingSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
