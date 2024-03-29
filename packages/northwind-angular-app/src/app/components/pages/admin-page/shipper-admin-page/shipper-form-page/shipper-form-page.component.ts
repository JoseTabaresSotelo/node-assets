import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Shipper from 'src/app/models/shipper';
import { ShipperService } from 'src/app/services/shipper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shipper-form-page',
  templateUrl: './shipper-form-page.component.html',
  styleUrls: ['./shipper-form-page.component.scss'],
})
export class ShipperFormPageComponent implements OnInit {
  shipperForm!: FormGroup;
  shipper?: Shipper;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private shipperService: ShipperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditPage();
    this.createShipperAddForm();
  }

  isEditPage() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['shipperId']) {
        this.getShipperById(params['shipperId']);
      }
    });
  }

  getShipperById(id: number) {
    this.shipperService.getById(id).subscribe((response) => {
      if (!response.success) return;
      this.shipper = response.data;
      this.createShipperEditForm();
    });
  }

  createShipperEditForm() {
    this.shipperForm = this.formBuilder.group({
      companyName: [this.shipper?.companyName, Validators.required],
      phone: [this.shipper?.phone, Validators.required],
    });
  }

  createShipperAddForm() {
    this.shipperForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  add() {
    if (!this.shipperForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let shipper: Shipper = { ...this.shipperForm.value };
    this.shipperService.add(shipper).subscribe(
      (response) => {
        if (!response.success) return;
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'shippers']);
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
    if (!this.shipperForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let shipperModule: Shipper = { ...this.shipper, ...this.shipperForm.value };
    this.shipperService.edit(shipperModule).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'shippers']);
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

    let shipperModule: Shipper = { ...this.shipper, ...this.shipperForm.value };
    this.shipperService.delete(shipperModule).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'shippers']);
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
