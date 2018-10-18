import React         from 'react'                           ;   
import ListItem      from '@material-ui/core/ListItem'      ;   
import ListItemText  from '@material-ui/core/ListItemText'  ;   
import ListSubheader from '@material-ui/core/ListSubheader' ;   
import { Divider }   from '@material-ui/core'               ;
import { NavLink }   from 'react-router-dom'                ;

export const mainListItems = (
  <div>
    <ListItem button>
      <NavLink to="/getting-started">
        <ListItemText primary="Getting Started" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink to="/installation">
        <ListItemText primary="Installation" />
      </NavLink>
    </ListItem>
    
    <Divider />
    <ListSubheader>Presentation / Usage</ListSubheader>
    <ListItem button>
      <NavLink to="/dispatcher">
        <ListItemText primary="Dispatcher" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink to="/action">
        <ListItemText primary="Action" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink to="/store">
        <ListItemText primary="Store" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink to="/view">
        <ListItemText primary="View" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <NavLink to="/context-api">
        <ListItemText primary="Context Api" />
      </NavLink>
    </ListItem>

    <Divider />
    <ListSubheader>Debugging</ListSubheader>
    <ListItem button>
      <NavLink to="/debugging">
        <ListItemText primary="Shadow FLux Debug" />
      </NavLink>
    </ListItem>
  </div>
);