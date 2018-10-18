import React from 'react'   
import { Typography } from '@material-ui/core';
import Quote from '../controls/Quote';
import Prism from '../controls/Prism';

export function Store() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Store
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      The Store is the class that will manage the data and what revolves around it. A Store is not like the model of the MVC pattern. Because the Store is in charge of the data, it is also responsible for the business rules associated with it.
      <br />
      <br />
      As a result, a Store is considered to be responsible for an domain of application. For example, as part of an application managing the booking of airline tickets, one Store can be dedicated to the configuration of a trip, while another Store can be assigned only the price management.
      <br />
      <br />
      As a result, it is then sufficient for the Store managing the composition of the trip to rely on the one managing the prices to provide information that is always up to date without having to go outside its scope.
      </Typography>
    </React.Fragment>
  );
}