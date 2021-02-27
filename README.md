# js → b++
### Version 1.0 — 27/02/2021

By Zelo101

Things you should know:

✔️ = Done

⚠️ = Experimental / Work-in-progress

❌ = Not done

🛑 = Cant be done

## Variables

| Orginial | Conversion | Done? |
| --- | --- | --- |
| let | `[DEFINE name data]` | ✔️
| const | `[DEFINE name data]` | ⚠️
| var | `[GLOBAL DEFINE name data]` | ❌

- **YOU CANNOT UPDATE VARIABLES**
- `var` (global) hasn't been implemented yet, so for now it acts like `let` & `const`
- ~~`const` still lets you change its value, so be careful of that~~

## Data Types

| Orginial | Conversion | Done? |
| --- | --- | --- |
| string | `Hello, World!` | ✔️
| number | `101` | ✔️
| array | `[1 2 3 4 5]` | ⚠️
| object | `its complicated` | ❌

- Array functions are non-existant (for now)
- `object` is something i want to do

## Operators

| Orginial | Done? |
| --- | --- |
| number operators | ✔️
| string operators (+, +=) | ✔️
| spread (...) |  ✔️

## If

| Orginial | Conversion | Done? |
| --- | --- | --- |
| if statement | `[IF [COMPARE left operator right] true]` | ✔️
| if/else statement | `[IF [COMPARE left operator right] true false]` | ✔️
| ternary (x ? y : z) | `[IF [COMPARE left operator right] true false]` | ❌

- ternary operators are low priority

## Loops

| Orginial | Done? |
| --- | --- |
| for loop | 🛑
| while loop | 🛑
| for/of loop | 🛑
| array.forEach | 🛑

- loops cannot be created yet

## Functions

| Orginial | Done? |
| --- | --- |
| function | ⚠️
| built-in functions | ❌
| built-in javascript functions | ❌
| async/await | 🛑

- **`function` will always give the same result!**
-  the built-in functions will be implemented soon