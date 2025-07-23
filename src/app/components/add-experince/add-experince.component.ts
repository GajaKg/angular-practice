import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-experince',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-experince.component.html',
  styleUrl: './add-experince.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExperinceComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  onSubmit(): void {
    console.log(this.form)
    if (!this.form.valid) {
      alert("invalid")
    }
  }

  onWorkingClicked(): void {
    if (this.working?.value) {
      this.endYear?.disable();
      this.endMonth?.disable();
    } else {
      this.endYear?.enable();
      this.endMonth?.enable();
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      employmentType: [""],
      organization: [null, [Validators.required, Validators.minLength(3)]],
      working: [],
      startMonth: ["", [Validators.required]],
      startYear: ["", [Validators.required]],
      endMonth: ["", [Validators.required]],
      endYear: ["", [Validators.required]],
    });
  }

  get title() {
    return this.form.get("title");
  }

  get organization() {
    return this.form.get("organization");
  }

  get working() {
    return this.form.get("working")
  }

  get startMonth() {
    return this.form.get("startMonth");
  }

  get startYear() {
    return this.form.get("startYear");
  }

  get endMonth() {
    return this.form.get("endMonth");
  }

  get endYear() {
    return this.form.get("endYear");
  }

}
