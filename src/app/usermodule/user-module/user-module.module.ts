import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserUpsertComponent } from './components/user-upsert/user-upsert.component';
import { UserroutingModule } from './user-routing.module';
import { ConformComponent } from './components/conform/conform.component';
import { MaterialModule } from 'src/app/materials/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserListComponent,
    UserUpsertComponent,
    ConformComponent
  ],
  imports: [
    CommonModule,
    UserroutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserModuleModule { }
