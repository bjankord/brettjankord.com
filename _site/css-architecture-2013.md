Recent study of approaches, how each language has patterns



CSS patterns:

SMACSS

BEM

OOCSS



I've taken notes from many great developers before me and what to share some of my throughts on the process.



No name to this approach, just a collection of recommendations for crafting modern CSS structure.



How best practices change over time so this is not a best practices list, rather a set of recommendations. I feel this allows developers more freedom when deciding on when to go against these reccomendations.

No hard and fast rules



<h2>What are the goals of the CSS we write - look at Philip Waltons post again</h2>

Where to start, how to link HTML with CSS so we can style it.



Why use classes over anything else



Drawbacks of element based selectors



Class naming



Based on SMACSS



Overview of SMACSS



Base

Layout

Modules

States



SMACSS covers more, but the order to switch styles are group is important

How SMACSS has naming conventions for layouts, modules, and states.



<h3>BEM</h3>

reminder of how class naming should add meaning/semantics for developers



Brief overview of BEM

Block, Elements, Modifiers



<h2>Pairing it with SMACSS</h2>

<h2>Modules, Components, Modifiers</h2>

Repo, explanation of what they are



<h3>Modules</h3>

Naming modules, their purpose



<h3>Components</h3>

Naming components



.module .component vs .module__component



how .component has no meaning without .module



Scope of styles



private vs public, resubality, scope creep up styles limits reusability



.module__component vs .module-Component



Note on key selectors.



Selector perf, steve shouders notes.

Compressing repeatable patterns with gZip



<h3>Modifiers</h3>

How modifiers can be applied not only to modules, but components as well.



How the line between modules and components is blurry. Sometimes, modules can be components of other modules.



.class.modifier vs .class--modifier



<h2>OOCSS</h2>

Brief overview



Cons of OOCSS



2 parts to OOCSS, use it on modules, or make modules specific and use OOCSS as placeholders inside of modules



How to overcome cons, abstract the presentational styles into our role based styles with preprocessors, perferably Sass



<h2>States</h2>

Media Queries



Javascript


 
Data-Atts



ARIA roles and applying styling hooks



<h2>What are the goals of the CSS we write - look at Philip Waltons post again</h2>
