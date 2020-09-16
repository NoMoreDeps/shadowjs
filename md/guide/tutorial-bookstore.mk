### Tutorial : The Bookstore
___ ::- classes:hrSep
#### Overview
In this tutorial, we will create a **bookstore**, very simplified but illustrating the concepts contained in **S-Flux**. 
This bookstore will allow you to visualize books, by category, and put them in your shopping cart.

#### Data model
To get started, here is a lite version of the data model :
[marks xss:false classes:output]{{
  [mermaid xss:false]{{
  classDiagram
    class Book
    Book : Name     string
    Book : Author   string
    Book : Picture  string
    Book : Year     number
    Book : Category string

    class BookStore

    class Prices
      Prices: Array<Price>

    class Price
      Price: discount number
      Price: price number

    class Cart
    
    Price     "1" --> "1" Book
    BookStore "1" --> "*" Book
    Prices    "1" --> "*" Price
    Cart      "*" --> "*" Book
    BookStore "1" --> "1" Cart
    
  }}
}}

#### The stores
Let's assume that we have several `**APIs**` that we can call.
* ___Book Api___, to manage Book
* ___Price Api___, to get price details on books

Since a store define a precise scope, let's split the data model as follows :
* ___A Bookshop Store___, to handle Application state
* ___A Book Store___ to manage all books and details on books
* ___A Price Store___ to handle all prices from several sellers

Each store will only manage what it is intented to, so we can apply separation of concern principle. The Bookshop store will agregate all data for the user, the Book store will retreive books list and details, and the Price store will check and find prices related to books.

##### Price Store
###### What we need :
* Get price list for a collection of books

###### The store definition :
```typescript
import {TBaseStore, registerStore } from "shadow-flux" ;
import { PriceApi }                 from "../Apis"     ;

type State = {
  prices: { [key: string] : Array<Price> }
}

type Price = {
  amount   : number ;
  discount : number ;
  seller   : string ;
}

// This store will be used only by the Bookshop store,
// so it does not need to trigger any event
export default registerStore({
  // Store Id
  id: "Price",
  // Initial state
  init(): State {
    return { prices: {} };
  },
  // Actions
  actions: {
    async getPrices(this: TBaseStore<State>, payload: { bookIds: Array<string>}) {
      // Call to the api
      const result = await PriceApi.getPrices(payload.bookIds);
      // The second parameter, "mergeToPreviousState" 
      // is set to true to merge with existing state
      this.nextState(result, true);
      // Prevent event to be emitted
      return null; 
    }
  }
});

```

##### Book Store
###### What we need :
* Get the 5 latest books
* Get a book detail

###### The store definition :
```typescript
import {TBaseStore, registerStore } from "shadow-flux" ;
import { BookApi }                  from "../Apis"     ;

type State = {
  latest  : Array<Book>         ;
  current : DetailedBook | null ;
}

type Book = {
  title  : string ;
  photo  : string ;
  author : string ;
}

type DetailedBook = Book & {
  detail : string;
}

export default registerStore({
  // Store id
  id: "BookStore",
  // Initial state
  init(): State {
    return {
      latest  : []   ,
      current : null ,
    }
  },
  actions: {
    async getNewBooks(this: TBaseStore<State>) {
      // Retreive the book list
      const result = await BookApi.getLatestBooks();
      // Save the book list
      this.nextState({ latest: result.books }, true);
      // No event triggered, internal use only
      return null;
    },
    async getDetail(this: TBaseStore<State>, payload: { bookId: string}) {
      // Retreive the book list
      const result = await BookApi.geDetail(payload.bookId);
      // Save the book list
      this.nextState({ current: result }, true);
      // No event triggered, internal use only
      return null;
    }
  },
  // If action getBooks is dispatched, 
  // we will process it as if it was our getNewBooks
  mappedActions: { 
    "getBooks": "getNewBooks" 
  }
});
```
##### Bookshop Store
###### What we need :
* Get a book detail
* Get book list
* show detail
* Handle cart

###### The store definition :
```typescript
import { registerStore, TAwaitFor, TBaseStore, withEvents } from "shadow-flux"  ;
import BookStore, { Book, DetailedBook }                   from "./BookStore"  ;
import PriceStore, { Price }                               from "./PriceStore" ;

type State = {
  books    : Book[]                      ;
  selected : DetailedBook | null         ;
  prices   : { [bookId: string]: Price[] } ;
}

const events = withEvents({
  onBookReceived: "",
  onBookSelected: ""
})

const BookshopStore = registerStore({
  id: "BookshopStore",
  init(): State {
    return {
      books    : []   ,
      selected : null ,
      prices   : {}   ,
    }
  },
  actions: {
    async getBooks(this: TBaseStore<State>, _, For: TAwaitFor) {
      // BookStore will process getNewBooks , we just need to wait ot finish first
      await For(BookStore.id);
      // Now we can retreive and save books informations
      this.nextState({
        books: BookStore.getState().latest
      });

      // Now we call our next action and then we will reconcile
      PriceStore.actions.getPrices({bookIds: this.getState().books.map(_ => _.title)});
      //we need to update prices
      return null;
    },
    async getPrices(this: TBaseStore<State>, _, For: TAwaitFor) {
      await For(PriceStore.id);

      // Updating 
      const newState = this.getState();
      for (let k in PriceStore.getState().prices) {
        newState.prices[k] = PriceStore.getState().prices[k];
      }

      this.nextState(newState);

      // Now we can notify the that the list book is available
      return events.onBookReceived;
    },
    async getDetail(this: TBaseStore<State>, payload: { bookId: string}, For: TAwaitFor) {
      await For(BookStore.id);
      // Updating book
      this.nextState({
        selected: BookStore.getState().current
      });
      return events.onBookSelected;
    }
  },
  events
});

export default BookshopStore;
```

 ::- classes:bd-callout,bd-callout-danger elt:div nested
This section is not finished `yet`, keep an eye ont it.