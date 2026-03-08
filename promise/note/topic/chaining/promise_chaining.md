# Promise Chaining — Complete Guide

---

## What is Chaining?

Before we start — a simple real life example.

Think of an **assembly line** in a factory:

```
Raw Steel → Cut → Shape → Paint → Polish → Final Car 🚗
```

Each step:
- Takes the output of the previous step
- Does its own work
- Passes the result to the next step

**Promise chaining is exactly this.** Each `.then()` is one station on the assembly line.

---
---

# 6.1 Why Chaining Exists

## The Problem It Solves

Remember callback hell?

```javascript
// callback hell — grows sideways 😱
getUser(function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            getLikes(comments[0].id, function(likes) {
                console.log(likes); // buried 4 levels deep
            });
        });
    });
});
```

Chaining fixes this completely:

```javascript
// promise chaining — reads top to bottom ✅
getUser()
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => getLikes(comments[0].id))
    .then(likes => console.log(likes))
    .catch(err => console.log(err));
```

Same 4 steps. But now it reads like a **shopping list** — straight down, one item at a time.

---

## Why It Works — The Key Insight

Every single `.then()` **returns a brand new Promise**.

```javascript
const p1 = getUser();           // Promise 1
const p2 = p1.then(getPost);    // Promise 2 — new Promise!
const p3 = p2.then(getComment); // Promise 3 — new Promise!
```

Because `.then()` always returns a Promise, you can always attach another `.then()` to it. That's what makes chaining possible.

---
---

# 6.2 How `.then()` Works

## The Basic Idea

`.then()` takes a function. That function receives the resolved value. Whatever that function **returns** gets passed to the **next** `.then()`.

```javascript
promise
    .then(function(value) {
        // value comes FROM the previous step
        // whatever you return goes TO the next step
        return something;
    })
    .then(function(something) {
        // got the something from previous step
    });
```

---

## Simple Example Step by Step

```javascript
const promise = new Promise(function(resolve, reject) {
    resolve(1); // starts with value 1
});

promise
    .then(function(value) {
        console.log("Step 1 got:", value); // 1
        return value + 1;                  // passes 2 forward
    })
    .then(function(value) {
        console.log("Step 2 got:", value); // 2
        return value + 1;                  // passes 3 forward
    })
    .then(function(value) {
        console.log("Step 3 got:", value); // 3
        return value + 1;                  // passes 4 forward
    })
    .then(function(value) {
        console.log("Step 4 got:", value); // 4
    });
```

**Output:**
```
Step 1 got: 1
Step 2 got: 2
Step 3 got: 3
Step 4 got: 4
```

Each step receives the value, does something with it, and passes the result forward. Like a relay race 🏃→🏃→🏃→🏃

---

## Visual of How Values Flow

```
resolve(1)
    │
    ▼
.then(value => value + 1)   value=1,  returns 2
    │
    ▼
.then(value => value + 1)   value=2,  returns 3
    │
    ▼
.then(value => value + 1)   value=3,  returns 4
    │
    ▼
.then(value => ...)         value=4
```

Value flows **downward** through each step like water through pipes.

---
---

# 6.3 Returning Values in `.then()`

## Three Things You Can Return

Inside `.then()` you can return:
```
1. A plain value    (number, string, object)
2. A Promise        (covered in 6.4)
3. Nothing          (next .then() gets undefined)
```

---

## Returning a Plain Value

When you return a plain value, the next `.then()` gets it immediately:

```javascript
Promise.resolve(10)
    .then(function(num) {
        console.log("Got:", num);   // 10
        return num * 2;             // return plain number
    })
    .then(function(num) {
        console.log("Got:", num);   // 20
        return num * 2;             // return plain number
    })
    .then(function(num) {
        console.log("Got:", num);   // 40
    });
```

**Output:**
```
Got: 10
Got: 20
Got: 40
```

---

## Returning an Object

```javascript
Promise.resolve("Chandan")
    .then(function(name) {
        // return a richer object
        return {
            name: name,
            role: "Developer",
            level: "Senior"
        };
    })
    .then(function(user) {
        // got the full object
        console.log(user.name);  // Chandan
        console.log(user.role);  // Developer
        console.log(user.level); // Senior
    });
```

**Output:**
```
Chandan
Developer
Senior
```

---

## Returning Nothing

If you return nothing, the next `.then()` gets `undefined`:

```javascript
Promise.resolve("hello")
    .then(function(value) {
        console.log(value); // "hello"
        // forgot to return something!
    })
    .then(function(value) {
        console.log(value); // undefined ← because nothing was returned
    });
```

