# Promise Lifecycle — Complete Guide

---

## What is a Lifecycle?

Everything has a lifecycle. A lifecycle is just:

```
Birth → Life → Death
```

For a human:
```
Baby → Adult → Old age
```

For a Promise:
```
Pending → Fulfilled OR Rejected
```

A Promise is **born**, it **lives** (does its work), then it **settles** forever.

Let's go through every stage.

---
---

# 5.1 Pending State

## What is Pending?

Pending is the **starting state**. Every single Promise starts here. No exceptions.

```
Pending = "I'm working on it... not done yet"
```

Think of it like:
```
You ordered food → "Order Received" ⏳
                    Kitchen is working
                    You don't have food yet
                    This is PENDING
```

---

## Code Example

```javascript
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve("done!");
    }, 3000); // takes 3 seconds
});

// check the state IMMEDIATELY after creating
console.log(promise); // Promise { <pending> }
```

**Output:**
```
Promise { <pending> }
```

Right after creating — before the 3 seconds finish — the Promise is just sitting there in **pending** state. Waiting. Working in the background.

---

## What Happens During Pending?

```
You create the Promise
        ↓
Executor function runs immediately
        ↓
Async task starts in the background
(setTimeout, API call, file reading etc.)
        ↓
Promise just WAITS here in PENDING state
        ↓
Nothing is available yet
No result. No error. Just... waiting.
```

---

## Real Life Analogy ⏳

```
You apply for a job:

Day 1:  Application submitted    → PENDING
Day 2:  Still waiting...         → PENDING
Day 3:  Still waiting...         → PENDING
Day 7:  "You're hired!" OR
        "Sorry, not selected"    → SETTLED
```

From Day 1 to Day 7 — you're in pending. The decision hasn't been made yet. You just wait.

---
---

# 5.2 Fulfilled State

## What is Fulfilled?

Fulfilled means the task **completed successfully**. You have your result. Everything worked.

```
Fulfilled = "Task is done. Here is your result ✅"
```

---

## How Does a Promise Become Fulfilled?

Only one way — someone calls `resolve()` inside the Promise:

```javascript
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve("Here is your data! ✅"); // ← this triggers FULFILLED
    }, 2000);
});
```

The moment `resolve()` is called:
```
PENDING → FULFILLED
```

And it stays fulfilled. Forever.

---

## The Value is Now Available

When a Promise is fulfilled, the value you passed into `resolve()` becomes available in `.then()`:

```javascript
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve({                    // passing this object as result
            name: "Chandan",
            score: 99
        });
    }, 2000);
});

promise.then(function(value) {
    // value = the object we passed into resolve()
    console.log("Name:", value.name);   // Chandan
    console.log("Score:", value.score); // 99
});
```

**Output:**
```
⏳ 2 seconds...
Name: Chandan
Score: 99
```

---

## Visual of Fulfilled State

```
BEFORE (Pending):               AFTER (Fulfilled):

┌─────────────────┐             ┌─────────────────────────┐
│  PROMISE        │             │  PROMISE                │
│                 │             │                         │
│  State: PENDING │  resolve()  │  State: FULFILLED ✅    │
│  Value: empty   │ ──────────▶ │  Value: { name:         │
│                 │             │          "Chandan" }    │
└─────────────────┘             └─────────────────────────┘
```

---

## Real Life Analogy ✅

```
Food delivery:

You placed order     → PENDING ⏳
                        ...waiting...
"Food delivered!"   → FULFILLED ✅
                        Food is at your door
                        You can eat it now
                        Value is available
```

---
---

# 5.3 Rejected State

## What is Rejected?

Rejected means the task **failed**. Something went wrong. You get an error instead of a result.

```
Rejected = "Task failed. Here is what went wrong ❌"
```

---

## How Does a Promise Become Rejected?

Only one way — someone calls `reject()` inside the Promise:

```javascript
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        reject("Server is down! ❌"); // ← this triggers REJECTED
    }, 2000);
});
```

The moment `reject()` is called:
```
PENDING → REJECTED
```

And it stays rejected. Forever.

---

## The Error is Now Available

When a Promise is rejected, the value you passed into `reject()` becomes available in `.catch()`:

```javascript
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        reject("User not found!"); // passing error reason
    }, 2000);
});

promise
    .then(function(value) {
        console.log("Success:", value); // ← NEVER runs
    })
    .catch(function(error) {
        // error = whatever we passed into reject()
        console.log("Error:", error); // "User not found!"
    });
```

**Output:**
```
⏳ 2 seconds...
Error: User not found!
```

