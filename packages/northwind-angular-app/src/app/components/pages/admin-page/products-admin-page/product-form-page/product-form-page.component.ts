import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import Product from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form-page',
  templateUrl: './product-form-page.component.html',
  styleUrls: ['./product-form-page.component.scss'],
})
export class ProductFormPageComponent implements OnInit {
  productForm!: FormGroup;
  product?: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditPage();
    this.createProductAddForm();
  }

  isEditPage() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['productId']) {
        this.getProductById(params['productId']);
      }
    });
  }

  getProductById(id: number) {
    this.productService.getById(id).subscribe((response) => {
      if (!response.success) return;
      this.product = response.data;
      this.createProductEditForm();
    });
  }

  createProductEditForm() {
    this.productForm = this.formBuilder.group({
      oroductName: [this.product?.productName, Validators.required],
      supplierId: [this.product?.supplierId, Validators.required],
      categoryId: [this.product?.categoryId, Validators.required],
      quantityPerUnit: [this.product?.quantityPerUnit, Validators.required],
      unitPrice: [this.product?.unitPrice, Validators.required],
      unitsInStock: [this.product?.unitsInStock, Validators.required],
      unitsOnOrder: [this.product?.unitsOnOrder, Validators.required],
      reorderLevel: [this.product?.reorderLevel, Validators.required],
      discontinued: [this.product?.discontinued, Validators.required],
    });
  }

  createProductAddForm() {
    this.productForm = this.formBuilder.group({
      oroductName: ['', Validators.required],
      supplierId: ['', Validators.required],
      categoryId: ['', Validators.required],
      quantityPerUnit: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      unitsOnOrder: ['', Validators.required],
      reorderLevel: ['', Validators.required],
      discontinued: [false, Validators.required],
    });
  }

  add() {
    if (!this.productForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let product: Product = { ...this.productForm.value };
    this.productService.add(product).subscribe(
      (response) => {
        if (!response.success) return;
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'products']);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          responseError.error.Errors.forEach((error: any) => {
            this.toastrService.error(error.ErrorMessage);
          });
        }
      }
    );
  }

  edit() {
    if (!this.productForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let productModule: Product = { ...this.product, ...this.productForm.value };
    this.productService.edit(productModule).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'products']);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          responseError.error.Errors.forEach((error: any) => {
            this.toastrService.error(error.ErrorMessage);
          });
        }
      }
    );
  }

  delete_() {
    if (!confirm('Are you sure to delete it?')) return;

    let productModule: Product = { ...this.product, ...this.productForm.value };
    this.productService.delete(productModule).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'products']);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          responseError.error.Errors.forEach((error: any) => {
            this.toastrService.error(error.ErrorMessage);
          });
        }
      }
    );
  }
}
