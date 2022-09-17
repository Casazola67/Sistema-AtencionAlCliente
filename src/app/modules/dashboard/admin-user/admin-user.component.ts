import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/core/models/user.model';

import { MatTableDataSource } from '@angular/material/table';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit{  

  usersList: User[]= [];
  displayedColumns: string[] = ['Name', 'Email', 'Otro'];
  dataSource = new MatTableDataSource(this.usersList);


  constructor( private userService: UserService ){

  }

  ngOnInit(): void {
    this.getAllUsers();
   
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(doc =>{
      this.usersList = [];
      doc.forEach((element:any) => {
        this.usersList.push({
          id: element.payload.doc.uid,
          ...element.payload.doc.data()
        });
      });
      this.dataSource = new MatTableDataSource(this.usersList);
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

}
 