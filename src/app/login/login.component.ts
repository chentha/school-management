import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formData: any = {};
  showAlert: boolean = false;
  alertMessage: string = '';
  isLoggedIn: boolean = false;

  users = [
    { username: 'tha', password: '123' },
    { username: 'long', password: '11' },
    { username: 'heng', password: '22' }
  ];

  constructor(private router: Router) { }
  ngOnInit(): void {
    if(localStorage.getItem('card')) {
      this.router.navigate(['']);
    }
  }
  
  submitForm() {
    if (this.users.find(user => user.username === this.formData.username && user.password === this.formData.password)) {
      this.showAlert = true;
      // this.alertMessage = 'Login successful!';
      localStorage.setItem('card', 'true');
      this.router.navigate(['']);
    } else {
      this.showAlert = true;
      this.alertMessage = 'Invalid username or password.';
      // this.router.navigate(['/404']);
    }
  }
}
