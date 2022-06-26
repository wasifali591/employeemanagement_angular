import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] = [];
  public editEmployee: Employee ;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (rsponse: Employee[]) => {
        this.employees = rsponse;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public onAddEmloyee(addForm: NgForm): void{

    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(){

  }

  public onOpenModal(employee: Employee, mode: string): void{

    const button = document.createElement('button');
    const container = document.getElementById('#main-container');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','model');

    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode === 'delete'){
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    container?.appendChild(button);
  }
}


