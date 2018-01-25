# cache-observable

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]() [![npm](https://img.shields.io/badge/npm-1.0.1-brightgreen.svg)](https://www.npmjs.com/package/cache-observable)

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

## How it work

1. Call a function with `@CacheObservable()` decorator;
2. The Decorator lib check, if a storage have the observable entry then return it;
3. If the storage haven't a entry of a called function, then the Decorator lib create new entry in the storage;
4. The new entry observable has been chained with next functions:
  * publishReplay(1, ms) // publish one item for `ms` milliseconds
  * refCount() // check all subscribers
  * take(1) // take one
5. Return the entry.

## License

MIT