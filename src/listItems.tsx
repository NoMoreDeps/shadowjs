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

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemText primary="Getting Started" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Installation" />
    </ListItem>
    
    <Divider />
    <ListSubheader>Presentation</ListSubheader>
    <ListItem button>
      <ListItemText primary="Dispatcher" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Store" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Action" />
    </ListItem>

    <Divider />
    <ListSubheader>Usage</ListSubheader>
    <ListItem button>
      <ListItemText primary="Action" />
    </ListItem>

    <Divider />
    <ListSubheader>Debugging</ListSubheader>
    <ListItem button>
      <ListItemText primary="Shadow FLux Debug" />
    </ListItem>
  </div>
);