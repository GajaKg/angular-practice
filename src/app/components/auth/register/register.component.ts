import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '../../../store/user.store';
import { IUserRegister } from '../../../models/User.interface';
import { NewsSearchStore } from '../../../store/news.store';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly userStore = inject(UserStore);
  private readonly newsStore = inject(NewsSearchStore);

  news = computed(() => this.newsStore.news());

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.initRegisterForm()


    console.log(this.news());
  }

  onRegisterSubmited(): void {
    console.log(this.registerForm)
    if (this.registerForm.invalid) {
      alert("Form invalid");
      return;
    }


    const newUser: IUserRegister = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    }

    this.userStore.register(newUser);
  }

  private initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]]
    })
  }
}
