(self.webpackChunkdqlx_docs=self.webpackChunkdqlx_docs||[]).push([[906],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return s},kt:function(){return m}});var a=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var u=a.createContext({}),p=function(e){var n=a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=p(e.components);return a.createElement(u.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,u=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=p(t),m=l,g=c["".concat(u,".").concat(m)]||c[m]||d[m]||r;return t?a.createElement(g,i(i({ref:n},s),{},{components:t})):a.createElement(g,i({ref:n},s))}));function m(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,i=new Array(r);i[0]=c;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o.mdxType="string"==typeof e?e:l,i[1]=o;for(var p=2;p<r;p++)i[p]=t[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},2207:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return i},metadata:function(){return o},toc:function(){return u},default:function(){return s}});var a=t(2122),l=t(9756),r=(t(7294),t(3905)),i={sidebar_position:2},o={unversionedId:"queries/filters",id:"queries/filters",isDocsHomePage:!1,title:"Filters",description:"In this section we'll learn how to filter the root query and its nested edges.",source:"@site/docs/queries/filters.md",sourceDirName:"queries",slug:"/queries/filters",permalink:"/dqlx/docs/queries/filters",editUrl:"https://github.com/fenos/dqlx-docs/edit/master/docs/queries/filters.md",version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Count",permalink:"/dqlx/docs/queries/count"},next:{title:"Sorting",permalink:"/dqlx/docs/queries/sorting"}},u=[{value:"Root Filter",id:"root-filter",children:[]},{value:"Query Filters",id:"query-filters",children:[]},{value:"Filtering Connections",id:"filtering-connections",children:[]},{value:"Filtering Edges",id:"filtering-edges",children:[]},{value:"Functions",id:"functions",children:[{value:"Has",id:"has",children:[]},{value:"Type",id:"type",children:[]},{value:"Between",id:"between",children:[]},{value:"UIDIn",id:"uidin",children:[]},{value:"UID",id:"uid",children:[]},{value:"Regexp",id:"regexp",children:[]},{value:"Eq",id:"eq",children:[]},{value:"Ge",id:"ge",children:[]},{value:"Gt",id:"gt",children:[]},{value:"Le",id:"le",children:[]},{value:"Lt",id:"lt",children:[]},{value:"Allofterms",id:"allofterms",children:[]},{value:"Anyofterms",id:"anyofterms",children:[]},{value:"Alloftext",id:"alloftext",children:[]},{value:"Anyoftext",id:"anyoftext",children:[]},{value:"Match",id:"match",children:[]},{value:"Term",id:"term",children:[]},{value:"Exact",id:"exact",children:[]},{value:"Fulltext",id:"fulltext",children:[]},{value:"Expr",id:"expr",children:[]}]}],p={toc:u};function s(e){var n=e.components,t=(0,l.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"In this section we'll learn how to filter the root query and its nested edges. ",(0,r.kt)("br",null),"\nYou'll also find all the available definitions of ",(0,r.kt)("strong",{parentName:"p"},"dqlx")," functions"),(0,r.kt)("h2",{id:"root-filter"},"Root Filter"),(0,r.kt)("p",null,"The first constraint we need to provide to our query is a single filter to help Dgraph minimise the amount of data we want to query against.\nWe can achieve data using any functions in ",(0,r.kt)("strong",{parentName:"p"},"dqlx")," that ends in ",(0,r.kt)("inlineCode",{parentName:"p"},"Fn")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'db.Query(dqlx.HasFn("name"))            // rootQuery(func: has(name))\ndb.Query(dqlx.TypeFn("Animal"))         // rootQuery(func: type(Animal))\ndb.Query(dqlx.EqFn("name", "Ollie"))    // rootQuery(func: eq(name, $0))\n\n// Aliases\ndb.QueryType("Animal")                  // rootQuery(func: type(Animal))\ndb.QueryHas("name")                     // rootQuery(func: has(name))\n')),(0,r.kt)("h2",{id:"query-filters"},"Query Filters"),(0,r.kt)("p",null,"Subsequently, we can apply other filters to our query, in order to narrow down the exact data we are after.\nWe do that using the ",(0,r.kt)("inlineCode",{parentName:"p"},"Filter()")," function"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'db.Query(dqlx.HasFn("name")).\n    Filter(\n        dqlx.EqFn("name", "Ollie"),\n        dqlx.GtFn("age", 3),\n    ).\n    Filter(dqlx.EqFn("animal", "Cat"))\n')),(0,r.kt)("p",null,"You can either add filters within a single ",(0,r.kt)("inlineCode",{parentName:"p"},"Filter()")," call, or chain multiple ",(0,r.kt)("inlineCode",{parentName:"p"},"Filter")," calls, the result is the same.\nAll the above filters will be concatenated together with an ",(0,r.kt)("inlineCode",{parentName:"p"},"AND")," condition"),(0,r.kt)("h4",{id:"sugars-on-filters"},"Sugars on Filters"),(0,r.kt)("p",null,"Instead of using the ",(0,r.kt)("inlineCode",{parentName:"p"},"Fn")," functions within our ",(0,r.kt)("inlineCode",{parentName:"p"},"Filter")," we can use the equivalent of that function as a ",(0,r.kt)("inlineCode",{parentName:"p"},"Map"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'db.Query(dqlx.HasFn("name")).\n    Filter(\n        dqlx.Eq{"name": "Ollie", "animal": "Cat"},\n        dqlx.Gt{"age": 2},\n    )\n')),(0,r.kt)("p",null,"This makes it more elegant to express the same filter type for different fields"),(0,r.kt)("h2",{id:"filtering-connections"},"Filtering Connections"),(0,r.kt)("p",null,"So far the filters we've seen till now are always concatenated with an ",(0,r.kt)("inlineCode",{parentName:"p"},"AND")," condition.\nIn order to conjunct the filters together with different conditions such as ",(0,r.kt)("inlineCode",{parentName:"p"},"OR")," we do the following."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'db.Query(dqlx.HasFn("name")).\n    Filter(\n        dql.Or{\n            dql.And{\n                dqlx.Eq{"name": "Ollie", "animal": "Cat"},\n                dqlx.Gt{"age": 2},\n             },\n            dql.And{\n                dqlx.Eq{"name": "Leo", "animal": "Cat"},\n                dqlx.Gt{"age": 3},\n            },\n        },\n    )\n')),(0,r.kt)("p",null,"which will translate in:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"query RootQuery($0: string,$1: string,$3: int, $4: string, $5: string, $6: int) {\n    rootQuery(func: has(name)) @filter( (eq(name,$0) AND eq(animal,$1) AND gt(age, $3)) OR (eq(name,$4) AND eq(animal,$5) AND gt(age, $6))) {\n        \n    }\n}\n")),(0,r.kt)("h2",{id:"filtering-edges"},"Filtering Edges"),(0,r.kt)("p",null,"Filters on edges works the same way, just add the filter functions to your edge"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'db.Query(dqlx.HasFn("name")).\n    Filter(\n        dqlx.Eq{"name": "Ollie", "animal": "Cat"},\n        dqlx.Gt{"age": 2},\n    ).\n    Edge("favorite_food", dqlx.Eq{"brand": "Wishcask"})\n')),(0,r.kt)("h2",{id:"functions"},"Functions"),(0,r.kt)("h3",{id:"has"},"Has"),(0,r.kt)("p",null,"Has function: ",(0,r.kt)("inlineCode",{parentName:"p"},"HasFn(predicate)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#has"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.HasFn("name") // as Function\ndqlx.Has("name")   // as Function (alias)\n')),(0,r.kt)("h3",{id:"type"},"Type"),(0,r.kt)("p",null,"Has function: ",(0,r.kt)("inlineCode",{parentName:"p"},"HasFn(predicate)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#type"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.TypeFn("name") // as Function\ndqlx.Type("name")   // as Function (alias)\n')),(0,r.kt)("h3",{id:"between"},"Between"),(0,r.kt)("p",null,"Between function: ",(0,r.kt)("inlineCode",{parentName:"p"},"BetweenFn(predicate, from, to)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#type"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.BetweenFn("age", 1, 30) // as Function\ndqlx.Between("age", 1, 30)   // as Function (alias)\n')),(0,r.kt)("h3",{id:"uidin"},"UIDIn"),(0,r.kt)("p",null,"UID function: ",(0,r.kt)("inlineCode",{parentName:"p"},"UIDFn(predicate)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#type"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.UIDIn{"name": []string{"Ollie", "Leo"}} // as Map\ndqlx.UIDInFn("name", []string{"Ollie", "Leo"}) // as Function\n')),(0,r.kt)("h3",{id:"uid"},"UID"),(0,r.kt)("p",null,"UID function: ",(0,r.kt)("inlineCode",{parentName:"p"},"UID(predicate, vlaues)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#type"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.UIDFn("name") // as Function\ndqlx.UID("name")   // as Function (alias)\n')),(0,r.kt)("h3",{id:"regexp"},"Regexp"),(0,r.kt)("p",null,"Regexp function: ",(0,r.kt)("inlineCode",{parentName:"p"},"RegexpFn(predicate, pattern)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#type"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Regexp{"name": "/pattern/"} // as Map\ndqlx.RegexpFn("name", "/pattern/") // as Function\n')),(0,r.kt)("h3",{id:"eq"},"Eq"),(0,r.kt)("p",null,"Eq function: ",(0,r.kt)("inlineCode",{parentName:"p"},"EqFn(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#equal-to"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Eq{ "name": "value" } // as Map\ndqlx.EqFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"ge"},"Ge"),(0,r.kt)("p",null,"Ge function: ",(0,r.kt)("inlineCode",{parentName:"p"},"GeFn(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#less-than-less-than-or-equal-to-greater-than-and-greater-than-or-equal-to"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Ge{ "name": "value" } // as Map\ndqlx.GeFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"gt"},"Gt"),(0,r.kt)("p",null,"Gt function: ",(0,r.kt)("inlineCode",{parentName:"p"},"GtFn(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#less-than-less-than-or-equal-to-greater-than-and-greater-than-or-equal-to"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Gt{ "name": "value" } // as Map\ndqlx.GtFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"le"},"Le"),(0,r.kt)("p",null,"Le function: ",(0,r.kt)("inlineCode",{parentName:"p"},"LeFn(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#less-than-less-than-or-equal-to-greater-than-and-greater-than-or-equal-to"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Le{ "name": "value" } // as Map\ndqlx.LeFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"lt"},"Lt"),(0,r.kt)("p",null,"Lt function: ",(0,r.kt)("inlineCode",{parentName:"p"},"LtFn(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#less-than-less-than-or-equal-to-greater-than-and-greater-than-or-equal-to"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Lt{ "name": "value" } // as Map\ndqlx.LtFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"allofterms"},"Allofterms"),(0,r.kt)("p",null,"Allofterms function: ",(0,r.kt)("inlineCode",{parentName:"p"},"AlloftermsFn(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#allofterms"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Allofterms{ "name": "value" } // as Map\ndqlx.AlloftermsFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"anyofterms"},"Anyofterms"),(0,r.kt)("p",null,"Anyofterms function: ",(0,r.kt)("inlineCode",{parentName:"p"},"Anyofterms(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#anyofterms"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Anyofterms{ "name": "value" } // as Map\ndqlx.AnyoftermsFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"alloftext"},"Alloftext"),(0,r.kt)("p",null,"Alloftext function: ",(0,r.kt)("inlineCode",{parentName:"p"},"Alloftext(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#anyofterms"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Alloftext{ "name": "value" } // as Map\ndqlx.AlloftextFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"anyoftext"},"Anyoftext"),(0,r.kt)("p",null,"Anyoftext function: ",(0,r.kt)("inlineCode",{parentName:"p"},"Anyoftext(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#anyofterms"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Anyoftext{ "name": "value" } // as Map\ndqlx.AnyoftextFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"match"},"Match"),(0,r.kt)("p",null,"Match function: ",(0,r.kt)("inlineCode",{parentName:"p"},"Match(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#anyofterms"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Match{ "name": "value" } // as Map\ndqlx.MatchFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"term"},"Term"),(0,r.kt)("p",null,"Term function: ",(0,r.kt)("inlineCode",{parentName:"p"},"Term(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#anyofterms"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Term{ "name": "value" } // as Map\ndqlx.TermFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"exact"},"Exact"),(0,r.kt)("p",null,"Exact function: ",(0,r.kt)("inlineCode",{parentName:"p"},"Exact(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#anyofterms"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Exact{ "name": "value" } // as Map\ndqlx.ExactFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"fulltext"},"Fulltext"),(0,r.kt)("p",null,"Fulltext function: ",(0,r.kt)("inlineCode",{parentName:"p"},"Fulltext(predicate, value)")," ",(0,r.kt)("br",null),"\n",(0,r.kt)("a",{parentName:"p",href:"https://dgraph.io/docs/query-language/functions/#anyofterms"},"Dgraph Doc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Fulltext{ "name": "value" } // as Map\ndqlx.FulltextFn("name", "value") // as Function\n')),(0,r.kt)("h3",{id:"expr"},"Expr"),(0,r.kt)("p",null,"Expr function: ",(0,r.kt)("inlineCode",{parentName:"p"},"Expr(predicate)")," ",(0,r.kt)("br",null)),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Expr")," allows you to write Raw statement as the value, the variable will not be escaped."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'dqlx.Eq{ \n    "name": dqlx.Expr("count(animals)"),\n}\n')))}s.isMDXComponent=!0}}]);