import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeroesService } from './services/Heroes.service';
import { Heroes } from './models/Hero.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { HeroesApiAction } from './store/heroes.actions';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly heroesService = inject(HeroesService);

  ngOnInit() {
    this.heroesService.getAllHeroes().pipe(
      takeUntilDestroyed(this.destroyRef),
    )
      .subscribe((heroes: Heroes[]) => {
        this.store.dispatch(HeroesApiAction.setAllHeroes({ heroes }))
      })
  }
}
