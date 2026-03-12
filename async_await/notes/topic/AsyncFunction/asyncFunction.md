# Async Functions in JavaScript

Async functions were introduced in **ES2017** to simplify working with **asynchronous operations** such as API requests, database queries, file reading, and timers.

Before async functions existed, developers relied on:

* **Callbacks**
* **Promise chains (`.then()`)**

Promise chains often became deeply nested and hard to read, sometimes referred to as **callback hell**.

Async functions solve this problem by allowing developers to write asynchronous code that **looks synchronous and executes in a top-to-bottom readable style**.

---

# 1. What is an Async Function?

An **async function** is a normal JavaScript function prefixed with the **`async` keyword**.

```javascript
async function myFunction() {

}
```

Adding the `async` keyword changes two important behaviors:

1. **The function always returns a Promise**
2. It allows the use of the **`await` keyword** inside the function.

Because of this, async functions make it easier to work with asynchronous operations.

---

## Example

```javascript
async function greet() {
  return "Hello";
}

const result = greet();
console.log(result);
```

Output:

```
Promise { "Hello" }
```

Even though `"Hello"` was returned, the function actually returns a **Promise that resolves to "Hello"**.

---

## Mental Model

Think of an async function as a **Promise generator**.

When you call an async function:

1. JavaScript **creates a Promise**
2. The function body executes
3. When the function finishes:

   * If a value is returned → Promise **resolves**
   * If an error is thrown → Promise **rejects**

---

# 2. The Single Most Important Rule

The most important rule about async functions is:

> **Every async function returns a Promise — no exceptions.**

Even if you return a simple value like a number or string, JavaScript **automatically wraps it inside a Promise**.

Example:

```javascript
async function getNumber() {
  return 42;
}
```

Internally JavaScript treats this as:

```javascript
function getNumber() {
  return Promise.resolve(42);
}
```

So when you call the function:

```javascript
console.log(getNumber());
```

Output:

```
Promise { 42 }
```

This behavior surprises many beginners.

---

# 3. Implicit Promise Wrapping

The automatic wrapping of returned values inside a Promise is called:

> **Implicit Promise Wrapping**

This means developers do not need to manually write `Promise.resolve()` inside async functions.

JavaScript handles it automatically.

---

## Three Possible Outcomes

Inside an async function, three things can happen:

| Code Inside Function | Promise Result                    |
| -------------------- | --------------------------------- |
| `return value`       | Promise resolves with that value  |
| `throw error`        | Promise rejects with that error   |
| nothing returned     | Promise resolves with `undefined` |

---

## Example

```javascript
async function sum(a, b) {
  return a + b;
}

sum(3, 4).then(result => console.log(result));
```

Output:

```
7
```

Here:

```
return a + b
```

is internally converted to:

```
Promise.resolve(a + b)
```

---

# 4. Calling an Async Function

Since async functions return **Promises**, you cannot directly access the returned value.

Instead, you must **handle the Promise**.

There are two common ways to do this.

---

# Method 1 — Using `.then()`

```javascript
async function greet() {
  return "Hello";
}

greet().then(result => {
  console.log(result);
});
```

Output:

```
Hello
```

This is the traditional **Promise handling approach**.

---

# Method 2 — Using `await` (Preferred)

`await` pauses the execution of the async function until the Promise resolves.

```javascript
async function greet() {
  return "Hello";
}

async function main() {
  const result = await greet();
  console.log(result);
}

main();
```

Output:

```
Hello
```

---

## Important Rule

`await` can **only be used inside an async function**.

Incorrect:

```javascript
const result = await greet(); // Syntax error
```

Correct:

```javascript
async function run() {
  const result = await greet();
}
```

---

# 5. How `await` Actually Works

When JavaScript encounters an `await` statement, the following steps occur:

1. Execution of the **current async function pauses**
2. The Promise begins resolving in the background
3. JavaScript continues running other code
4. When the Promise resolves, execution resumes
5. The resolved value is returned

Important point:

> `await` pauses only the **current async function**, not the entire JavaScript program.

This makes async code **non-blocking**.

---

# 6. Normal Function vs Async Function

Below is a comparison between normal functions and async functions.

| Feature          | Normal Function | Async Function         |
| ---------------- | --------------- | ---------------------- |
| Return type      | Any value       | Always returns Promise |
| Promise creation | Manual          | Automatic              |
| Async handling   | `.then()`       | `await`                |
| Readability      | Less readable   | More readable          |
| Error handling   | `.catch()`      | `try/catch`            |

---

## Example Comparison

### Promise Style

```javascript
function fetchUser() {
  return fetch("/user")
    .then(res => res.json())
    .then(data => data.name);
}
```

### Async / Await Style

```javascript
async function fetchUser() {
  const res = await fetch("/user");
  const data = await res.json();
  return data.name;
}
```

Both versions do the same thing, but the async version is **easier to read and maintain**.

---

# 7. Error Handling with Async Functions

When an error occurs inside an async function, the Promise becomes **rejected**.

Instead of using `.catch()`, async functions usually use **try/catch blocks**.

---

## Example

```javascript
async function fetchData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}
```

Benefits:

* Cleaner error handling
* Looks similar to synchronous code
* Easier debugging

---


> An async function is a function declared with the `async` keyword that always returns a Promise. Any value returned from the function is automatically wrapped inside a resolved Promise, a behavior known as implicit Promise wrapping. Inside async functions, we can use the `await` keyword to pause execution until a Promise resolves, allowing asynchronous code to be written in a synchronous-looking way. Errors inside async functions can be handled using try/catch blocks.

---