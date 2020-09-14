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