**Output:**
```
hello
undefined
```

Always return something if the next step needs it!

---
---

# 6.4 Returning Promises in `.then()`

## This is The Most Important Part of Chaining

This is where the real power is. When you return a **Promise** from `.then()`, the chain **waits** for that Promise to settle before moving forward.

```javascript
.then(function(value) {
    return new Promise(...); // chain WAITS for this to settle
})
.then(function(result) {
    // only runs AFTER the above Promise settled
})
```

---

## Why This Matters — The Problem Without It

What if each step takes time? Like real API calls?

```javascript
// WRONG WAY — not returning the Promise
getUser()
    .then(function(user) {
        getPosts(user.id); // ← NOT returned!
    })
    .then(function(posts) {
        console.log(posts); // undefined! 😱
        // chain didn't wait for getPosts to finish
    });
```

Because `getPosts()` wasn't returned, the chain didn't wait. It just moved on. `posts` is undefined.

---

## The Right Way — Return the Promise

```javascript
// CORRECT WAY — return the Promise
getUser()
    .then(function(user) {
        return getPosts(user.id); // ← RETURNED ✅
    })
    .then(function(posts) {
        console.log(posts); // actual posts data ✅
        // chain waited for getPosts to finish
    });
```

Returning the Promise tells the chain: **"Wait for this before continuing."**

---

## Full Real World Example

```javascript
// three async functions — each returns a Promise
function getUser(id) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log("✅ Got user");
            resolve({ id: id, name: "Chandan" });
        }, 1000);
    });
}

function getPosts(userId) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log("✅ Got posts");
            resolve([
                { id: 1, title: "Learning Promises", userId },
                { id: 2, title: "Async JS is fun", userId }
            ]);
        }, 1000);
    });
}

function getComments(postId) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log("✅ Got comments");
            resolve([
                { id: 1, text: "Great post!", postId },
                { id: 2, text: "Very helpful", postId }
            ]);
        }, 1000);
    });
}


// CHAINING — each step waits for the previous one
getUser(1)
    .then(function(user) {
        console.log("User:", user.name);
        return getPosts(user.id);        // return Promise → chain waits
    })
    .then(function(posts) {
        console.log("First post:", posts[0].title);
        return getComments(posts[0].id); // return Promise → chain waits
    })
    .then(function(comments) {
        console.log("First comment:", comments[0].text);
    })
    .catch(function(err) {
        console.log("Error:", err);
    });
```

**Output:**
```
✅ Got user
User: Chandan
  ⏳ 1 second...
✅ Got posts
First post: Learning Promises
  ⏳ 1 second...
✅ Got comments
First comment: Great post!
```

Each step waits. Each step gets real data. Each step passes it forward.

---

## Visual — What Returning a Promise Does

```
.then(user => return getPosts())
              │
              │  chain PAUSES here
              │  waits for getPosts to settle
              │
              ▼ (1 second later)
.then(posts => ...)   ← NOW this runs, with real posts data
```

Without `return`:
```
.then(user => getPosts())   ← no return
              │
              │  chain does NOT wait
              │  immediately moves on
              ▼
.then(posts => ...)   ← runs immediately with undefined 😱
```

---
---

# 6.5 Error Propagation

## What is Error Propagation?

Propagation means **spreading** or **travelling**. Error propagation means:

```
If any step in the chain throws an error or rejects
→ the error SKIPS all remaining .then() steps
→ and falls directly into .catch()
```

Like dropping a ball down stairs — it doesn't stop at each step, it just falls all the way to the bottom.

---

## Simple Example

```javascript
Promise.resolve("start")
    .then(function(value) {
        console.log("Step 1:", value);  // ✅ runs
        return "step 1 done";
    })
    .then(function(value) {
        console.log("Step 2:", value);  // ✅ runs
        throw new Error("Something broke in step 2!"); // 💥 error here
    })
    .then(function(value) {
        console.log("Step 3:", value);  // ❌ SKIPPED
    })
    .then(function(value) {
        console.log("Step 4:", value);  // ❌ SKIPPED
    })
    .catch(function(error) {
        console.log("Caught:", error.message); // ✅ lands here
    });
```

**Output:**
```
Step 1: start
Step 2: step 1 done
Caught: Something broke in step 2!
```

Steps 3 and 4 are completely skipped. The error fell straight through to `.catch()`.

---

## Visual of Error Propagation

