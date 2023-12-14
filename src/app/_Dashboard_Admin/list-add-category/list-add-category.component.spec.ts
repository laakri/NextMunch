import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddCategoryComponent } from './list-add-category.component';

describe('ListAddCategoryComponent', () => {
  let component: ListAddCategoryComponent;
  let fixture: ComponentFixture<ListAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAddCategoryComponent]
    });
    fixture = TestBed.createComponent(ListAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
