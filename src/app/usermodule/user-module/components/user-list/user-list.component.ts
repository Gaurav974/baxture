import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserUpsertComponent } from '../user-upsert/user-upsert.component';
import { DataServiceService } from '../../services/data-service.service';
import { Iuser } from '../../model/user';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../services/snackbar.service';
import { ConformComponent } from '../conform/conform.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  public userArr!: Array<Iuser>;
  public dataSource: MatTableDataSource<Iuser> = new MatTableDataSource();
  @ViewChild(MatTable) table!: MatTable<any>;
  constructor(
    private _dialog: MatDialog,
    private _dataservice: DataServiceService,
    private _snackBar: SnackbarService
  ) {
    this.getUserdata();
    this.updateUserOnUi();
   
  }
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'address',
    'phone',
    'action',
  ];
  ngOnInit(): void {
  
  }

  onUserFormHandler() {
    this._dialog.open(UserUpsertComponent, {
      disableClose: true,
    });
  }
  getUserdata() {
    this._dataservice.getAllUsers().subscribe((res) => {
      this.userArr = res;
      this.dataSource = new MatTableDataSource<Iuser>(this.userArr);
      this._dataservice.newUserData$.subscribe((res) => {
        this.userArr.unshift(res);
        this.table.renderRows();
      });
    });
  }
  updateUserOnUi() {
    this._dataservice.updateUserData$.subscribe((res) => {
      this.userArr.forEach((user) => {
        this._snackBar.openSnackBar(
          `User ${user.first_name} ${user.last_name} is Successfully Updated!!!`
        );
        if (user.id === res.id) {
          (user.first_name = res.first_name),
            (user.last_name = res.last_name),
            (user.email = res.email),
            (user.address = res.address),
            (user.phone = res.phone);
        }
      });
    });
  }
  onDeleteUser(id: string) {
    const dialogConfig = this._dialog.open(ConformComponent);
    dialogConfig.afterClosed().subscribe((res: boolean) =>
      res
        ? this._dataservice.deleteUserList(id).subscribe((res) => {
            const findInd = this.userArr.findIndex((ind) => ind);
            this.userArr.splice(findInd, 1);
            this.table.renderRows();
            this._snackBar.openSnackBar(
              `The User whose id is ${id} is Successfully delete`
            );
          })
        : false
    );
  }
  onEditUser(data: Iuser) {
    let obj: Iuser = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      address: data.address,
      phone: data.phone,
    };
    const dialogRef = new MatDialogConfig();
    dialogRef.data = obj;
    this._dialog.open(UserUpsertComponent, dialogRef);
  }
}
