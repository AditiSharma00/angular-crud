import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent {
  empForm:FormGroup;
education :string[]=['Matric','Diploma','Intermediate','Graduate','Post Graduate']
constructor(private fb:FormBuilder,private service:ServiceService,private dialogref:DialogRef<AddEditEmpComponent>){
  this.empForm=this.fb.group(
    {
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:''
    }
  )
}
onFormSubmit(){
  if(this.empForm.valid){
    // console.log(this.empForm.value)
    this.service.addEmployee(this.empForm.value).subscribe({
      next:(val:any)=>{
alert("Good job!")
this.dialogref.close()
      },
      error:(err:any)=>console.log(err)
     
    })

  }
}
}
