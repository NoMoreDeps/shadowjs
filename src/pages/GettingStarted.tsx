import React from 'react'   
import { Typography } from '@material-ui/core';
import Quote from '../controls/Quote';

export function GettingStarted() {
  try { document.getElementsByTagName("main")[0].scrollTop = 0; } catch {}  
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Getting Started
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      Shadow-Flux is an implementation of Facebook's Flux design pattern. This library is not a Facebook product, but offers an implementation in Typescript. This library is offered under MIT license.
      <br />
      <br />
      Happy coding: -)
      <br />
      <br />
      </Typography>
      <Typography variant="h4" gutterBottom>
        General Overview
      </Typography>
      <div>
        <br />
        <img src="assets/diagram.svg" style={{maxWidth : 800}}/>
      </div>
      <br />
      <br />
      <Typography variant="subtitle1" gutterBottom>
      The <Quote>FLux</Quote> pattern is a representation of a unidirectional data flow. This way of representing the life cycle of an information will ensure that for each cycle, all components using the data will be at the same level of information.
      </Typography>
      <br />
      <br />
      <Typography variant="subtitle1" gutterBottom>
      The <Quote>Dispatcher</Quote> will stack the <Quote>Actions</Quote>, then redistribute them to the <Quote>Stores</Quote>, 
      which in turn will process or not the information. Once the information has been processed, 
      each <Quote>Store</Quote> will notify the <Quote>View(s</Quote>) that more up-to-date data is available. 
      The <Quote>View(s)</Quote> will then update their display accordingly.
      </Typography>
      <br />
      <br />
      <Typography variant="subtitle1" gutterBottom>
      An <Quote>Action</Quote> can be triggered by a <Quote>View</Quote>, a <Quote>Store</Quote>, or any other source, such as a server. In all cases, each <Quote>Action</Quote> will be processed sequentially by the <Quote>Dispatcher</Quote>.
      </Typography>
    </React.Fragment>
  );
}