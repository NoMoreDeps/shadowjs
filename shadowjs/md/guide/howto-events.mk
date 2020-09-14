### Events

`**Events**` are used to notify `**subscribers**` that a change in the state of a store they subscribe to has been updated. 
By default, it is not necessary to create events, because a global event exists, named "All". It is propagated for any change in a store, unless otherwise specified.

For each event to which you wish to subscribe, you must register through the `**Dispatcher**`, specifying the `**Store ID**` and the name of the event. The `**wrapper**` returned by the "registerStore" method will create as many `**Helper**` methods as you have defined an event. These methods will allow a direct subscription, without the constraint of passing the store identifier and the name of the event, and this, without even using the `**Dispatcher**`.

Events are described as key/value pairs, carrying the name of the event.

```typescript
const events = {
  updated  : "updated",
  newEntry : "newEntry"
};
```

As it is a bit redundant to specify for each key its value, knowing that in most cases the value will probably be identical to the key, it is possible to use the `**withEvents**` function to simplify this syntax.

```typescript
const events = withEvents({
  updated  : "",
  newEntry : ""
});
```

Each wrapped method will be generated  followign each event declared, plus the `All` events that will be added automatically.

```typescript
 subscribeTo: {
    All      : ((state: TheStoreState) => void) => { off: () => void };
    updated  : ((state: TheStoreState) => void) => { off: () => void };
    newEntry : ((state: TheStoreState) => void) => { off: () => void };
  }
```

The returned value of a subscription is an object exposing an off method. You can call it to unsubscribe at any time.

An example with React Hook
```typescript
React.useEffect(() => {
  const sub = counterStore.subscribeTo.All(_ => setState(_));
  return () => sub.off();
}, [])
```