```
.then()   ✅ runs normally
    │
.then()   ✅ runs, then throws error 💥
    │
    │  error starts falling...
    │
.then()   ❌ SKIPPED
    │
.then()   ❌ SKIPPED
    │
.then()   ❌ SKIPPED
    │
.catch()  ✅ catches the error here
```

---

## Real World Example — Login Flow

```javascript
function getUser(id) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (id === 1) {
                resolve({ id: 1, name: "Chandan", active: true });
            } else {
                reject(new Error("User not found"));
            }
        }, 1000);
    });
}

function checkIfActive(user) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (user.active) {
                resolve(user);
            } else {
                reject(new Error("User account is disabled"));
            }
        }, 1000);
    });
}

function loadDashboard(user) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve("🎉 Welcome to dashboard, " + user.name + "!");
        }, 1000);
    });
}


// Test 1 — everything works
getUser(1)
    .then(user => checkIfActive(user))
    .then(user => loadDashboard(user))
    .then(message => console.log(message))
    .catch(err => console.log("Failed:", err.message));

// Test 2 — user not found
getUser(99)
    .then(user => checkIfActive(user))   // skipped
    .then(user => loadDashboard(user))   // skipped
    .then(message => console.log(message)) // skipped
    .catch(err => console.log("Failed:", err.message)); // catches here
```

**Output:**
```
⏳ 3 seconds...
🎉 Welcome to dashboard, Chandan!
Failed: User not found
```

---
---

# 6.6 `.catch()` Behavior

## .catch() is More Powerful Than You Think

Most people think `.catch()` only goes at the end. But it's more flexible than that.

---

## Behavior 1 — Catches Any Error Above It

```javascript
Promise.resolve("start")
    .then(function() {
        throw new Error("broke here"); // error from step 1
    })
    .then(function() {
        console.log("step 2"); // skipped
    })
    .catch(function(err) {
        console.log("Caught:", err.message); // catches step 1's error
    });
```

**Output:**
```
Caught: broke here
```

---

## Behavior 2 — Chain CONTINUES After `.catch()`

This surprises most people. After `.catch()` handles an error, the chain **continues** with the next `.then()`:

```javascript
Promise.reject("something went wrong")
    .catch(function(err) {
        console.log("Caught:", err);        // handles error
        return "recovered!";               // returns a value
    })
    .then(function(value) {
        console.log("Continuing:", value); // chain continues! ✅
    });
```

**Output:**
```
Caught: something went wrong
Continuing: recovered!
```

`.catch()` caught the error, handled it, returned a value, and the chain kept going. Like a safety net that catches you and puts you back on the path.

---

## Behavior 3 — Catching in the Middle

You can put `.catch()` in the **middle** of a chain to handle errors from specific steps:

```javascript
getUser()
    .then(user => getPosts(user.id))
    .catch(function(err) {
        // handles errors from getUser OR getPosts
        console.log("User/Post error:", err);
        return []; // return empty array to continue chain
    })
    .then(function(posts) {
        // runs even if there was an error above
        // posts will be [] if error occurred
        return getComments(posts[0]?.id);
    })
    .catch(function(err) {
        // handles errors from getComments
        console.log("Comments error:", err);
    });
```

---

## Behavior 4 — Unhandled Rejection (No .catch())

If you have NO `.catch()` and a Promise rejects:

```javascript
Promise.reject("something broke");
// No .catch() anywhere!
```

**Output:**
```
UnhandledPromiseRejectionWarning: something broke
```

Your app gets an ugly warning. Always add `.catch()`.

---
---

# 6.7 `.finally()` Usage

## What is `.finally()`?

`.finally()` runs **no matter what** — whether the Promise fulfilled or rejected. It always runs last.

```javascript
promise
    .then(...)    // runs on success
    .catch(...)   // runs on failure
    .finally(...) // ALWAYS runs, no matter what
```

---

## Most Common Use Cases

```
1. Hide a loading spinner
2. Close a database connection
3. Enable a disabled button
4. Log that operation finished
5. Clean up temporary data
```

---

## Simple Example

```javascript
function fetchData() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Here is the data!");
        }, 2000);
    });
}

console.log("🔄 Loading...");

fetchData()
    .then(function(data) {
        console.log("✅ Data:", data);
    })
    .catch(function(err) {
        console.log("❌ Error:", err);
    })
    .finally(function() {
        console.log("🔄 Loading complete — hide spinner");
        // this ALWAYS runs, success or failure
    });
```

