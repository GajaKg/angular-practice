import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnInit, Signal } from '@angular/core';
import { NewsSearchStore } from '../../store/news.store';
import { News } from '../../models/News.interface';
import { DatePipe } from '@angular/common';
import { Scroll } from '@angular/router';

@Component({
  selector: 'app-hackernews',
  imports: [DatePipe],
  templateUrl: './hackernews.component.html',
  styleUrl: './hackernews.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HackernewsComponent implements OnInit {
  private readonly _newsStore = inject(NewsSearchStore);

  protected readonly news: Signal<News[]> = computed(() => this._newsStore.news());
  protected readonly isLoading: Signal<boolean> = computed(() => this._newsStore.isLoading());
  private scrollTimeout: any;

  @HostListener('window:scroll', ['$event'])
  onScroll(e: Scroll) {

    clearTimeout(this.scrollTimeout); // Clear previous timeout
    this.scrollTimeout = setTimeout(() => {
      const isEndPage = ((window.document.body.scrollHeight - window.innerHeight) - window.scrollY) < 100;
      if (isEndPage) {
        this._newsStore.loadMore();
      }
    }, 500); // Adjust delay as needed (e.g., 200ms)
  }

  ngOnInit(): void {
    this._newsStore.loadAll();
  }

  loadMore(): void {
    this._newsStore.loadMore();
  }

}
