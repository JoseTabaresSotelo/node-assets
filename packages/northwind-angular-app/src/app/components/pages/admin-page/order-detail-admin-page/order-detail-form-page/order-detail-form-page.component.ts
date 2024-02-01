import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import OrderDetail from 'src/app/models/orderDetail';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-detail-form-page',
  templateUrl: './order-detail-form-page.component.html',
  styleUrls: ['./order-detail-form-page.component.scss'],
})
export class OrderDetailFormPageComponent implements OnInit {
  orderDetailForm!: FormGroup;
  orderDetail?: OrderDetail;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private orderDetailService: OrderDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditPage();
    this.createOrderDetailAddForm();
  }

  isEditPage() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['orderId']) {
        this.getOrderDetailById(params['orderId']);
      }
    });
  }

  getOrderDetailById(id: number) {
    this.orderDetailService.getById(id).subscribe((response) => {
      if (!response.Success) return;
      this.orderDetail = response.data;
      this.createOrderDetailEditForm();
    });
  }

  createOrderDetailEditForm() {
    this.orderDetailForm = this.formBuilder.group({
      orderId: [this.orderDetail?.orderId, Validators.required],
      productId: [this.orderDetail?.productId, Validators.required],
      unitPrice: [this.orderDetail?.unitPrice, Validators.required],
      quantity: [this.orderDetail?.quantity, Validators.required],
      discount: [this.orderDetail?.discount, Validators.required],
    });
  }

  createOrderDetailAddForm() {
    this.orderDetailForm = this.formBuilder.group({
      orderId: ['', Validators.required],
      productId: ['', Validators.required],
      unitPrice: ['', Validators.required],
      quantity: ['', Validators.required],
      discount: ['', Validators.required],
    });
  }

  add() {
    if (!this.orderDetailForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let orderDetail: OrderDetail = { ...this.orderDetailForm.value };
    this.orderDetailService.add(orderDetail).subscribe(
      (response) => {
        if (!response.Success) return;
        this.toastrService.success(response.Message);
        this.router.navigate(['admin', 'orderDetails']);
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
    if (!this.orderDetailForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let orderDetailModule: OrderDetail = {
      ...this.orderDetail,
      ...this.orderDetailForm.value,
    };
    this.orderDetailService.edit(orderDetailModule).subscribe(
      (response) => {
        this.toastrService.success(response.Message);
        this.router.navigate(['admin', 'orderDetails']);
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

    let orderDetailModule: OrderDetail = {
      ...this.orderDetail,
      ...this.orderDetailForm.value,
    };
    this.orderDetailService.delete(orderDetailModule).subscribe(
      (response) => {
        this.toastrService.success(response.Message);
        this.router.navigate(['admin', 'orderDetails']);
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
