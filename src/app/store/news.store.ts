import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { News } from '../models/News.interface';
import { NewsService } from '../services/news.service';
import { computed, DestroyRef, inject } from '@angular/core';
import { catchError, delay, filter, from, mergeMap, of, switchMap, tap, timeout, toArray } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type NewsSearchState = {
  newsListID: number[],
  news: News[],
  isLoading: boolean
  filter: { query: string };
  pagination: number,
  // filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: NewsSearchState = {
  newsListID: [],
  news: [],
  isLoading: false,
  filter: { query: '' },
  pagination: 10
};

export const NewsSearchStore = signalStore(
  withState(initialState),
  withComputed(({ news, filter }) => ({
    allNews: computed(() => news()),
    // sortedBooks: computed(() => {
    //   const direction = filter.order() === 'asc' ? 1 : -1;

    //   return books().toSorted((a, b) =>
    //     direction * a.title.localeCompare(b.title)
    //   );
    // }),
  })),
  withMethods((
    store,
    newsService$ = inject(NewsService),
    destroyRef = inject(DestroyRef)
  ) => ({
    /* ... */
    loadAll() {
      patchState(store, { isLoading: true });
      newsService$.GetAll()
        .pipe(
          takeUntilDestroyed(destroyRef),
          // Add type annotation for better code clarity
          switchMap((newsIDs: number[]) => {
            if (!newsIDs || newsIDs.length === 0) {
              // Return empty array if no IDs are received
              return of([]);
            }
            const firstTenIDs = newsIDs.slice(0, 10);
            console.log('Received news IDs:', firstTenIDs);
            patchState(store, { newsListID: newsIDs });
            // Process each ID with proper error handling
            return from(firstTenIDs).pipe(
              // Use mergeMap with concurrency limit to avoid too many parallel requests
              mergeMap(firstTenIDs =>
                newsService$.GetDetailByID(firstTenIDs).pipe(
                  catchError(error => {
                    console.error(`Failed to fetch news item ${firstTenIDs}:`, error);
                    // Return null for failed requests (can be filtered later)
                    return of(null);
                  })
                ),
                10 // Process up to 10 requests in parallel
              ),
              // Filter out failed requests (where we returned null)
              filter((newsItem): newsItem is News => newsItem !== null),
              // Collect all successful responses into an array
              toArray(),
              // Add timeout to prevent hanging
              // timeout(30000) // 30 seconds timeout
            );
          }),
          // Handle any errors in the main observable chain
          catchError(error => {
            console.error('Error in news processing pipeline:', error);
            // Return empty array to keep the app running
            return of([]);
          })
        )
        .subscribe({
          next: (news: News[]) => {
            console.log('Successfully fetched news items:', news);
            patchState(store, { news, isLoading: false });
            // Process your news items here
          },
          error: (err: any) => {
            // This would only catch errors not handled by inner catchError
            console.error('Subscription error:', err);
            patchState(store, { isLoading: false });
          },
          complete: () => {
            console.log('News processing completed');
            patchState(store, { isLoading: false });
          }
        });
    },
    loadMore() {
      if (store.isLoading()) return;

      patchState(store, { pagination: store.pagination() + 10 });

      patchState(store, { isLoading: true });
      const loadTo = store.pagination();
      const loadFrom = store.pagination() - 10;
      const loadIDs = store.newsListID().slice(loadFrom, loadTo);

      from(loadIDs).pipe(
        takeUntilDestroyed(destroyRef),
        delay(3000),
        mergeMap((id: number) => {
          return newsService$.GetDetailByID(id).pipe(
            catchError(error => {
              console.error(`Failed to fetch news item ${id}:`, error);
              // Return null for failed requests (can be filtered later)
              return of(null);
            })
          );

        }, 10),
        filter((newsItem): newsItem is News => newsItem !== null),
        toArray(),
      )
        .subscribe(data => {
          console.log(data)
          patchState(
            store,
            {
              news: [...store.news(), ...data],
              isLoading: false
            });
        })
    },

  }))
);