**Output:**
```
🔄 Loading...
  ⏳ 2 seconds...
✅ Data: Here is the data!
🔄 Loading complete — hide spinner
```

---

## Real World Example — Button State

```javascript
function submitForm(data) {

    // disable button before starting
    console.log("🔘 Button disabled — submitting...");

    return saveToServer(data)
        .then(function(result) {
            console.log("✅ Saved successfully:", result);
        })
        .catch(function(err) {
            console.log("❌ Save failed:", err);
        })
        .finally(function() {
            // ALWAYS re-enable the button
            // whether save succeeded or failed
            console.log("🔘 Button enabled again");
        });
}
```

Without `.finally()`, if the save fails, you'd need to re-enable the button in BOTH `.then()` AND `.catch()`:

```javascript
// WITHOUT .finally() — duplicated code 😤
.then(function() {
    console.log("success");
    enableButton(); // have to put it here
})
.catch(function() {
    console.log("failed");
    enableButton(); // AND here — duplicate!
})

// WITH .finally() — clean ✅
.then(function() {
    console.log("success");
})
.catch(function() {
    console.log("failed");
})
.finally(function() {
    enableButton(); // once, here. Done.
})
```

---

## Key Rules of `.finally()`

```javascript
// Rule 1 — receives NO value
Promise.resolve("hello")
    .finally(function(value) {
        console.log(value); // undefined — gets nothing
    });

// Rule 2 — passes value THROUGH (doesn't change it)
Promise.resolve("hello")
    .finally(function() {
        return "world"; // this is IGNORED
    })
    .then(function(value) {
        console.log(value); // "hello" — original value passed through
    });

// Rule 3 — if .finally() throws, error propagates
Promise.resolve("hello")
    .finally(function() {
        throw new Error("finally broke!");
    })
    .catch(function(err) {
        console.log(err.message); // "finally broke!"
    });
```

---

## Complete Chaining Example — All Together

```javascript
function placeOrder(item) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve({ item, orderId: 101 }), 1000);
    });
}

function processPayment(order) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve({ ...order, paid: true }), 1000);
    });
}

function sendConfirmation(order) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve("📧 Confirmation sent for order " + order.orderId), 1000);
    });
}


console.log("🔄 Processing your order...");

placeOrder("Pepperoni Pizza")
    .then(function(order) {
        console.log("✅ Order placed:", order.item);
        return processPayment(order);           // return Promise → wait
    })
    .then(function(order) {
        console.log("✅ Payment done. Paid:", order.paid);
        return sendConfirmation(order);         // return Promise → wait
    })
    .then(function(message) {
        console.log("✅", message);
    })
    .catch(function(err) {
        console.log("❌ Something went wrong:", err.message);
    })
    .finally(function() {
        console.log("— Order process complete —");
    });
```

**Output:**
```
🔄 Processing your order...
  ⏳ 1 second...
✅ Order placed: Pepperoni Pizza
  ⏳ 1 second...
✅ Payment done. Paid: true
  ⏳ 1 second...
✅ 📧 Confirmation sent for order 101
— Order process complete —
```

---

## The Complete Chaining Summary

```
┌──────────────────────────────────────────────────────┐
│                PROMISE CHAINING                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  WHY IT EXISTS                                       │
│  → Replaces nested callback hell                    │
│  → Reads top to bottom like plain English           │
│                                                      │
│  HOW .then() WORKS                                   │
│  → Receives value from previous step                │
│  → Returns value to next step                       │
│  → Each .then() returns a new Promise               │
│                                                      │
│  RETURNING VALUES                                    │
│  → Plain value → next .then() gets it immediately   │
│  → Promise → chain WAITS for it to settle           │
│  → Nothing → next .then() gets undefined            │
│                                                      │
│  ERROR PROPAGATION                                   │
│  → Error skips all .then() steps                    │
│  → Falls straight to .catch()                       │
│                                                      │
│  .catch() BEHAVIOR                                   │
│  → Catches any error from above                     │
│  → Chain continues after .catch()                   │
│  → Can be placed in the middle                      │
│  → Always add one — unhandled rejections are bad    │
│                                                      │
│  .finally() USAGE                                    │
│  → Always runs — success or failure                 │
│  → Gets no value                                    │
│  → Passes original value through                    │
│  → Perfect for cleanup tasks                        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

**One line to remember everything:**

> In a Promise chain, each `.then()` **receives, transforms, and passes forward** — errors **skip everything and fall to `.catch()`** — and `.finally()` **always runs at the end no matter what**.