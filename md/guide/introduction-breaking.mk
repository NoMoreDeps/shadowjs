### Breaking changes

S-Flux V3 is a major change, in wich we introduced a streamlined way to declare and use stores and data. Even if you can still use the low level object to implement things as close as possible to the original Flux pattern, the same code in V2 and V3 will not work without some update.

~Here is the list of changes :~

* The dispatch handler method is now used as a fallback if specified, so declaring it will not prevent the strategy pattern to work as is.
* method declared as Action handler will not start with the word `action` anymore.