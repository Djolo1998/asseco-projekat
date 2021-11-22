import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitTransactionDialogComponent } from './split-transaction-dialog.component';

describe('SplitTransactionDialogComponent', () => {
  let component: SplitTransactionDialogComponent;
  let fixture: ComponentFixture<SplitTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitTransactionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
