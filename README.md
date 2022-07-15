
# stach

__Stach__ is a ![less than 300b](./bits/stach.es2017.min.js.svg) mustache-like string templating system for node or browsers.

```typescript
import { Stach } from "stach"

const templated = Stach("Hello {{name}} 😸", {name: "mr Bond"})
console.log( templated ) // Hello mr Bond 😸
```

## Why

Why do we need __Stach__ with literal template strings available everywhere ?
Stach can be useful when any **small templating** is needed when **the template source is not coming from javascript** itself.
<br>For example, if you need to __process a template__ from a __user generated file__, __a dictionary__, or any other kind of input.

Stach is ultra-lightweight and compatible with Node and Browsers environments.
It uses Javascript's Regex based `String.replace` function to be **super effective**.

**Typescript definitions** are included. Enjoy !

### Scope

Stach can do variable replacement, function calls, and short ternary. **THAT'S IT.**<br>
It **cannot** do advanced conditions, listing, HTML transformations, etc...
If you need all of this, check others template engines like [Mustache](https://mustache.github.io/), [Handlebars](https://handlebarsjs.com/) or even [React JSX](https://fr.reactjs.org/docs/introducing-jsx.html) in some cases.


### Installation

To install Stach in your project :<br>
- NPM : `npm install stach`
- Yarn : `yarn add stach`

### Usage

If you are using CommonJS syntax :

```javascript
const { Stach } = require('stach')
```

Better, if ES-Modules syntax is available :

```javascript
import { Stach } from 'stach'
```

### Simple variable replacement

```javascript
Stach('Hello {{username}}', {
    username: 'James Bond'
});
// 'Hello James Bond'
```

### Values can be functions

```javascript
const user = { balance : 12 };
Stach('Your current balance is {{balance}}€', {
    balance: () => user.balance
});
// 'Your current balance is 12€'
```

### Ternary conditions can be used :

```javascript
Stach('Condition is {{test ? truthy : falsy}}', {
    test: 0
});
// 'Condition is falsy'
```

### Or, with the help of functions :
```javascript
Stach('{{name}} is {{age}} {{isAgePlural ? years : year}} old', {
    name: 'Brad Pitt',
    age: 55,
    // Note that v here is the current value object
    // So we can access dynamically to the age property
    isAgePlural: v => v.age > 1
});
// 'Brad Pitt is 55 years old'
```

### More functions

```javascript
Stach('{{plainFunction}} == 15', {
    value: 15,
	// This works
    plainFunction () {
        return this.value;
    }
});
// '15 == 15'
```

### Complex example mixing functions and ternaries

```javascript
const user = {
    name: 'James Bond',
    gender: 'male',
    balance: 15
}
Stach('Hello {{ isMale ? mr : mrs }} {{ getLastName }}. Your balance is {{ balance }}€.', {
  ...user,
  isMale: v => v.gender == 'male',
  getLastName: v => v.name.split(' ')[1]
});
// 'Hello mr Bond. Your balance is 15€.'
```

### Advanced, delimiters regex can be changed

Here is the default delimiter regex : `/{{(.*?)}}/gm` [see](https://github.com/zouloux/stach/blob/main/src/stach.ts#L5)

This will update delimiters from `{{var}}` to `{var}`.
Use [regexr.com](https://regexr.com) to create easily your delimiter's Regex.

```javascript
import { setStachRegex } from 'stach';
setStachRegex( /{(.*?)}/gm );
```