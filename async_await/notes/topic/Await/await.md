# Complete Guide to `await` in JavaScript

---

## 1. What `await` Does

`await` does one simple job — it **unwraps a Promise** and gives you the value inside it, instead of the Promise object itself.

```js
async function main() {
  const result = await Promise.resolve(42);
  console.log(result); // 42  ✅ (not Promise { 42 })
}
main();
```

Without `await` you'd get the Promise object. With `await` you get the actual value.

**Two strict rules:**
- `await` can **only** be used inside an `async` function
- `await` only makes sense on something that returns a Promise (though it won't crash on non-Promises — more on that later)

---

## 2. How `await` Pauses Execution

`await` pauses **only the async function it's inside** — not the entire program. JavaScript continues running other code while waiting.

```js
async function main() {
  console.log("1 - before await");
  const result = await Promise.resolve("hello");
  console.log("3 - after await:", result);
}

main();
console.log("2 - outside, runs immediately");
```

**Output:**
```
1 - before await
2 - outside, runs immediately
3 - after await: hello
```

### Why this order?

```
main() starts
    ↓
logs "1 - before await"
    ↓
hits await → pauses main(), gives control back to JS engine
    ↓
JS engine runs next line → logs "2 - outside"
    ↓
Promise resolves → main() resumes
    ↓
logs "3 - after await"
```

Think of `await` like a **polite pause** — your function steps aside, lets other things run, then picks up where it left off once the Promise resolves.

---

## 3. `await` and Promise Resolution

`await` waits for a Promise to **settle** (either resolve or reject), then acts accordingly.

```js
function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "Riya" }), 1000);
  });
}

async function main() {
  console.log("Fetching...");
  const user = await getUser();  // pauses 1 second here
  console.log(user);             // { name: "Riya" }
}

main();
```

### The three states `await` deals with:

| Promise State | What `await` does |
|---|---|
| Pending | Keeps waiting |
| Resolved | Unwraps the value, resumes function |
| Rejected | Throws an error at that line |

### Chaining with `await` — clean vs messy:

```js
// Old .then() chain — hard to read
fetch("/api/user")
  .then(res => res.json())
  .then(data => data.name)
  .then(name => console.log(name));

// await version — reads top to bottom
async function main() {
  const res  = await fetch("/api/user");
  const data = await res.json();
  console.log(data.name);
}
```

Both do the exact same thing. `await` just makes the flow obvious.

---

## 4. `await` With Rejected Promises

When a Promise rejects, `await` **throws an error** at that exact line. If you don't catch it, it becomes an unhandled Promise rejection.

### Without error handling — dangerous ❌
```js
async function main() {
  const data = await Promise.reject(new Error("Server crashed"));
  console.log(data); // never runs
}

main();
// UnhandledPromiseRejection: Server crashed
```

### With `try/catch` — correct ✅
```js
async function main() {
  try {
    const data = await Promise.reject(new Error("Server crashed"));
    console.log(data);         // skipped
  } catch (error) {
    console.log("Caught:", error.message); // ✅ Caught: Server crashed
  }
}

main();
```

### With `.catch()` — also valid ✅
```js
async function main() {
  const data = await Promise.reject(new Error("Failed")).catch(e => {
    console.log("Caught:", e.message); // ✅
    return "fallback value";           // return a default
  });
  console.log(data); // "fallback value"
}

main();
```

### Real-world pattern — always wrap API calls:
```js
async function fetchData() {
  try {
    const res  = await fetch("https://api.example.com/data");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error.message);
    return null; // graceful fallback
  }
}
```

---

## 5. `await` With Non-Promise Values

If you `await` something that is **not** a Promise — a number, string, object — JavaScript wraps it in `Promise.resolve()` and resolves it immediately. No error, no waiting.

```js
async function main() {
  const a = await 42;
  const b = await "hello";
  const c = await { name: "Dev" };
  const d = await null;

  console.log(a); // 42
  console.log(b); // "hello"
  console.log(c); // { name: "Dev" }
  console.log(d); // null
}

main();
```

### What JS does internally:
```js
await 42
// becomes → await Promise.resolve(42)
// resolves immediately with 42
```

### Practical implication:

This is why `await` on a regular (non-async) function still works:

```js
function regularFn() {
  return "just a string"; // not a Promise
}

async function main() {
  const val = await regularFn(); // works fine
  console.log(val); // "just a string"
}
```

It's **not wrong**, just unnecessary. A sign of good code is only using `await` where you actually need to wait.

---

## 6. `await` and the Microtask Queue

This is the deep one — and a **favourite senior interview topic** even for junior roles.

### First, understand the JavaScript execution model:

```
┌─────────────────────────────┐
│        Call Stack           │  ← runs synchronous code
├─────────────────────────────┤
│      Microtask Queue        │  ← Promises, await (HIGH priority)
├─────────────────────────────┤
│      Macrotask Queue        │  ← setTimeout, setInterval (LOW priority)
└─────────────────────────────┘
```

**Order of execution:**
1. Run all synchronous code (call stack)
2. Run **all** microtasks (Promise callbacks, await continuations)
3. Run **one** macrotask (setTimeout etc.)
4. Repeat from step 2

### `await` always goes through the microtask queue:

```js
console.log("1");

async function main() {
  console.log("2");
  await Promise.resolve();   // goes to microtask queue
  console.log("4");          // runs after sync code finishes
}

main();
console.log("3");
```

**Output:**
```
1
2
3
4
```

### Why `"3"` before `"4"`?

```
Call Stack runs:
  → logs "1"
  → calls main()
    → logs "2"
    → hits await → schedules "4" in microtask queue → exits main()
  → logs "3"  (sync code done)

Microtask queue runs:
  → resumes main() → logs "4"
```

### The tricky one — `await` vs `setTimeout`:

```js
console.log("1 - sync");

setTimeout(() => console.log("4 - macrotask"), 0);

async function main() {
  await Promise.resolve();
  console.log("3 - microtask");
}

main();
console.log("2 - sync");
```

**Output:**
```
1 - sync
2 - sync
3 - microtask
4 - macrotask
```

Even though `setTimeout` has `0ms` delay, **microtasks always run before macrotasks**. `await` (microtask) beats `setTimeout` (macrotask) every time.

### Full mental model:

```
Synchronous code    →  runs first, always
     ↓
await / Promises    →  microtask queue, runs next
     ↓
setTimeout          →  macrotask queue, runs last
```

---

## Complete Cheat Sheet

| Topic | Key rule |
|---|---|
| What `await` does | Unwraps a Promise, gives you the value |
| Pausing execution | Pauses only the async function, not the whole program |
| Promise resolution | Waits for resolve, then continues |
| Rejected Promises | Throws error — always use `try/catch` |
| Non-Promise values | Wrapped in `Promise.resolve()`, resolves instantly |
| Microtask queue | `await` continuations run before `setTimeout`, after sync code |

---
