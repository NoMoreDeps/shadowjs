### View
To be able to interact with the `**Stores**`, it is possible to use an instance of the `**Subscriber**` class, which includes the dispatcher so as not to expose it directly.
This class will only expose the methods of subscribing and sending Actions.

```typescript
// FLux Def file
const dispatcher  = new Dispatcher()           ;
const pubSub      = new Subscriber(dispatcher) ;
...

// View file
const subscription = pubSub.subscribe<any, any>(simpleStore.id, "double", (state) => {
  return state;
}, (state) => {
  done();
  subscription.off();
});

pubSub.sendAction({ type: "double" });
```

How to use the subscriber ? First you need to use the pubSub instance to subscribe to a store.
The subscribe method signature is as following :
```typescript
subscribe<T,U> (
    // The tokenId is the unique identifier of a store
    storeTokenId : string                ,
    // The event name to subscribe to
    eventName    : string                ,
    // A function to tranform if needed the store state to something more usefull
    mapToState   : (storeState: T ) => U ,
    // A function to handle the store state data to update the internal state
    eventHandler : (mappedState) => void
)
: // Returns an object that exposes a function to unsubscribe
{ off: () => void };
```
Now that you can receive updated data from any store, you need to perfom actions in order to trigger new process in each store.
To send a new action you can use the sendAction function.
The sendAction method signature is as following :
```typescript
sendAction(
  action: {
    type: string
  } & any
) : void;
```
The only required field of the action object is type : string. This fields identify the action. Each store will use this field to know if they need to perfom some actions.