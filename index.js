const global_config = {
  pages: [
    {name: "index", title: "Home", path: "/"},
    {
      name: "guide", title: "Guide", path:"/guide", template: "rightenu",
      pages: [
        {name: "introduction-installation" , title: "Installation" , path: "/guide/introduction-installation" , groupTitle: "Introduction" },
        {name: "introduction-overview"     , title: "Overview"     , path: "/guide/introduction-overview"     , groupTitle: "Introduction" },
        {name: "introduction-breaking"     , title: "Breaking changes"     , path: "/guide/introduction-breaking"     , groupTitle: "Introduction" },
       
        {name: "howto-overview"            , title: "Overview"     , path: "/guide/howto-overview"            , groupTitle: "Using it" },
        {name: "howto-store"               , title: "Store"        , path: "/guide/howto-store"               , groupTitle: "Using it" },
        {name: "howto-actions"             , title: "Actions"      , path: "/guide/howto-actions"             , groupTitle: "Using it" },
        {name: "howto-events"              , title: "Events"       , path: "/guide/howto-events"              , groupTitle: "Using it" },
        {name: "howto-views"               , title: "Views"        , path: "/guide/howto-views"               , groupTitle: "Using it" },
    
        {name: "advanced-overview"         , title: "Overview"     , path: "/guide/advanced-overview"         , groupTitle: "Low Level" },
        {name: "advanced-dispatcher"       , title: "Dispatcher"   , path: "/guide/advanced-dispatcher"       , groupTitle: "Low Level" },
        {name: "advanced-store"            , title: "Store"        , path: "/guide/advanced-store"            , groupTitle: "Low Level" },
        {name: "advanced-action"           , title: "Action"       , path: "/guide/advanced-action"           , groupTitle: "Low Level" },
        {name: "advanced-views"            , title: "Views"        , path: "/guide/advanced-views"            , groupTitle: "Low Level" },
    
        {name: "debugging-visualizer"       , title: "Visualizer"   , path: "/guide/debugging-visualizer"      , groupTitle: "Debug" },

        {name: "tutorial-bookstore"        , title: "Bookstore"    , path: "/guide/tutorial-bookstore"        , groupTitle: "Tutorial" },
        // {name: "tutorial-demo"             , title: "Demo"         , path: "/tutorial-demo"             , groupTitle: "Tutorial" },

      ]
    },
    {name: "tutorial-demo" , title: "Demo" , path: "/tutorial-demo", hidden: true, template: "demo" },
    {name: "about" , title: "About" , path: "/about"}
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