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
      The dispatcher is the only orchestrator of data communication during a cycle. When an action is triggered, it is stacked in the tail of the Dispatcher. 
      <br />
      <br />
      Each Action is destacked in turn, then transmitted to all Stores.
      <br />
      <br />
      The Dispatcher must distribute Actions in parallel, and manage dependencies between Stores.
      <Prism language="bash">{`
      import Dispatcher from "shadow-flux";

      const dispatcher = new Dispatcher(); 
      `}</Prism>
       
      </Typography>
    </React.Fragment>
  );
}