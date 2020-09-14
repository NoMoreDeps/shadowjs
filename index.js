const global_config = {
  pages: [
    {name: "index", title: "Home", path: "/shadowjs"},
    {
      name: "guide", title: "Guide", path:"/shadowjs/guide", template: "rightenu",
      pages: [
        {name: "introduction-installation" , title: "Installation" , path: "/shadowjs/guide/introduction-installation" , groupTitle: "Introduction" },
        {name: "introduction-overview"     , title: "Overview"     , path: "/shadowjs/guide/introduction-overview"     , groupTitle: "Introduction" },
        {name: "introduction-breaking"     , title: "Breaking changes"     , path: "/shadowjs/guide/introduction-breaking"     , groupTitle: "Introduction" },
       
        {name: "howto-overview"            , title: "Overview"     , path: "/shadowjs/guide/howto-overview"            , groupTitle: "Using it" },
        {name: "howto-store"               , title: "Store"        , path: "/shadowjs/guide/howto-store"               , groupTitle: "Using it" },
        {name: "howto-actions"             , title: "Actions"      , path: "/shadowjs/guide/howto-actions"             , groupTitle: "Using it" },
        {name: "howto-events"              , title: "Events"       , path: "/shadowjs/guide/howto-events"              , groupTitle: "Using it" },
        {name: "howto-views"               , title: "Views"        , path: "/shadowjs/guide/howto-views"               , groupTitle: "Using it" },
    
        {name: "advanced-overview"         , title: "Overview"     , path: "/shadowjs/guide/advanced-overview"         , groupTitle: "Low Level" },
        {name: "advanced-dispatcher"       , title: "Dispatcher"   , path: "/shadowjs/guide/advanced-dispatcher"       , groupTitle: "Low Level" },
        {name: "advanced-store"            , title: "Store"        , path: "/shadowjs/guide/advanced-store"            , groupTitle: "Low Level" },
        {name: "advanced-action"           , title: "Action"       , path: "/shadowjs/guide/advanced-action"           , groupTitle: "Low Level" },
        {name: "advanced-views"            , title: "Views"        , path: "/shadowjs/guide/advanced-views"            , groupTitle: "Low Level" },
    
        {name: "debugging-visualizer"       , title: "Visualizer"   , path: "/shadowjs/guide/debugging-visualizer"      , groupTitle: "Debug" },

        {name: "tutorial-bookstore"        , title: "Bookstore"    , path: "/shadowjs/guide/tutorial-bookstore"        , groupTitle: "Tutorial" },
        // {name: "tutorial-demo"             , title: "Demo"         , path: "/tutorial-demo"             , groupTitle: "Tutorial" },

      ]
    },
    {name: "tutorial-demo" , title: "Demo" , path: "/shadowjs/tutorial-demo", hidden: true, template: "demo" },
    {name: "about" , title: "About" , path: "/shadowjs/about"}
  ]
};

const global_samples = [
  {name: "", path: ""},
  {name: "Headings"     , path: "/md/repl/Headings.mk"},
  {name: "Emphasis"     , path: "/md/repl/Emphasis.mk"},
  {name: "Lists"        , path: "/md/repl/Lists.mk"},
  {name: "Tables"       , path: "/md/repl/Tables.mk"},
  {name: "Styles"       , path: "/md/repl/Styles.mk"},
  {name: "Blocks"       , path: "/md/repl/Blocks.mk"},
  {name: "Nested"       , path: "/md/repl/Nested.mk"},
  {name: "Mermaid"      , path: "/md/repl/Mermaid.mk"},
  {name: "Full example" , path: "/md/repl/full.mk"}
]

const gb = (() => {
  try {
    return window;
  } catch { }
  return global;
})();
gb.global_config = global_config;