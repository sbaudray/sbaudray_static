---
published: true
title: Leverage JavaScript modules
author: Sebastien Baudray
description: Another import strategy for JavaScript
tags: javascript
---

It's always a good idea to split your application into modules with a bounded responsibility.

For example if your application dealt with culture, you might have a film module:

```js
// film.js

export function create() {}

export function isValid() {}
```

In Javascript world, we usually import those functions by name:

```js
// elsewhere.js

import { create } from "./film";

let newFilm = create({ title: "Sonatine" });
```

Now this code is really prone to name collision. If we were to import the `create` function for a book, we would need to use aliases:

```js
import { create as createFilm } from "./film";
import { create as createBook } from "./book";
```

When working with a language like Elixir or ReScript, you can use a function from any module by simply referencing its name. No import needed! It would look like this:

```javascript
// Film.res

let create = () => {};
```

```javascript
// Elsewhere.res

let newFilm = Film.create({ title: "Sonatine" });
```

Note that there is no export statement either, a module is automatically defined for the file. The JavaScript equivalent would use the "wildcard import":

```js
import * as Film from "./film";

const newFilm = Film.create({ title: "Sonatine" });
```

Aside from giving you incentives to modularize your application, that way of importing things will make your code more explicit and your life easier when it comes to naming things.

Did you ever find yourself frustrated by how `isValid` could be a function as well as a boolean ?

Well, this issue can be solved without even thinking about it:

```js
// Before

import { isValid as getIsValidBook } from "./book";

const isValid = getIsValidBook(myBook);

// After

import * as Books from "./book";

const isValid = Book.isValid(myBook);
```
