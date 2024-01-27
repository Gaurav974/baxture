import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomRegex } from '../../validations/validation';
import { DataServiceService } from '../../services/data-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Iuser } from '../../model/user';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css'],
})
export class UserUpsertComponent implements OnInit {
  public userForm!: FormGroup;
  public isBtnShow: boolean = true;
  public updateId!: string;
  constructor(
    private _dataservice: DataServiceService,
    private _dialog: MatDialog,
    private _snackBar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) UserObj: Iuser
  ) {
    this.createUserForm();
    if (UserObj) {
      this.userForm.patchValue(UserObj);
      this.updateId = UserObj.id;
      this.isBtnShow = false;
    }
  }
  ngOnInit(): void {
  
  }
  createUserForm() {
    this.userForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.email),
      ]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  onUserForm() {
    if (this.userForm.value) {
      console.log(this.userForm.value);
      this._dataservice.createUserList(this.userForm.value).subscribe((res) => {
        for (const item in res) {
          this._dataservice.newUser({id: res[item], ...this.userForm.value});
          this._snackBar.openSnackBar(
            `User ${this.userForm.value.first_name} ${this.userForm.value.last_name} is Successfully Added !!!`
          );
        }
        this._dialog.closeAll();
      });
    }
  }

  get f() {
    return this.userForm.controls;
  }
  onUpdateUser() {
    if (this.userForm.valid) {
      let updateUserObj = {
        id: this.updateId,
        ...this.userForm.value,
      };
      this._dataservice.updateUserList(updateUserObj).subscribe((res) => {
        this._dataservice.updateUser(updateUserObj);
      });
      this._dialog.closeAll();
    }
  }
  onCancel() {
    this.userForm.reset();
    this._dialog.closeAll();
  }

  
}
