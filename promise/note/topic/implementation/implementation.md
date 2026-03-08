# Promise Syntax — Complete Guide

---

## The Big Picture First

Before we touch any code, understand this:

```
Creating a Promise  = Starting a task and saying
                      "I'll let you know when it's done"

Consuming a Promise = Saying "when it's done,
                      here's what I want to do with the result"
```

These are **two separate things**. Creating and consuming. Let's learn both.

---
---

# 4.1 Creating a Promise

## The Basic Structure

```javascript
const promise = new Promise(function(resolve, reject) {
    // your async task goes here
});
```

Let's break down **every single word**:

```
new Promise     → create a brand new Promise object

function(...)   → this function runs IMMEDIATELY when Promise is created
                  it's called the "executor function"

resolve         → a function YOU call when task SUCCEEDS ✅

reject          → a function YOU call when task FAILS ❌
```

---

## Visual of what's happening:

```
new Promise(function(resolve, reject) {
│                │         │
│                │         └── call this if something goes wrong ❌
│                │
│                └──────────── call this if everything worked ✅
│
└── JavaScript gives you these two functions automatically
    You just decide WHEN to call them
```

---

## The Executor Function Runs Immediately

This surprises beginners. The function you pass to `new Promise` runs **right away**:

```javascript
console.log("1. Before promise");

const promise = new Promise(function(resolve, reject) {
    console.log("2. Inside executor — runs immediately!");
    resolve("done");
});

console.log("3. After promise");
```

**Output:**
```
1. Before promise
2. Inside executor — runs immediately!
3. After promise
```

The executor doesn't wait. It starts instantly.

---
---

# 4.2 The Resolve Function ✅

## What is resolve?

`resolve` is a function that JavaScript gives you inside the Promise. When you call it, you're saying:

```
"The task is complete. Here is the result."
```

---

## Marking Operation as Successful

```javascript
const promise = new Promise(function(resolve, reject) {

    setTimeout(function() {
        // task finished successfully
        resolve(); // ← marks the Promise as FULFILLED ✅

    }, 2000);

});
```

Just calling `resolve()` is enough to say "it worked".

---

## Passing a Result Value

You can pass **any value** into resolve — string, number, object, array:

```javascript
// passing a string
resolve("Success!");

// passing a number
resolve(42);

// passing an object (most common in real apps)
resolve({
    id: 1,
    name: "sam",
    role: "Developer"
});

// passing an array
resolve([1, 2, 3, 4, 5]);
```

Whatever you pass into `resolve()` — **that becomes the value in `.then()`**:

```javascript
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve({ name: "sam", role: "Developer" }); // passing an object
    }, 1000);
});

promise.then(function(value) {
    // value = whatever you passed into resolve()
    console.log(value.name); // "sam"
    console.log(value.role); // "Developer"
});
```

Think of it like this:

```
resolve("Hello!")
          │
          │ travels through the Promise
          │
          ▼
.then(function(value) {
    // value = "Hello!"
})
```

---
---

# 4.3 The Reject Function ❌

## What is reject?

`reject` is the opposite of resolve. When you call it, you're saying:

```
"The task failed. Here is the reason why."
```

---

## Marking Operation as Failed

```javascript
const promise = new Promise(function(resolve, reject) {

    setTimeout(function() {
        // something went wrong
        reject(); // ← marks the Promise as REJECTED ❌

    }, 2000);

});
```

---

## Passing an Error Reason

Just like resolve, you can pass a value into reject — usually an **error message** or an **Error object**:

```javascript
// passing a string message
reject("Something went wrong!");

// passing an Error object (best practice)
reject(new Error("User not found"));

// passing an object with details
reject({
    code: 404,
    message: "User not found"
});
```

Whatever you pass into `reject()` — **that becomes the value in `.catch()`**:

```javascript
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        reject("Server is down!"); // passing error reason
    }, 1000);
});

promise.catch(function(error) {
    // error = whatever you passed into reject()
    console.log(error); // "Server is down!"
});
```

The flow:

```
reject("Server is down!")
          │
          │ travels through the Promise
          │
          ▼
.catch(function(error) {
    // error = "Server is down!"
})
```

---

## resolve vs reject — Side by Side

```javascript
const promise = new Promise(function(resolve, reject) {

    const everythingWorked = true;

    if (everythingWorked) {
        resolve("Here is your data ✅"); // success path
    } else {
        reject("Something broke ❌");    // failure path
    }

});
```

```
everythingWorked = true  → resolve() called → .then() runs
everythingWorked = false → reject() called  → .catch() runs
```

Only **one** of them ever runs. Never both.

---
---

# 4.4 Consuming a Promise

## Creating vs Consuming

```
CREATING  = making the Promise (the kitchen making food)
CONSUMING = using the result  (you eating the food)
```

You consume a Promise using:

```javascript
promise
    .then(function(result) { })   // runs if resolved ✅
    .catch(function(error) { })   // runs if rejected ❌
    .finally(function() { })      // runs ALWAYS, no matter what
```

---

## .then() — Handle Success