`.then()` is completely skipped. Only `.catch()` runs.

---

## Visual of Rejected State

```
BEFORE (Pending):               AFTER (Rejected):

┌─────────────────┐             ┌─────────────────────────┐
│  PROMISE        │             │  PROMISE                │
│                 │             │                         │
│  State: PENDING │  reject()   │  State: REJECTED ❌     │
│  Value: empty   │ ──────────▶ │  Error: "User not       │
│                 │             │          found!"        │
└─────────────────┘             └─────────────────────────┘
```

---

## Real Life Analogy ❌

```
Food delivery:

You placed order        → PENDING ⏳
                           ...waiting...
"Restaurant closed,
 order cancelled!"     → REJECTED ❌
                           No food coming
                           You get the reason why
                           Error is available
```

---
---

# 5.4 State Transition Rules

## The Only Two Allowed Transitions

```
PENDING → FULFILLED   ✅ (allowed)
PENDING → REJECTED    ✅ (allowed)
```

That's it. Only these two. Everything else is impossible.

---

## What is NOT Allowed

```
FULFILLED → REJECTED  ❌ impossible
REJECTED → FULFILLED  ❌ impossible
FULFILLED → PENDING   ❌ impossible
REJECTED → PENDING    ❌ impossible
FULFILLED → FULFILLED ❌ impossible (can't re-resolve)
REJECTED → REJECTED   ❌ impossible (can't re-reject)
```

---

## Proof in Code

```javascript
const promise = new Promise(function(resolve, reject) {

    resolve("First result");   // ✅ this counts
    resolve("Second result");  // 🚫 completely ignored
    reject("Some error");      // 🚫 completely ignored

    // once resolve() is called → state is LOCKED
    // nothing can change it
});

promise
    .then(function(value) {
        console.log("Value:", value);
    })
    .catch(function(error) {
        console.log("Error:", error); // never runs
    });
```

**Output:**
```
Value: First result
```

Only the **first** call counts. Everything after is silently ignored.

---

## Another Proof

```javascript
const promise = new Promise(function(resolve, reject) {

    reject("First error");     // ✅ this counts
    reject("Second error");    // 🚫 ignored
    resolve("Some result");    // 🚫 ignored

});

promise
    .then(function(value) {
        console.log("Value:", value); // never runs
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
```

**Output:**
```
Error: First error
```

---

## The Traffic Light Analogy 🚦

```
A traffic light has states:
  Green → Yellow → Red

Rules:
  It can only move FORWARD
  It cannot jump from Red back to Green randomly
  It follows a fixed, predictable pattern

A Promise is the same:
  PENDING → FULFILLED or REJECTED

Rules:
  It can only move FORWARD
  It cannot go back to PENDING
  It cannot switch from FULFILLED to REJECTED
  Fixed. Predictable. Safe.
```

---

## Why These Rules Exist

These rules exist to make your code **safe and predictable**:

```
Without rules:
  Payment processes → success
  Then somehow fails → charged but no order
  User loses money
  Complete chaos

With Promise rules:
  Payment processes → FULFILLED ✅
  State is LOCKED
  Can never become REJECTED after that
  Can never fire again
  Customer is safe
```

---
---

# 5.5 Promise Settlement

## What Does "Settlement" Mean?

Settlement means the Promise has **finished**. It's no longer pending. It has a final answer.

```
Settled = FULFILLED or REJECTED
Unsettled = PENDING
```

A Promise is settled the moment `resolve()` OR `reject()` is called — whichever comes first.

---

## The Moment of Settlement

```javascript
const promise = new Promise(function(resolve, reject) {

    console.log("1. Promise created — PENDING");

    setTimeout(function() {
        console.log("2. About to settle...");
        resolve("Here is the result!"); // ← SETTLEMENT HAPPENS HERE
        console.log("3. Settled! (resolve was called)");
    }, 2000);

});

promise.then(function(value) {
    console.log("4. .then() runs:", value);
});

console.log("5. This runs while still PENDING");
```

**Output:**
```
1. Promise created — PENDING
5. This runs while still PENDING
  ⏳ 2 seconds...
2. About to settle...
3. Settled! (resolve was called)
4. .then() runs: Here is the result!
```

---

## Settlement is Permanent

Once settled — the Promise remembers its result **forever**. Even if you attach `.then()` AFTER it's already settled, you still get the result:

```javascript
const promise = new Promise(function(resolve, reject) {
    resolve("I settled immediately!");
});

// attaching .then() AFTER the promise already settled
setTimeout(function() {
    promise.then(function(value) {
        console.log(value); // still works! ✅
    });
}, 5000); // 5 seconds AFTER settlement
```

