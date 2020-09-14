### Overview
**S-Flux** from `version 3` provides a completely new, simplified user experience. While keeping the foundation offered by the *Flux pattern*, **S-Flux** allows you to get away from using the **Dispatcher**, and simplifies the creation of the Stores. **S-Flux** generates advanced and strongly typed Helpers to take advantage of the *Typescript's intellisense.*

For those who prefer to use all elements of the original pattern, or those who used **S-Flux** prior to `version 3`, please refer to the `"Low Level"` section.

Below is a small comparison of the use of S-Flux between the Streamlined version and the Bare metal version

[marks ref:01 classes:outputNoBg]{{
###### V3
___
#. Declare one or more store(s)
#. Use the store helper to access all available actions
#. use the store helper to subscribe all available events
}}

[marks ref:02 classes:outputNoBg]{{
###### V2
___
#. Instanciate a dispatcher
#. Create  one or more store(s)
#. Register all stores with the dispatcher
#. Instanciate a subscriber helper
#. Creates Action-Helper functions to manage Action creations
#. Subscribe Store events
}}


[bs-grid classes:output]{{
  col-xs-12,col-lg-6|@@01@@
  col-xs-12,col-lg-6|@@02@@
}}

Now, to see how the new version works side by side with the original pattern

**The original way** ::- classes:output,text-center elt:div

**What you do**
[mermaid classes:col] {{
graph LR
  A[Action] -->|Stacked| B[Dispatcher]
  B --> C1[Store 1]
  B --> C3[Store N]
  C1 -->|Emit change| D[Views]
  C3 -->|Emit change| D[Views]
  D -->|Call to action| A
}}

**The streamlined way** ::- classes:output,text-center elt:div

**What you do**
[mermaid classes:col] {{
graph LR
  S[StoreHelper] --> |Trigger Change| V[Views]
  V[Views] --> |Send Action| S[StoreHelper]
}}
___
**What it does internally**
[mermaid classes:col] {{
graph LR
  A[Action] -->|Stacked| B[Dispatcher]
  B --> C1[Store 1]
  B --> C3[Store N]
  C1 -->|Emit change| D[StoreHelper]
  C3 -->|Emit change| D[StoreHelper]
  D -->|Call to action| A
  D --> E[Views]
  E[Views] --> D
}}