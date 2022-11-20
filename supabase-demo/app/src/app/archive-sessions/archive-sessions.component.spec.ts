import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveSessionsComponent } from './archive-sessions.component';

describe('ArchiveSessionsComponent', () => {
  let component: ArchiveSessionsComponent;
  let fixture: ComponentFixture<ArchiveSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchiveSessionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
