import React from 'react'   
import { Typography } from '@material-ui/core';
import Quote from '../controls/Quote';
import Prism from '../controls/Prism';

export function Debugger() {
  try { document.getElementsByTagName("main")[0].scrollTop = 0; } catch {}  
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Debugger
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
     Comming soon with live examples...
      </Typography>
    </React.Fragment>
  );
}