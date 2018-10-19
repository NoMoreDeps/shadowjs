import React from 'react'   
import { Typography } from '@material-ui/core';
import Quote from '../controls/Quote';
import Prism from '../controls/Prism';

export function View() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        View
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      To be able to interact with the Stores, it is possible to use an instance of the Subscriber class, which includes the dispatcher so as not to expose it directly.
      <br />
      This class will only expose the methods of subscribing and sending Actions.
      <Prism language="typescript" text={`
      // FLux Def file
      const dispatcher  = new Dispatcher()           ;
      const pubSub      = new Subscriber(dispatcher) ;
      ...

      // View file
      const subscription = wrapper.subscribe<any, any>(simpleStore.id, "double", (state) => {
        return state;
      }, (state) => {
        done();
        subscription.off();
      });
  
      wrapper.sendAction({ type: "double" });
      `} />
      </Typography>
    </React.Fragment>
  );
}