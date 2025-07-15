import { Component, inject, NgModule, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HeroesService } from '../../services/Heroes.service';
import { Heroes } from '../../models/Hero.interface';
import { debounceTime, distinctUntilChanged, filter, map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllHeroes, selectVisibleHeroes } from '../../store/heroes.selector';

@Component({
  standalone: true,
  selector: 'app-heroes',
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule],
  providers: [HeroesService],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {

  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);
  private readonly heroesService = inject(HeroesService);

  form!: FormGroup;
  heroesNgrx$ = this.store.select(selectAllHeroes);
  heroes$?: Observable<Heroes[]> = this.heroesService.getAllHeroes();
  heroesFilter$?: Observable<Heroes[]> = this.heroesService.getAllHeroes();
  search: string = "";

  ngOnInit() {
    // this.searchForm();

  }

  filterHeroes() {
    // this.heroesFilter$ = this.heroes$?.pipe(
    //   map((heroes: Heroes[]) => {
    //     return heroes.filter(hero => {
    //       return hero.name.toLowerCase().includes(this.search.toLowerCase());
    //     })
    //   })
    // )
    this.heroesNgrx$ = this.store.select(selectVisibleHeroes(this.search));

    this.heroesFilter$ = this.heroes$?.pipe(
      map(heroes =>
        heroes.filter(hero =>
          this.search
            ? hero.name.toLowerCase().includes(this.search.toLowerCase())
            : true
        )
      )
    );
  }

  searchForm() {
    this.form = this.formBuilder.group({
      searchStr: ['']
    })


    this.form.get("searchStr")?.valueChanges.pipe(
      debounceTime(300), // Wait 300ms after typing stops
      distinctUntilChanged(), // Only emit if value changed
      tap((response: string) => {
        console.log(response)
      })
    )
  }

  // onSubmit() {
  // if (
  //   this.form.controls['category'].errors ||
  //   this.form.controls['name'].errors ||
  //   this.form.controls['capacity'].errors ||
  //   this.form.controls['quantity'].errors
  // ) {
  //   alert('Unesite podatke');
  //   return;
  // }
  // }
}
