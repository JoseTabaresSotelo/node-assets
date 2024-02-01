import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Order from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-form-page',
  templateUrl: './order-form-page.component.html',
  styleUrls: ['./order-form-page.component.scss'],
})
export class OrderFormPageComponent implements OnInit {
  orderForm!: FormGroup;
  order?: Order;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditPage();
    this.createOrderAddForm();
  }

  isEditPage() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['orderId']) {
        this.getOrderById(params['orderId']);
      }
    });
  }

  getOrderById(id: number) {
    this.orderService.getById(id).subscribe((response) => {
      if (!response.Success) return;
      this.order = response.data;
      this.createOrderEditForm();
    });
  }

  createOrderEditForm() {
    this.orderForm = this.formBuilder.group({
      customerId: [this.order?.customerId, Validators.required],
      employeeId: [this.order?.employeeId, Validators.required],
      categOrderDateoryId: [this.order?.orderDate, Validators.required],
      requiredDate: [this.order?.requiredDate, Validators.required],
      uniShippedDatetPrice: [this.order?.shippedDate, Validators.required],
      shipVia: [this.order?.shipVia, Validators.required],
      freight: [this.order?.freight, Validators.required],
      shipName: [this.order?.shipName, Validators.required],
      shipAddress: [this.order?.shipAddress, Validators.required],
      shipCity: [this.order?.shipCity, Validators.required],
      shipRegion: [this.order?.shipRegion, Validators.required],
      shipPostalCode: [this.order?.shipPostalCode, Validators.required],
      shipCountry: [this.order?.shipCountry, Validators.required],
    });
  }

  createOrderAddForm() {
    this.orderForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      employeeId: ['', Validators.required],
      categOrderDateoryId: ['', Validators.required],
      requiredDate: ['', Validators.required],
      uniShippedDatetPrice: ['', Validators.required],
      shipVia: ['', Validators.required],
      freight: ['', Validators.required],
      shipName: ['', Validators.required],
      shipAddress: ['', Validators.required],
      shipCity: ['', Validators.required],
      shipRegion: ['', Validators.required],
      shipPostalCode: ['', Validators.required],
      shipCountry: ['', Validators.required],
    });
  }

  add() {
    if (!this.orderForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let order: Order = { ...this.orderForm.value };
    this.orderService.add(order).subscribe(
      (response) => {
        if (!response.Success) return;
        this.toastrService.success(response.Message);
        this.router.navigate(['admin', 'orders']);
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
    if (!this.orderForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let orderModule: Order = { ...this.order, ...this.orderForm.value };
    this.orderService.edit(orderModule).subscribe(
      (response) => {
        this.toastrService.success(response.Message);
        this.router.navigate(['admin', 'orders']);
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

    let orderModule: Order = { ...this.order, ...this.orderForm.value };
    this.orderService.delete(orderModule).subscribe(
      (response) => {
        this.toastrService.success(response.Message);
        this.router.navigate(['admin', 'orders']);
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
