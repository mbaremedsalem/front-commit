import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageArticlesComponent } from './page-articles.component';

describe('PageArticlesComponent', () => {
  let component: PageArticlesComponent;
  let fixture: ComponentFixture<PageArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageArticlesComponent]
    });
    fixture = TestBed.createComponent(PageArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
