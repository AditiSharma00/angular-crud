import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmpComponent } from './add-edit-emp/add-edit-emp.component';
import { ServiceService } from './shared/service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    "action"
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'AngularCrud';
  constructor(private dialog: MatDialog, private service: ServiceService) {}
  ngOnInit(): void {
    this.getEmployeeList();
  }
  openAddEditEmpForm() {
    const dialogRef=this.dialog.open(AddEditEmpComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
        this.getEmployeeList()
      }
    }
    })
  }
  getEmployeeList() {
    this.service.getAllEmployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmp(id:Number){
  this.service.deleteEmployee(id).subscribe({
 
      next:(res)=>{
        alert('Employee deleted')
        this.getEmployeeList()
      },
      error:(err)=>{
        alert(err)
      }
  })
  }
  //edit
  EditEmp(data:any){

    const dialogRef=  this.dialog.open(AddEditEmpComponent,{
      data
    })
   dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
        this.getEmployeeList()
      }
    }
    })
  }
}
