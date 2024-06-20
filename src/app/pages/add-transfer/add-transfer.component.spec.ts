import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransferComponent } from './add-transfer.component';

describe('AddTransferComponent', () => {
  let component: AddTransferComponent;
  let fixture: ComponentFixture<AddTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTransferComponent]
    });
    fixture = TestBed.createComponent(AddTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
