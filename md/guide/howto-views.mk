### Using the store helper
The usage of a helper is extremely simple. Just import the helper :-)

```typescript
import BlogStore from "./stores/Blog";
```

Let's assume that the Store owns the following actions : 
* _getLatestArticles_ ::- variant:danger
* _getArticleDetail_
* _postComment_

And provide the following events: 
* _OnGetList_ ::- variant:info
* _OnGetDetail_
* _OnPostComment_

The Helper will automatically provide an action method group and a subscription method group. 

To call the actions, use the methods in `actions`, and for events, the one in `subscribeTo`.
```typescript
// You can subscribe globally to any change, and update your full state
React.useEffect(() => {
  const sub = BlogStore.subscribeTo.All(state => setState(state));
  // Unsubscribe when unmount 
  return () => sub.off();
})
```
___
```typescript
// You can subscribe specifically to one partial event
React.useEffect(() => {
  const sub = BlogStore.subscribeTo.OnGetList(state => setLatest(state.latest));
  // Unsubscribe when unmount 
  return () => sub.off();
})
```
Now to call an action, just use the action group methods
```typescript
// You can call easily any action
function Detail() {
  return <>
    <BlogDetail 
      body      = {state.selectedBlog} 
      onComment = { 
        _ => BlogStore.actions.postComment({
          id      : _.id,
          content : _.content
        });
      }/>
  </>;
}
```