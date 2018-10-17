import React            from 'react'                           ;
import ListItem         from '@material-ui/core/ListItem'      ;
import ListItemIcon     from '@material-ui/core/ListItemIcon'  ;
import ListItemText     from '@material-ui/core/ListItemText'  ;
import ListSubheader    from '@material-ui/core/ListSubheader' ;
import DashboardIcon    from '@material-ui/icons/Dashboard'    ;
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart' ;
import PeopleIcon       from '@material-ui/icons/People'       ;
import BarChartIcon     from '@material-ui/icons/BarChart'     ;
import LayersIcon       from '@material-ui/icons/Layers'       ;
import AssignmentIcon   from '@material-ui/icons/Assignment'   ;
import { Divider } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

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
      <ListItemText primary="Action" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Store" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="View" />
    </ListItem>

    <Divider />
    <ListSubheader>Debugging</ListSubheader>
    <ListItem button>
      <ListItemText primary="Shadow FLux Debug" />
    </ListItem>
  </div>
);