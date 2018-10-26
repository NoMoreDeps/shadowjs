import React from 'react'   
import { Typography } from '@material-ui/core';
import Quote from '../controls/Quote';
import Prism from '../controls/Prism';

export function Store() {
  try { document.getElementsByTagName("main")[0].scrollTop = 0; } catch {}  
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
      <Prism language="typescript" text={`
      export interface IPrivateStore<T> extends IStore<T> {
        state            : T                            ;
        dispatchHandler  : DispatchHandler              ;
        registerEventBus : (eventBus: EventBus) => void ;
      }
      
      export interface IStore<T> {
        id       : string  ;
        getState : () => T ;
      }
      `} />
      Internally, a store will 'store' a state that represents the full model of its scope. 
      The dispatchHandler method must be overriden, it will be triggered by the dispatcher everytime a new Action has to be processed.
      <br />
      <br />
      The registerEventBus method is private and used internally to create observer / observable relationship between a Store
      and the Dispatcher. So a basic implementation can look like this :
      <Prism language="typescript" text={`
        ${`export`} default class <T> extends BaseStore<T> {
    
          protected initState(): void {
            /**
             * Initilize the state here
             */
          }  
          
          protected async dispatchHandler(
            payload : TAction                , 
            success : () => void             , 
            error   : (error: Error) => void , 
            For: (...ids: string[]) => Promise<void>
          ): Promise<void> {
            /**
             * Payload should be compatible with TAction
             * success should be triggered at the end of an process
             * error should be triggered in case of an error
             * For is an async function that you can call to wait
             * for another store to finish first
             */
          }
        }
      `} />
      Now imagine that we need to wait for another store first, you can write it like that :
      <Prism language="typescript" text={`
        protected async dispatchHandler(
          payload : Actions                , 
          success : () => void             , 
          error   : (error: Error) => void , 
          For: (...ids: string[]) => Promise<void>
        ): Promise<void> {
          
          try {
      
            switch(payload.type) {
              case "RECEIVE_ACTION":
              /** Do something */
              let newState = "blabla";
              this.nextState( (previous) => newState);
              this.emit();
              break;
              
              case "SEND_ACTION":
              /** Do something */
              await For("otherStoreTokenId");
              let nextState = "blabla";
              let someData = this.getStoreStateByToken<any>("otherStoreTokenId").getState();
              /**do something with it */
              this.nextState(_ => { return {
                nextState,
                ...someData
              }});
              this.emit();
              break;
            }
            success();
          } catch(ex) {
            error(ex);
          }
        }
      `} />
      The success / error method must be called to end the process of this action in this cycle. If the state has changed, you have to call the emit function to notify all subscribers.
      <br />
      <br />
      By default emit without any parameter is equal to emit("updated"). In some specific cases if you want to notify view for a 
      partial update, you can pass antoher event name  so only the specific subscribers will be notified.
      </Typography>
    </React.Fragment>
  );
}