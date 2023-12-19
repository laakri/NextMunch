import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-list-add-category',
  templateUrl: './list-add-category.component.html',
  styleUrls: ['./list-add-category.component.css']
})
export class ListAddCategoryComponent {
  categoryForm: FormGroup ;

  constructor(private fb: FormBuilder, private categoryService: CategorieService) {
    this.categoryForm = this.fb.group({
      nameCat: ['', Validators.required],
      imgCat: [null, Validators.required] // For file input, set initial value to null
    });
  }
  categories: Categorie[] = []; 
  categSelected : boolean = false ;
  onCategoryClick(category: Categorie) {
    this.categSelected =true;
    category.isSelected = !category.isSelected;
  }

  ngOnInit(): void {
    this.categoryService.getCategoryListUpdatedObservable().subscribe(() => {
      this.loadCategories();
    });

    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
        
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.categoryForm.patchValue({
      imgCat: file
    });
    this.categoryForm.get('imgCat')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append('nameCat', this.categoryForm.get('nameCat')?.value);
      formData.append('imgCat', this.categoryForm.get('imgCat')?.value);

      this.categoryService.addCategory(formData).subscribe(
        () => {
          console.log('Category added successfully');
          // Note: No need to refresh here; it will be handled by the observable
          // this.categoryForm.reset();
        },
        (error) => {
          console.error('Error adding category', error);
        }
      );
    }
  }

  onDeleteSelectedCategories() {
    const selectedCategoryIds = this.categories
      .filter(category => category.isSelected)
      .map(category => category._id); 
  
    if (selectedCategoryIds.length > 0) {
      this.categoryService.deleteSelectedCategories(selectedCategoryIds).subscribe(
        () => {
          console.log('Selected categories deleted successfully');
          // Optionally, you can refresh the list of categories after deletion
          this.loadCategories();
          this.categSelected=false;
        },
        (error) => {
          console.error('Error deleting selected categories', error);
        }
      );
    } else {
      console.log('No categories selected for deletion');
    }
  }
  anyCategorySelected(): boolean {
    return this.categories.some(category => category.isSelected);
  }
}
