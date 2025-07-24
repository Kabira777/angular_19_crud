import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,Validators } from '@angular/forms';
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
      name:new FormControl(this.employeeObj.name,[Validators.required]),
      city:new FormControl(this.employeeObj.city),
      state:new FormControl(this.employeeObj.state),
      address:new FormControl(this.employeeObj.address),
      emailID:new FormControl(this.employeeObj.emailID),
      contactNo:new FormControl(this.employeeObj.contactNo,[Validators.required,Validators.maxLength(10)]),
      pinCode:new FormControl(this.employeeObj.pinCode,[Validators.required,Validators.minLength(6)]),
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
    alert('Employee saved');
    this.employeeObj=new EmployeeModel();
    this.createForm();
  }



  onEdit(item:EmployeeModel){
    this.employeeObj=item;
    this.createForm();

  }

  onUpdate(){
    //to fetch the record in employeeList array whose empId matches with the selected empId
   const record=this.employeeList.find(m=>m.empId==this.employeeForm.controls['empId'].value)
   if(record!=undefined){
    record.name=this.employeeForm.controls['name'].value;
    record.city=this.employeeForm.controls['city'].value;
    record.state=this.employeeForm.controls['state'].value;
    record.address=this.employeeForm.controls['address'].value;
    record.emailID=this.employeeForm.controls['emailID'].value;
    record.contactNo=this.employeeForm.controls['contactNo'].value;
    record.pinCode=this.employeeForm.controls['pinCode'].value;
   }
   localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
   alert(`Employee Updated: ${this.employeeForm.controls['name'].value}`)
   this.employeeObj=new EmployeeModel();
   this.createForm();
  }

 onDelete(id: number) {
  debugger;
  const isDelete = confirm("Are you sure you want to delete?");
  if (isDelete) {
    const index = this.employeeList.findIndex(m => m.empId == id);

    if (index !== -1) {
      const deletedEmployee = this.employeeList[index]; // Save before deletion
      this.employeeList.splice(index, 1);               // Then remove
      alert(`Employee Deleted: ${deletedEmployee.name}`);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList)); // Save updated list
    }
  }
}


resetForm(){
  this.employeeObj=new EmployeeModel(); 
  this.createForm();
}

  }

  



