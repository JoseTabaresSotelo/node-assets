import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Supplier from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supplier-form-page',
  templateUrl: './supplier-form-page.component.html',
  styleUrls: ['./supplier-form-page.component.scss'],
})
export class SupplierFormPageComponent implements OnInit {
  supplierForm!: FormGroup;
  supplier?: Supplier;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditPage();
    this.createSupplierAddForm();
  }

  isEditPage() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['supplierId']) {
        this.getSupplierById(params['supplierId']);
      }
    });
  }

  getSupplierById(id: number) {
    this.supplierService.getById(id).subscribe((response) => {
      if (!response.success) return;
      this.supplier = response.data;
      this.createSupplierEditForm();
    });
  }

  createSupplierEditForm() {
    this.supplierForm = this.formBuilder.group({
      companyName: [this.supplier?.companyName, Validators.required],
      contactName: [this.supplier?.contactName, Validators.required],
      contactTitle: [this.supplier?.contactTitle, Validators.required],
      quanAddresstityPerUnit: [this.supplier?.address, Validators.required],
      city: [this.supplier?.city, Validators.required],
      region: [this.supplier?.region, Validators.required],
      postalCode: [this.supplier?.postalCode, Validators.required],
      phone: [this.supplier?.phone, Validators.required],
      fax: [this.supplier?.fax, Validators.required],
      homePage: [this.supplier?.homePage, Validators.required],
    });
  }

  createSupplierAddForm() {
    this.supplierForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      contactName: ['', Validators.required],
      contactTitle: ['', Validators.required],
      quanAddresstityPerUnit: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', Validators.required],
      fax: ['', Validators.required],
      homePage: ['', Validators.required],
    });
  }

  add() {
    if (!this.supplierForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let supplier: Supplier = { ...this.supplierForm.value };
    this.supplierService.add(supplier).subscribe(
      (response) => {
        if (!response.success) return;
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'suppliers']);
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
    if (!this.supplierForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let supplierModule: Supplier = {
      ...this.supplier,
      ...this.supplierForm.value,
    };
    this.supplierService.edit(supplierModule).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'suppliers']);
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

    let supplierModule: Supplier = {
      ...this.supplier,
      ...this.supplierForm.value,
    };
    this.supplierService.delete(supplierModule).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'suppliers']);
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
