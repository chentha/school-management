import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent ,
  },
  { 
    path: 'login', 
    component: LoginComponent, 
  },
  {
    path: 'staff', 
    component: StaffComponent, 
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
