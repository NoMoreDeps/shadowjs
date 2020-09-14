import {TBaseStore, registerStore } from "shadow-flux" ;
import { BookApi }                  from "../Apis"     ;

type State = {
  latest  : Array<Book>         ;
  current : DetailedBook | null ;
}

export type Book = {
  title  : string ;
  photo  : string ;
  author : string ;
}

export type DetailedBook = Book & {
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