`.then()` runs when the Promise is **fulfilled**:

```javascript
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve("Data loaded!");
    }, 1000);
});

promise.then(function(result) {
    console.log(result); // "Data loaded!"
});
```

---

## .catch() — Handle Failure

`.catch()` runs when the Promise is **rejected**:

```javascript
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        reject("Failed to load data!");
    }, 1000);
});

promise.catch(function(error) {
    console.log(error); // "Failed to load data!"
});
```

---

## .finally() — Runs No Matter What

`.finally()` runs whether the Promise **succeeded OR failed**. Useful for cleanup tasks like hiding a loading spinner:

```javascript
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve("Done!");
    }, 1000);
});

promise
    .then(function(result) {
        console.log("Success:", result);
    })
    .catch(function(error) {
        console.log("Error:", error);
    })
    .finally(function() {
        console.log("Always runs — hide loading spinner here 🔄");
    });
```

**Output:**
```
Success: Done!
Always runs — hide loading spinner here 🔄
```

---

## The Complete Flow Diagram

```
new Promise(resolve, reject)
            │
            │ executor runs immediately
            │
     ┌──────┴──────┐
     │             │
  resolve()     reject()
     │             │
     ▼             ▼
  .then()       .catch()
  runs ✅       runs ❌
     │             │
     └──────┬──────┘
            │
         .finally()
         always runs
```

---
---

# 4.5 Basic Example — Putting It All Together

## Example 1 — Simple Login System

```javascript
// CREATING THE PROMISE
function loginUser(username, password) {
    return new Promise(function(resolve, reject) {

        console.log("⏳ Checking credentials...");

        setTimeout(function() {

            // fake check — in real app this hits a server
            if (username === "sam" && password === "1234") {
                resolve({                        // ✅ success
                    username: username,
                    token: "abc123xyz",
                    role: "admin"
                });
            } else {
                reject("❌ Wrong username or password"); // failure
            }

        }, 2000);

    });
}


// CONSUMING THE PROMISE
loginUser("sam", "1234")
    .then(function(user) {
        console.log("Welcome,", user.username);
        console.log("Your role:", user.role);
        console.log("Token:", user.token);
    })
    .catch(function(error) {
        console.log("Login failed:", error);
    })
    .finally(function() {
        console.log("Login attempt complete");
    });
```

**Output (correct password):**
```
⏳ Checking credentials...
  ⏳ 2 seconds...
Welcome, sam
Your role: admin
Token: abc123xyz
Login attempt complete
```

**Output (wrong password):**
```
⏳ Checking credentials...
  ⏳ 2 seconds...
Login failed: ❌ Wrong username or password
Login attempt complete
```

---

## Example 2 — Food Order (Full Flow)

```javascript
// CREATING
function orderFood(item, available) {
    return new Promise(function(resolve, reject) {

        console.log("📱 Order placed for:", item);
        console.log("⏳ Kitchen is preparing...");

        setTimeout(function() {

            if (available) {
                resolve("🍔 " + item + " is ready! Enjoy!");
            } else {
                reject("😢 Sorry, " + item + " is sold out");
            }

        }, 2000);

    });
}


// CONSUMING
orderFood("Burger", true)
    .then(function(message) {
        console.log("✅", message);
    })
    .catch(function(error) {
        console.log("❌", error);
    })
    .finally(function() {
        console.log("🔄 Order process finished");
    });
```

**Output (available):**
```
📱 Order placed for: Burger
⏳ Kitchen is preparing...
  ⏳ 2 seconds...
✅ 🍔 Burger is ready! Enjoy!
🔄 Order process finished
```

**Output (not available):**
```
📱 Order placed for: Burger
⏳ Kitchen is preparing...
  ⏳ 2 seconds...
❌ 😢 Sorry, Burger is sold out
🔄 Order process finished
```

---

## Everything Mapped Together

```
┌─────────────────────────────────────────────────┐
│              PROMISE SYNTAX SUMMARY             │
├─────────────────────────────────────────────────┤
│                                                 │
│  CREATING                                       │
│  new Promise(function(resolve, reject) {        │
│      // your task here                          │
│  })                                             │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  RESOLVE ✅                                     │
│  → Call when task SUCCEEDS                      │
│  → Pass the result value                        │
│  → Triggers .then()                             │
│                                                 │
│  REJECT ❌                                      │
│  → Call when task FAILS                         │
│  → Pass the error reason                        │
│  → Triggers .catch()                            │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  CONSUMING                                      │
│  .then(result => ...)   → success handler       │
│  .catch(error => ...)   → failure handler       │
│  .finally(() => ...)    → always runs           │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  GOLDEN RULES                                   │
│  → resolve and reject are given by JavaScript  │
│  → Only ONE of them ever runs                  │
│  → Whatever you pass in → comes out the other  │
│    side in .then() or .catch()                  │
│  → .finally() always runs, passes nothing      │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

**One line to remember:**

> `resolve()` sends your result to `.then()` ✅ — `reject()` sends your error to `.catch()` ❌ — and `.finally()` always runs no matter what 🔄