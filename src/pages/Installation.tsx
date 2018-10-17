import React from 'react'   
import { Typography } from '@material-ui/core';
import Quote from '../controls/Quote';
import Prism from '../controls/Prism';

export function Installation() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Installation
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        To install shadow-flux, use your favorite package manager :<br/>
        <Prism language="bash">{`
        #Using npm
        npm install -S shadow-flux

        #or

        #Using Yarn
        yarn add -S shadow-flux
        `}</Prism>
        If you prefer to get it from the source, you can clone the repo from github.
        <Prism language="bash">{`
        #Clone the repository
        git clone https://github.com/fskorzec/shadow-flux.git

        #Go to the directory
        cd shadow-flux

        #Install with npm
        npm i

        #Or with yarn
        yarn install
        `}</Prism>
        To compile just run
        <Prism language="bash">{`
        tsc
        `}</Prism>
        To run the unit test suite and code coverage 
        <Prism language="">{`
        jest --coverage
        PASS  __tests__\Tests\App.ts
         Dispatcher tests
           √ Should instanciate (3ms)
           √ should register a new store (3ms)
           √ should unregister properly
           √ shoud dispatch action (2ms)
           √ Should get the correct frameindex
           √ shoud dispatch action and handle wait for process (5ms)
           √ sould handle subcription (1ms)
           √ Sould not dispatch if payload is null (1ms)
           √ Should allow to process an error and continue
           √ Should activate and deactivate debugger (1ms)
           √ Should not set debug setState if not in debug mode even if lockState is false (202ms)
           √ should not emit if lockState is true (201ms)
           √ Should emit a sub event
           √ Should update state base on a function in nextState
           √ Should not trigger an event if no eventBus is defined
           √ Should log the endCycle in debug mode (1ms)
           √ Should throw all possible errors
           √ Should handle subscribe<T>(storeId, eventName, updatedStateHandler): void; (1ms)
           √ Should handle subscribe<T>(storeId, eventName, updatedStateHandler): void;
           √ Should handle subscribe<T,U>(storeId, eventName, mapToStateHandler, updatedStateHandler): void;
       
        PASS  __tests__\Tests\Guid.ts
         Test Guid
           √ Should be instanciated (1ms)
           √ Should generate a valid guid with 5 parts (2ms)
           √ Should let us access all part with getters (2ms)
           √ Should be generated from the static method and be correct (1ms)
           √ Shoud get the String Guid version on each call (1ms)
           √ Should be unique in 1000 instances (21ms)
       
        PASS  __tests__\Tests\Eventbus.ts
         EventBus
           √ Should instanciate (1ms)
           √ Should set the separator to '.' if empty
           √ Should set the depth to 1 if < 1 (1ms)
           √ Should allow to subscribe (1ms)
           √ should allow to unsubscribe (1ms)
           √ Should handle once subscription (1ms)
           √ Should handle all form of unsubscription (1ms)
           √ Should work with parent too
           √ Should work in async mode (2ms)
           √ Should work in async mode with partial eventname (1ms)
           √ Should work in async mode with partial eventname in once mode (2ms)
           √ Should work with parent too in async mode (4ms)
           √ Should throw an exception if eventName is not defined (1ms)
       
       ---------------------|----------|----------|----------|----------|-------------------|
       File                 |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
       ---------------------|----------|----------|----------|----------|-------------------|
       All files            |      100 |      100 |      100 |      100 |                   |
        src                 |      100 |      100 |      100 |      100 |                   |
         Dispatcher.ts      |      100 |      100 |      100 |      100 |                   |
        src/Extension       |      100 |      100 |      100 |      100 |                   |
         Container.ts       |      100 |      100 |      100 |      100 |                   |
        src/Store           |      100 |      100 |      100 |      100 |                   |
         BaseStore.ts       |      100 |      100 |      100 |      100 |                   |
        src/Utils           |      100 |      100 |      100 |      100 |                   |
         DefferedPromise.ts |      100 |      100 |      100 |      100 |                   |
         EventBus.ts        |      100 |      100 |      100 |      100 |                   |
         Guid.ts            |      100 |      100 |      100 |      100 |                   |
        src/Utils/Debug     |      100 |      100 |      100 |      100 |                   |
         DispatcherCycle.ts |      100 |      100 |      100 |      100 |                   |
       ---------------------|----------|----------|----------|----------|-------------------|
       Test Suites: 3 passed, 3 total
       Tests:       39 passed, 39 total
       Snapshots:   0 total
       Time:        5.643s
       Ran all test suites.
       Done in 6.66s.
        `}</Prism>
      </Typography>
    </React.Fragment>
  );
}