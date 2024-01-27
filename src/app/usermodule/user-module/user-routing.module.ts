import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserUpsertComponent } from "./components/user-upsert/user-upsert.component";
import { UserListComponent } from "./components/user-list/user-list.component";


const routes: Routes = [
    {
        path :'' , component : UserListComponent ,
        // children :[
        //     {
        //         path : '' , component : UserListComponent
        //     }
        // ]
    },
    
];



@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports :[RouterModule]
})

export class UserroutingModule{

}