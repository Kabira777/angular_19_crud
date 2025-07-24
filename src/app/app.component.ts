import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
  employeeForm:FormGroup=new FormGroup({});
  employeeObj:EmployeeModel=new EmployeeModel();
  employeeList: EmployeeModel[]=[];


  constructor(){
   this.createForm();
  //  debugger;
   const oldData=localStorage.getItem("EmpData");
   if(oldData!=null){
    const parseData=JSON.parse(oldData);
    this.employeeList=parseData;
   }
  }

  createForm(){
    this.employeeForm=new FormGroup({
      empId:new FormControl(this.employeeObj.empId),
      name:new FormControl(this.employeeObj.name),
      city:new FormControl(this.employeeObj.city),
      state:new FormControl(this.employeeObj.state),
      address:new FormControl(this.employeeObj.address),
      emailID:new FormControl(this.employeeObj.emailID),
      contactNo:new FormControl(this.employeeObj.contactNo),
      pinCode:new FormControl(this.employeeObj.pinCode),
    })
  }

  onSave(){
    debugger;
    const oldData=localStorage.getItem("EmpData");
    if(oldData!=null){
      const parseData=JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length+1);
       this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
  }



  onEdit(item:EmployeeModel){
    debugger;
    this.employeeObj=item;
    this.createForm();

  }

  onUpdate(){
   

  }

  onDelete(){

  }

  }

  



