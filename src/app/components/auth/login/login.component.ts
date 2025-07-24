import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '../../../store/user.store';
import { IUser, IUserLogin } from '../../../models/User.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _userStore = inject(UserStore);

  loginForm!: FormGroup;

  ngOnInit() {
    this.initLoginForm();
  }

  onLoginSubmited() {
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      alert("Form invalid");
      return;
    }


    const newUser: IUserLogin = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }

    this._userStore.login(newUser);
  }

  private initLoginForm() {
    this.loginForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    })
  }
}