**Output:**
```
⏳ 5 seconds later...
I settled immediately!
```

The Promise remembered its result even after 5 seconds. This is **very different** from callbacks which are lost forever if you miss them.

---

## Full Lifecycle in One Example

```javascript
function fetchUserData(userId) {
    return new Promise(function(resolve, reject) {

        // STATE: PENDING — starts here
        console.log("⏳ State: PENDING — Fetching user", userId);

        setTimeout(function() {

            const users = {
                1: { name: "Chandan", role: "Developer" },
                2: { name: "Riya", role: "Designer" }
            };

            const user = users[userId];

            if (user) {
                // STATE: FULFILLED
                console.log("✅ State: FULFILLED");
                resolve(user);
            } else {
                // STATE: REJECTED
                console.log("❌ State: REJECTED");
                reject("User with id " + userId + " not found");
            }

        }, 2000);

    });
}


// Test 1 — Success path
fetchUserData(1)
    .then(function(user) {
        console.log("Got user:", user.name, "—", user.role);
    })
    .catch(function(error) {
        console.log("Error:", error);
    })
    .finally(function() {
        console.log("— Promise settled —\n");
    });


// Test 2 — Failure path
fetchUserData(99)
    .then(function(user) {
        console.log("Got user:", user.name);
    })
    .catch(function(error) {
        console.log("Error:", error);
    })
    .finally(function() {
        console.log("— Promise settled —\n");
    });
```

**Output:**
```
⏳ State: PENDING — Fetching user 1
⏳ State: PENDING — Fetching user 99
  ⏳ 2 seconds...
✅ State: FULFILLED
Got user: Chandan — Developer
— Promise settled —

❌ State: REJECTED
Error: User with id 99 not found
— Promise settled —
```

---

## The Complete Lifecycle Diagram

```
                    ┌─────────────────┐
                    │                 │
                    │   PENDING ⏳    │  ← every Promise starts here
                    │                 │     task is running
                    │  no value yet   │     nothing available
                    │                 │
                    └────────┬────────┘
                             │
              resolve()      │        reject()
              called ✅      │        called ❌
                             │
          ┌──────────────────┴───────────────────┐
          │                                       │
          ▼                                       ▼
┌──────────────────┐                   ┌──────────────────┐
│                  │                   │                  │
│  FULFILLED ✅    │                   │  REJECTED ❌     │
│                  │                   │                  │
│  task succeeded  │                   │  task failed     │
│  value available │                   │  error available │
│  .then() runs    │                   │  .catch() runs   │
│                  │                   │                  │
│  LOCKED FOREVER  │                   │  LOCKED FOREVER  │
│                  │                   │                  │
└──────────────────┘                   └──────────────────┘
          │                                       │
          └───────────────┬───────────────────────┘
                          │
                          ▼
                  .finally() runs
                  always, no matter what
```

---

## Summary Table

```
┌───────────────┬──────────────────┬────────────────┬───────────────┐
│     STATE     │     MEANING      │   HOW IT        │  WHAT RUNS   │
│               │                  │   HAPPENS       │              │
├───────────────┼──────────────────┼────────────────┼───────────────┤
│               │                  │                 │              │
│  PENDING ⏳   │  Task running    │  Automatically  │  Nothing yet │
│               │  No result yet   │  at the start   │              │
│               │                  │                 │              │
├───────────────┼──────────────────┼────────────────┼───────────────┤
│               │                  │                 │              │
│  FULFILLED ✅ │  Task succeeded  │  resolve()      │  .then()     │
│               │  Value ready     │  is called      │              │
│               │                  │                 │              │
├───────────────┼──────────────────┼────────────────┼───────────────┤
│               │                  │                 │              │
│  REJECTED ❌  │  Task failed     │  reject()       │  .catch()    │
│               │  Error ready     │  is called      │              │
│               │                  │                 │              │
├───────────────┼──────────────────┼────────────────┼───────────────┤
│               │                  │                 │              │
│  SETTLED      │  FULFILLED or    │  After resolve  │  .finally()  │
│  (not a state │  REJECTED        │  or reject      │  always runs │
│  but a term)  │  No longer       │  is called      │              │
│               │  pending         │                 │              │
└───────────────┴──────────────────┴────────────────┴───────────────┘
```

---

**One line to remember everything:**

> A Promise is **born pending**, **lives while the task runs**, then **settles exactly once** — either fulfilled with a result ✅ or rejected with an error ❌ — and **never changes after that**.