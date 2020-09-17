### Actions

`Actions` are methods that aim to modify the `state` of stored data. An `action` will receive a `payload` providing the necessary information to modify the state accordingly.

The method prototype can be describe as follow :
```typescript
type TActionReturn = void | null | string | string[];

async actionName(payload?: any) => TActionReturn;
async actionName(payload?: any, For?: (...ids: string[]) => Promise<void>) => TActionReturn;
```

[marks classes:outputNoBg]{{
  **payload** : `**any**`
  ___
  The payload is an object containing all the information useful for the action to update its State.
}}
[marks classes:outputNoBg]{{
  **For** : `**(...ids: string[]) => Promise<void>**`
  ___
  This method can be used to ensure any other store will finish to process the payload before the current one will continue.
  Ex:
  ```typescript
  async getTravelDetail(payload: TTravel, For: TAwaitFor) {
    await For(priceStore.id);
    this.nextState({
      ...payload,
      price: priceStore.getState().prices[payload.travelId]
    });
  }
  ```
}}

[marks classes:outputNoBg]{{
  **nextState** : `**(newState: Partial<T>, mergeToPreviousState?: boolean) => void;**`
  ___
  This method is used to update the current state. By default, the state is replaced by the new value. If you want to partially update the state, you can set the flag `mergeToPreviousState` to true. Be aware that the update is a shallow merge, not a deep merge.
  ```typescript
  // Since we declare the action outside the Store class, 
  // we can set the this parameter to set the correct store context 
  async setCounterValue(this: TBaseStore<CounterState>, payload: { value: number }) {
    this.nextState(payload);
  }
  ```
}}

[marks classes:outputNoBg]{{
**Return types** : `**undefined, null, string, string[]**`
___
The return value will determine the event(s) that will be triggered at the end of processing. By default, for any change of state, an event of type "All" will be triggered. It is possible to trigger specific events in case of a partial change of state. The different combinations are described below.

|Value|Effect|
|-|-|
|`**undefined**`|*Global change, we notify all subscribers to any change*|
|`**null**`|*No change, this will prevent any event to be triggered*|
|`**string**`|*The selected event will be triggered*|
|`**string**`[]|*The selected events will be triggered*|

```typescript
// Since we declare the action outside the Store class, 
// we can set the this parameter to set the correct store context 
async setCounterValue(this: TBaseStore<CounterState>, payload: { value: number }) {
  this.nextState(payload);

  if (payload.value > 100) return Events.GoodValue;
  return Events.LessThanExpected;
}
```
}}

### Helpers
After defining the actions, you will have to call them. Normally, you have to submit the payload, identified with a unique ActionKey, through the dispatcher in order for the action to be called so that all stores receive it and decide whether or not to process it. As this is quite tedious, it is common practice to create `**Helper**` functions to simplify this creation.

The `**wrapper**` returned by the "registerStore" method will create as many `**Helper**` methods as you have defined an action. But in addition to that, the methods also take care of forward the Payload directly to the dispatcher.

```typescript
// So if you have defined this
const _actions = {
  async increase(this: TThis) {
   ...
  },
  async decrease(this: TThis) {
    ...
  },
  async setCounter(this: TThis, payload: { counter: number }) {
    ...
  }
}

// You get that in return
{
  ...
  actions: {
      increase   : () => void                             ;
      decrease   : () => void                             ;
      setCounter : (payload: { counter: number }) => void ;
    }
    ...
}
```