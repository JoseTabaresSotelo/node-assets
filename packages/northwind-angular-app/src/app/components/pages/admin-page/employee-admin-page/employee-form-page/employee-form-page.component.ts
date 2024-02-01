import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Employee from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form-page',
  templateUrl: './employee-form-page.component.html',
  styleUrls: ['./employee-form-page.component.scss'],
})
export class EmployeeFormPageComponent implements OnInit {
  employeeForm!: FormGroup;
  employee?: Employee;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditPage();
    this.createEmployeeAddForm();
  }

  isEditPage() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['employeeID']) {
        this.getEmployeeById(params['employeeID']);
      }
    });
  }

  getEmployeeById(id: number) {
    this.employeeService.getById(id).subscribe((response) => {
      if (!response.Success) return;
      this.employee = response.data;
      this.createEmployeeEditForm();
    });
  }

  createEmployeeEditForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: [this.employee?.firstName, Validators.required],
      lastName: [this.employee?.lastName, Validators.required],
      title: [this.employee?.title, Validators.required],
      titleOfCourtesy: [this.employee?.titleOfCourtesy, Validators.required],
      birthDate: [this.employee?.birthDate, Validators.required],
      hireDate: [this.employee?.hireDate, Validators.required],
      address: [this.employee?.address, Validators.required],
      city: [this.employee?.city, Validators.required],
      region: [this.employee?.region, Validators.required],
      postalCode: [this.employee?.postalCode, Validators.required],
      country: [this.employee?.country, Validators.required],
      homePhone: [this.employee?.homePhone, Validators.required],
      extension: [this.employee?.extension, Validators.required],
      notes: [this.employee?.notes, Validators.required],
      reportsTo: [this.employee?.reportsTo, Validators.required],
      salary: [this.employee?.salary, Validators.required],
    });
  }

  createEmployeeAddForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],
      titleOfCourtesy: ['', Validators.required],
      birthDate: ['', Validators.required],
      hireDate: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      homePhone: ['', Validators.required],
      extension: ['', Validators.required],
      notes: ['', Validators.required],
      reportsTo: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  add() {
    if (!this.employeeForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let employee: Employee = { ...this.employeeForm.value };
    this.employeeService.add(employee).subscribe(
      (response) => {
        if (!response.Success) return;
        this.toastrService.success(response.Message);
        this.router.navigate(['admin', 'employees']);
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
    if (!this.employeeForm.valid) {
      this.toastrService.error('Please fill in the missing fields');
      return;
    }

    let employeeModule: Employee = {
      ...this.employee,
      ...this.employeeForm.value,
    };
    this.employeeService.edit(employeeModule).subscribe(
      (response) => {
        this.toastrService.success(response.Message);
        this.router.navigate(['admin', 'employees']);
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

    let employeeModule: Employee = {
      ...this.employee,
      ...this.employeeForm.value,
    };
    this.employeeService.delete(employeeModule).subscribe(
      (response) => {
        this.toastrService.success(response.Message);
        this.router.navigate(['admin', 'employees']);
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
