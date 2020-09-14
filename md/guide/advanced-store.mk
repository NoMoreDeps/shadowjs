### Store
The `**Store**` is the class that will manage the data and what's related to it. A `**Store**` is not like the model of the MVC pattern. Because the `**Store**` is in charge of the data, it is also responsible for the business rules associated with it.

As a result, a `**Store**` is considered to be responsible for an domain of application. For example, as part of an application managing the booking of airline tickets, one `**Store**` can be dedicated to the configuration of a trip, while another `**Store**` can be assigned only the price management.

As a result, it is then sufficient for the `**Store**` managing the composition of the trip to rely on the one managing the prices to provide information that is always up to date without having to go outside its scope.
```typescript
export interface IPrivateStore<T> extends IStore<T> {
  state            : T                            ;
  dispatchHandler  : DispatchHandler              ;
}

export interface IStore<T> {
  id       : string  ;
  getState : () => T ;
}
```
Internally, a `**store**` will '*store*' a state that represents the full model of its scope. The dispatchHandler method must be overriden, it will be triggered by the dispatcher everytime a new Action has to be processed.

The registerEventBus method is private and used internally to create observer / observable relationship between a `**Store**` and the Dispatcher. So a basic implementation can look like this :
```typescript
export default class <T> extends BaseStore<T> {
  protected async dispatchHandler(
    payload : TAction                ,
    For: (...ids: string[]) => Promise<void>
  ): Promise<void | null | string | string[]> {
    /**
     * Payload should be compatible with TAction
     * For is an async function that you can call to wait
     * for another store to finish first
     */
  }
}
```
Now imagine that we need to wait for another store first, you can write it like that :
```typescript
protected async dispatchHandler(
  payload : Actions                ,
  For: (...ids: string[]) => Promise<void>
): Promise<void> {

  try {
    switch(payload.type) {
      case "RECEIVE_ACTION":
        /** Do something */
        let newState = "blabla";
        this.nextState( (previous) => newState);
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
      break;
    }
  } catch(ex) {
    error(ex);
  }
}
```
By default returning void equal to trigger a general All event. In some specific cases if you want to notify view for a partial update, you can return any event as a string, or string array


### Advanced programming
Even if a switch / case is a simple way to understand how to use it. The BaseStore uses by default a Strategy Pattern to handle the action process. So this pattern will be used to call a method in the class automatically based on the payload.type value.
```typescript

export type StrategyActionOne = {
  type : "StrategyActionOne"
}

export type StrategyActionTwo = {
  type : "StrategyActionOne"
}

export type Actions = StrategyActionOne | StrategyActionTwo;

export type State = {
  state: string;
};

export class StrategyStore extends BaseStore<State> {
  async StrategyActionOne(payload: TAction, For?: (...ids: string[]) => Promise<void>) : Promise<void | null | string | string[]> {
    this.nextState({state: "StrategyActionOne"});
  }

  async StrategyActionTwo(payload: TAction, For?: (...ids: string[]) => Promise<void>) : Promise<void | null | string | string[]> {
    this.nextState({state: "StrategyActionTwo"});
  }
}
```
So if you want to process an action type named \<Dosomething\> you can just implement un function named doSomething with the same signature than the dispatchHandler method.