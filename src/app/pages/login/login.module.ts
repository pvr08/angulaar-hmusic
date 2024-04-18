import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LoginRoutes } from './login.routes';
import { ReactiveFormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule.forChild(LoginRoutes),
    ReactiveFormsModule
  ]
})
export class LoginModule { }