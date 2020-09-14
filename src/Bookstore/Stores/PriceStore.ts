import {TBaseStore, registerStore } from "shadow-flux" ;
import { PriceApi }                 from "../Apis"     ;

type State = {
  prices: { [key: string] : Array<Price> }
}

export type Price = {
  amount   : number ;
  discount : number ;
  seller   : string ;
}

// This store will be used only by the Bookshop store, so it does not need to trigger any event
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
