# cache-observable

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

I created this decorator for cashing requests in my angular services.

## Installation

`npm i --save cache-observable`

## Usage

Need add `@CacheObservable(ms)` before a function that return `ConnectableObservable` (angular `http.get()` or `Observable.ajax()`), where `ms` is cache time in milliseconds.

### Example

```
// book.service.ts

// ...
import CacheObservable from 'cache-observable';

@Injectable()
export class BookService {
  private path: string = '/books';

  constructor(private api: apiService) {
  }

  @CacheObservable(60 * 1000) // 1 min cache
  getBook(id: string): Observable<Book> {
    return this.api.get(`${this.path}/${id}`);
  }

  // ...
}
```

## License

MIT