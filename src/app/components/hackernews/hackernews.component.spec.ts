import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackernewsComponent } from './hackernews.component';

describe('HackernewsComponent', () => {
  let component: HackernewsComponent;
  let fixture: ComponentFixture<HackernewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackernewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackernewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
