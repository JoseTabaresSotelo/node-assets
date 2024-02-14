import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Customer from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-form-page',
  templateUrl: './customer-form-page.component.html',
  styleUrls: ['./customer-form-page.component.scss'],
})
export class CustomerFormPageComponent implements OnInit {
  customerForm!: FormGroup;
  customer?: Customer;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditPage();
    this.createCustomerAddForm();
  }

  isEditPage() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['customerId']) {
        this.getCustomerById(params['customerId']);
      }
    });
  }

  getCustomerById(id: number) {
    this.customerService.getById(id).subscribe((response) => {
      if (!response.success) return;
      this.customer = response.data;
      this.createCustomerEditForm();
    });
  }

  createCustomerEditForm() {
    this.customerForm = this.formBuilder.group({
      customerId: [this.customer?.customerId, Validators.required],
      companyName: [this.customer?.companyName, Validators.required],
      contactName: [this.customer?.contactName, Validators.required],
      contactTitle: [this.customer?.contactTitle, Validators.required],
      address: [this.customer?.address, Validators.required],
      city: [this.customer?.city, Validators.required],
      region: [this.customer?.region, Validators.required],
      postalCode: [this.customer?.postalCode, Validators.required],
      country: [this.customer?.country, Validators.required],
      phone: [this.customer?.phone, Validators.required],
      fax: [this.customer?.fax, Validators.required],
    });
  }

  createCustomerAddForm() {
    this.customerForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      companyName: ['', Validators.required],
      contactName: ['', Validators.required],
      contactTitle: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      fax: ['', Validators.required],
    });
  }

  add() {
    if (!this.customerForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let customer: Customer = { ...this.customerForm.value };
    this.customerService.add(customer).subscribe(
      (response) => {
        if (!response.success) return;
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'customers']);
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
    if (!this.customerForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let customerModule: Customer = {
      ...this.customer,
      ...this.customerForm.value,
    };
    this.customerService
      .edit(customerModule, this.customer?.customerId)
      .subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['admin', 'customers']);
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
    if (this.customer === undefined) return;
    if (!confirm('Are you sure to delete it?')) return;

    this.customerService.delete(this.customer).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'customers']);
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
