import React from 'react'   
import { Typography } from '@material-ui/core';
import Quote from '../controls/Quote';
import Prism from '../controls/Prism';

export function ContextApi() {
  try { document.getElementsByTagName("main")[0].scrollTop = 0; } catch {}
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        ContextApi
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
     You will need to use the Subscriber in several Components, so the best way to share this component may be to use the React new Context Api.
     <br />
     <br />
     More information can be found here : <a target="_new" href="https://reactjs.org/docs/context.html">https://reactjs.org/docs/context.html</a>
      </Typography>
    </React.Fragment>
  );
}