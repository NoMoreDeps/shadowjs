import React from 'react'   
import { Typography } from '@material-ui/core';
import Quote from '../controls/Quote';
import Prism from '../controls/Prism';

export function Dispatcher() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Dispatcher
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      The dispatcher is the only orchestrator of data communication during a cycle. When an action is triggered, 
      it is stacked in an internal queue of the Dispatcher. 
      <br />
      <br />
      Each Action is destacked in turn, then transmitted to all Stores.
      <br />
      <br />
      The Dispatcher must distribute Actions in parallel, and manage dependencies between Stores.
      <Prism language="typescript" text={`
        ${"import"} Dispatcher from 'shadow-flux/Dispatcher';
        
        const dispatcher = new Dispatcher();
        `} />
        <br />
        The <Quote>Dispatcher</Quote> will register each Store in the scope. Each Store should have a unique TokenID that is used as a unique identifier.
        You can set manually the token value when registering, or the dispatcher will set a Guid randomly.
        <Prism language="typescript" text={`
        // The Dispatcher will generate a valid Guid and apply it to the store
        dispatcher.regsiter(myStore);

        // The Token is provided manually
        dispatcher.register(myStore, "theStoreToken");
        `} />
      The token is used by the View(s) to access the Store's state. The dispatcher will never allow to access any Store
      directly. You can only retreive the state based on the TokenId.
      <br />
      <br />
      The Stores never expose any other methods than the <Quote>{`getState<T>(): T`}</Quote> one. Every change of the state should be the result
      of a previous Action.
      </Typography>
    </React.Fragment>
  );
}