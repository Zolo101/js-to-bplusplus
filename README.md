# js → b*
### Version 2.0 — 30/12/2022

By Zelo101

Things you should know:

✔️ = Done

⚠️ = Experimental / Work-in-progress

❌ = Not done

🛑 = Cant be done

**Syntax checking is WIP**

## Variables

| Original | Conversion                  | Done? |
|----------|-----------------------------|-------|
| let      | `[DEFINE name data]`        | ✔️    |
| const    | `[DEFINE name data]`        | ⚠️    |
| var      | `[GLOBAL DEFINE name data]` | ❌     |

- `var` (global) hasn't been implemented yet, so for now it acts like `let` & `const`
- `const` still lets you change its value, so be careful of that

## Data Types

| Original | Conversion        | Done? |
|----------|-------------------|-------|
| string   | `Hello, World!`   | ✔️    |
| number   | `101`             | ✔️    |
| array    | `[1 2 3 4 5]`     | ✔️    |
| object   | `its complicated` | ❌     |

- `object` is something i want to do

## Operators

| Original                 | Done? |
|--------------------------|-------|
| number operators         | ✔️    |
| string operators (+, +=) | ✔️    |
| spread (...)             | ❌️    |

## If

| Original            | Conversion                                      | Done? |
|---------------------|-------------------------------------------------|-------|
| if statement        | `[IF [COMPARE left operator right] true]`       | ✔️    |
| if/else statement   | `[IF [COMPARE left operator right] true false]` | ✔️    |
| ternary (x ? y : z) | `[IF [COMPARE left operator right] true false]` | ✔️    |

- ternary operators are low priority

## Loops

| Original      | Done?    |
|---------------|----------|
| for loop      | ✔️       |
| while loop    | ✔️       |
| for/of loop   | ❌ (soon) |
| array.forEach | ❌ (soon) |

- See [Chapter 9 (B*'s Quirks)](https://github.com/b-Development-Team/b-star/wiki/Starter-Guide#9-bs-quirks) of the B* Starter Guide before using these.

## Functions

| Original                      | Done? |
|-------------------------------|-------|
| function                      | ✔️    |
| built-in javascript functions | ⚠️    |
| async/await                   | 🛑    |

-  (most) built-in functions will be implemented soon

# Built-in functions
## All
### Properties
| Property | Supported? |
|----------|------------|
| length   | ✔️         |

## Array
### Methods
| Method      | Supported? |
|-------------|------------|
| at          | ✔️         |
| concat      | ❌          |
| copyWithin  | ❌          |
| every       | ✔️         |
| filter      | ❌          |
| flat        | ❌          |
| flatMap     | ❌          |
| forEach     | ❌          |
| indexOf     | ❌          |
| lastIndexOf | ❌          |
| map         | ✔️         |
| reduce      | ❌          |
| reduceRight | ❌          |
| reverse     | ❌          |
| slice       | ❌          |
| some        | ✔️         |
| sort        | ❌          |
| splice      | ❌          |
| splice      | ❌          |
| copyWithin  | ❌          |
| fill        | ❌          |
| pop         | ❌          |
| push        | ⚠️         |
| reverse     | ❌          |
| shift       | ❌          |
| sort        | ❌          |
| splice      | ❌          |
| unshift     | ❌          |

- **push does not mutate the original argument, you'll have to manually set the variable with the pushed array!**