# Practical Coding Questions — All Topics Covered

---

Let me know which format you want:

I want to make sure these questions work best for you.Let me just go ahead with the best format for practice — **Question + Expected Output**, grouped by topic from **Easy → Hard**. That way you can solve it yourself and verify your answer.

---

# 75 Coding Questions — Complete Practice Set

---

# SECTION 1 — Callbacks (Questions 1—20)

---

### Q1. Basic Callback
Write a function `greet` that takes a `name` and a `callback`. It should print `"Hello, [name]!"` and then call the callback.
```
Expected Output:
Hello, Chandan!
Goodbye!
```

---

### Q2. Callback with Math
Write a function `calculate(a, b, callback)` where callback receives the sum of `a` and `b`. Call it and print the result.
```
Expected Output:
Result: 8
```

---

### Q3. Callback Order
What will this print? Then write it yourself and verify.
```javascript
function first(callback) {
    console.log("First");
    callback();
}
function second() {
    console.log("Second");
}
first(second);
console.log("Third");
```
```
Expected Output:
First
Second
Third
```

---

### Q4. setTimeout Callback
Write code using `setTimeout` that prints:
```
Expected Output:
Start
End
Inside Timer
```

---

### Q5. Callback with Array
Write a function `processNumbers(arr, callback)` that calls `callback` with each number in the array multiplied by 2.
```
Expected Output:
2
4
6
8
10
```

---

### Q6. Error First Callback — Success
Write a function `divide(a, b, callback)` using the error-first pattern. Call it with `10, 2`.
```
Expected Output:
Result: 5
```

---

### Q7. Error First Callback — Failure
Use the same `divide` function from Q6. Call it with `10, 0`.
```
Expected Output:
Error: Cannot divide by zero
```

---

### Q8. Simulate API Call
Write a function `fetchUser(id, callback)` that waits 1 second and then calls callback with a fake user object `{ id, name: "Chandan" }`.
```
Expected Output:
{ id: 1, name: 'Chandan' }
```

---

### Q9. Callback Inside Callback
Write `getUser` that returns a user after 1 second. Then inside its callback, write `getRole` that returns `"Developer"` after 1 second. Print both.
```
Expected Output:
User: Chandan
Role: Developer
```

---

### Q10. Synchronous vs Asynchronous
Predict and then verify the output:
```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
```
```
Expected Output:
A
C
B
```

---

### Q11. Named vs Anonymous Callback
Rewrite this using a named function instead of anonymous:
```javascript
setTimeout(function() {
    console.log("Hello!");
}, 1000);
```
```
Expected Output:
Hello!
```

---

### Q12. Multiple Callbacks
Write a function `doTask(onSuccess, onError)` that randomly calls either `onSuccess("Task done!")` or `onError("Task failed!")`. Run it and handle both.
```
Expected Output (one of):
Success: Task done!
  OR
Error: Task failed!
```

---

### Q13. Callback Counter
Write a function that accepts a callback and calls it exactly 3 times. The callback should print `"Called: [count]"`.
```
Expected Output:
Called: 1
Called: 2
Called: 3
```

---

### Q14. Simulate File Read
Write `readFile(filename, callback)` that waits 1 second and returns fake content `"File content of [filename]"`.
```
Expected Output:
File content of data.txt
```

---

### Q15. Callback Hell — 3 Levels
Write nested callbacks: get a user → get their order → get order status. Each step takes 1 second.
```
Expected Output:
User: Chandan
Order: Pizza
Status: Delivered
```

---

### Q16. Fix the Bug
What is wrong with this code? Fix it.
```javascript
function greet(name, callback) {
    console.log("Hello " + name);
    callback;
}
greet("Chandan", function() {
    console.log("Done!");
});
```
```
Expected Output:
Hello Chandan
Done!
```

---

### Q17. Callback with Filter
Write `filterNumbers(arr, test, callback)` where `test` is a function that returns true/false. Call callback with filtered results.
```javascript
filterNumbers([1,2,3,4,5,6], function(n) {
    return n % 2 === 0;
}, function(result) {
    console.log(result);
});
```
```
Expected Output:
[2, 4, 6]
```

---

### Q18. Delayed Messages
Write a function that takes an array of messages and prints each one with a 1 second delay between them using callbacks.
```
Expected Output:
Message 1: Hello
Message 2: World
Message 3: Done
```

---

### Q19. Callback Returning Data
Write `getScore(student, callback)` that returns a fake score. Then in the callback, print `"[student] scored [score]/100"`.
```
Expected Output:
Chandan scored 92/100
```

---

### Q20. Identify Callback Hell
Rewrite this callback hell using better variable names and comments to show why it's hard to read (no need to fix it yet — just make the problem visible):
```javascript
a(function() {
    b(function() {
        c(function() {
            d(function() {
                console.log("done");
            });
        });
    });
});
```

---
---

# SECTION 2 — Promise Basics (Questions 21—40)

---

### Q21. Create Your First Promise
Create a Promise that resolves with `"Hello, Promises!"` after 1 second. Print the result.
```
Expected Output:
Hello, Promises!
```

---

### Q22. Rejected Promise
Create a Promise that rejects with `"Something went wrong"` after 1 second. Handle it with `.catch()`.
```
Expected Output:
Error: Something went wrong
```

---

### Q23. Resolve with Object
Create a Promise that resolves with `{ name: "Chandan", age: 22 }`. Print both values in `.then()`.
```
Expected Output:
Name: Chandan
Age: 22
```

---

### Q24. Promise States — Pending
Create a Promise with a 3 second delay. Log the Promise object immediately after creating it.
```
Expected Output:
Promise { <pending> }
```

---

### Q25. resolve() vs reject() — Both Written, One Runs
Write a Promise that has BOTH resolve and reject called. Prove only the first one runs.
```
Expected Output:
First: win
```

---

### Q26. .finally() Always Runs — Success Case
Create a resolving Promise. Add `.then()`, `.catch()`, `.finally()`. Prove `.finally()` runs even on success.
```
Expected Output:
Success: Data loaded
Finally runs!
```

---

### Q27. .finally() Always Runs — Failure Case
Same as Q26 but with a rejecting Promise. Prove `.finally()` runs even on failure.
```
Expected Output:
Error: Failed to load
Finally runs!
```

---

### Q28. Wrapping setTimeout in a Promise
Convert this callback-based code into a Promise:
```javascript
setTimeout(function() {
    console.log("Done!");
}, 1000);
```
```
Expected Output:
Done!
```

---

### Q29. Promise.resolve() Shorthand
Use `Promise.resolve("Instant value")` and print it with `.then()`.
```
Expected Output:
Instant value
```

---

### Q30. Promise.reject() Shorthand
Use `Promise.reject("Instant error")` and handle it with `.catch()`.
```
Expected Output:
Caught: Instant error
```

---

### Q31. Login System
Write `loginUser(username, password)` that returns a Promise. Resolve if password is `"1234"`, reject otherwise.
```
Expected Output (correct):
Welcome Chandan!

Expected Output (wrong):
Login failed: Wrong password
```

---

### Q32. Simulate Coin Flip
Write a Promise that randomly resolves with `"Heads"` or rejects with `"Tails"`. Handle both.
```
Expected Output (one of):
Result: Heads
  OR
Result: Tails
```

---

### Q33. Number Validator
Write `validateAge(age)` that returns a Promise. Resolve if age >= 18, reject if not.
```
Expected Output (18+):
Access granted!

Expected Output (under 18):
Access denied: Too young
```

---

### Q34. Fetch Fake Product
Write `getProduct(id)` that resolves after 1 second with `{ id, name: "Laptop", price: 999 }`. Print all details.
```
Expected Output:
ID: 1
Name: Laptop
Price: 999
```

---

### Q35. Promise Inside a Function
Write a function `wait(seconds)` that returns a Promise resolving after given seconds. Use it to wait 2 seconds then print `"Done waiting!"`.
```
Expected Output:
Done waiting!
```

---

### Q36. Chained .then() — Simple Values
Start with `Promise.resolve(5)`. Chain 3 `.then()` calls: multiply by 2, add 10, subtract 3. Print final result.
```
Expected Output:
Final: 17
```

---

### Q37. Passing Data Through Chain
Create a Promise resolving with a name. In `.then()` add a greeting. In next `.then()` add punctuation. Print result.
```
Expected Output:
Hello, Chandan!
```

---

### Q38. Real Chain — User to Posts
Write `getUser()` and `getPosts(userId)` as Promises. Chain them — get user, then get their posts.
```
Expected Output:
User: Chandan
Posts: 3 posts found
```

---

### Q39. Catch in the Middle
Create a chain of 4 `.then()` steps. Throw an error in step 2. Add a `.catch()` after step 3. Prove steps 3 is skipped but step 4 runs after catch.
```
Expected Output:
Step 1
Error caught: broke in step 2
Step 4
```

---

### Q40. Full Promise Flow
Write a complete flow: place order → verify payment → send confirmation. Each step is a Promise taking 1 second. Handle success and any errors.
```
Expected Output:
Order placed: Pizza
Payment verified!
Confirmation sent!
```

---
---

# SECTION 3 — Promise Lifecycle (Questions 41—55)

---

### Q41. Prove Pending State
Create a Promise with 5 second delay. Log it at 0 seconds, 2 seconds, and 6 seconds. Show state changes.
```
Expected Output:
0s: Promise { <pending> }
2s: Promise { <pending> }
6s: Promise { <fulfilled>: 'done' }
```

---

### Q42. Settled Promise — Late .then()
Create a Promise that resolves immediately. Attach `.then()` after 3 seconds using setTimeout. Prove it still works.
```
Expected Output:
(3 seconds later)
Still got it: Hello!
```

---

### Q43. Immutability Proof — Multiple Resolves
Write a Promise that calls resolve 3 times with different values. Prove only the first one counts.
```
Expected Output:
Value: first
```

---

### Q44. Immutability Proof — Resolve then Reject
Write a Promise that calls resolve then reject. Prove reject is ignored.
```
Expected Output:
Success: worked!
(no error)
```

---

### Q45. Immutability Proof — Reject then Resolve
Write a Promise that calls reject then resolve. Prove resolve is ignored.
```
Expected Output:
Error: failed!
(no success)
```

---

### Q46. State After Fulfillment
Write a Promise. After it fulfills, try to check its state by attaching multiple `.then()` handlers at different times.
```
Expected Output:
Handler 1: done
Handler 2: done
Handler 3: done
```

---

### Q47. Track All Three States
Write a Promise and log a message for each state — when it's created (pending), when it resolves (fulfilled), and in `.finally()` (settled).
```
Expected Output:
State: PENDING
State: FULFILLED
State: SETTLED
```

---

### Q48. Async State Demonstration
Create 3 Promises with different delays (1s, 2s, 3s). Log when each one settles.
```
Expected Output:
Promise 1 settled (1s)
Promise 2 settled (2s)
Promise 3 settled (3s)
```

---

### Q49. Single Resolution in Payment
Simulate a payment Promise. Try calling resolve multiple times (simulating double charge bug). Prove customer is charged only once.
```
Expected Output:
💳 Charged once: Rs.299
(no second charge)
```

---

### Q50. Rejection Reason
Write 3 different Promises that each reject with different specific error messages. Handle each one separately.
```
Expected Output:
Promise 1 Error: Network failed
Promise 2 Error: Not found
Promise 3 Error: Unauthorized
```

---

### Q51. Fulfilled Value Types
Write 5 Promises that resolve with 5 different value types: string, number, boolean, array, object.
```
Expected Output:
String: Hello
Number: 42
Boolean: true
Array: [1, 2, 3]
Object: { name: 'Chandan' }
```

---

### Q52. No Further Changes
Write a Promise. Resolve it. Then try to change the value by calling resolve again 2 seconds later. Prove the value never changes.
```
Expected Output:
Value: original
(2 seconds later)
Value still: original
```

---

### Q53. Rejection with Error Object
Write a Promise that rejects with `new Error("Something broke")`. In `.catch()` print both `error.message` and `error.name`.
```
Expected Output:
Name: Error
Message: Something broke
```

---

### Q54. Chain After Rejection Recovery
Write a Promise that rejects. In `.catch()` recover by returning a default value. Continue the chain with `.then()`.
```
Expected Output:
Recovered with: default value
Chain continued: DEFAULT VALUE
```

---

### Q55. Settlement Timing
Create a Promise. Log before creating, right after creating, and in `.then()`. Predict the order.
```
Expected Output:
Before Promise
After Promise created
Inside .then()
```

---
---

# SECTION 4 — Promise Chaining (Questions 56—75)

---

### Q56. Basic Chain
Chain 4 `.then()` calls. Each one adds 5 to the previous value. Start with 0.
```
Expected Output:
Final value: 20
```

---

### Q57. String Chain
Start with `"Hello"`. Chain `.then()` to add `" World"`, then `"!"`, then print final string.
```
Expected Output:
Hello World!
```

---

### Q58. Object Building Chain
Start with `{}`. Each `.then()` adds one property. End with full user object.
```
Expected Output:
{ name: 'Chandan', role: 'Developer', level: 'Senior' }
```

---

### Q59. Return Promise in Chain
Write `double(n)` that returns a Promise resolving with `n * 2`. Chain it 3 times starting from 1.
```
Expected Output:
1 → 2 → 4 → 8
Final: 8
```

---

### Q60. Real API Simulation Chain
Chain these 3 steps, each taking 1 second:
1. `getUser()` → returns `{ id: 1, name: "Chandan" }`
2. `getOrders(userId)` → returns `[{id: 101, item: "Pizza"}]`
3. `getOrderStatus(orderId)` → returns `"Delivered"`
```
Expected Output:
User: Chandan
Order: Pizza
Status: Delivered
```

---

### Q61. Forget to Return — Find the Bug
Fix this broken chain:
```javascript
getUser()
    .then(function(user) {
        getPosts(user.id); // bug here
    })
    .then(function(posts) {
        console.log(posts); // prints undefined
    });
```
```
Expected Output:
[actual posts data]
```

---

### Q62. Error in Middle of Chain
Build a 5 step chain. Throw an error in step 3. Prove steps 4 and 5 are skipped and `.catch()` runs.
```
Expected Output:
Step 1 ✅
Step 2 ✅
Error caught from step 3
```

---

### Q63. Recovery and Continue
Build a chain. Reject the Promise. In `.catch()` return `"recovered"`. Continue with 2 more `.then()` steps.
```
Expected Output:
Caught error, recovering...
Continuing with: recovered
Final: RECOVERED
```

---

### Q64. finally in Chain
Write an order placement chain. Add `.finally()` to always print `"Order process complete"` whether it succeeded or failed.
```
Expected Output (success):
Order placed!
Order process complete

Expected Output (failure):
Order failed!
Order process complete
```

---

### Q65. Nested vs Chained
Rewrite this nested Promise into a flat chain:
```javascript
getUser().then(function(user) {
    getPosts(user.id).then(function(posts) {
        getComments(posts[0].id).then(function(comments) {
            console.log(comments);
        });
    });
});
```
```
Expected Output:
[comments data]
```

---

### Q66. Transform Data in Chain
Get a list of numbers `[1,2,3,4,5]` from a Promise. Chain to filter even numbers. Chain to double them. Print result.
```
Expected Output:
[4, 8]
```

---

### Q67. Chain with Conditional
Get a user from a Promise. In `.then()` check if user is admin. If yes resolve with `"Admin Dashboard"`, if no resolve with `"User Dashboard"`.
```
Expected Output (admin):
Loading: Admin Dashboard

Expected Output (user):
Loading: User Dashboard
```

---

### Q68. Multiple .catch() Handlers
Write a chain with a `.catch()` after step 2 and another at the end. Throw errors at different steps and prove each `.catch()` only catches errors from above it.
```
Expected Output (error in step 1):
Middle catch: step 1 error

Expected Output (error in step 3):
Final catch: step 3 error
```

---

### Q69. finally Doesn't Change Value
Prove that returning a value from `.finally()` doesn't affect the chain.
```javascript
Promise.resolve("original")
    .finally(function() {
        return "changed"; // this should be ignored
    })
    .then(function(value) {
        console.log(value); // what prints?
    });
```
```
Expected Output:
original
```

---

### Q70. Build a Request Pipeline
Simulate a complete request pipeline with chaining:
1. Authenticate user
2. Fetch data
3. Format data
4. Display data
```
Expected Output:
✅ Authenticated
✅ Data fetched
✅ Data formatted
✅ Displaying: { formatted: true, user: 'Chandan' }
```

---

### Q71. Retry on Failure
Write a chain that fails on first try. In `.catch()` retry the operation. If retry succeeds, continue the chain.
```
Expected Output:
First try failed...
Retrying...
Retry succeeded!
Final result: Data loaded
```

---

### Q72. Sequential vs Parallel
Write code that runs 3 Promises **sequentially** (one after another) using chaining. Each takes 1 second. Total should take ~3 seconds.
```
Expected Output:
Task 1 done (1s)
Task 2 done (2s)
Task 3 done (3s)
Total time: ~3 seconds
```

---

### Q73. Chain That Builds a Report
Simulate building a report by chaining steps:
1. Get sales data → `{ total: 50000 }`
2. Get expenses → add `{ expenses: 20000 }`
3. Calculate profit → add `{ profit: 30000 }`
4. Format report → print final report
```
Expected Output:
📊 Report:
Total Sales: 50000
Expenses: 20000
Profit: 30000
```

---

### Q74. Complete App Flow
Write a complete mini-app flow using chaining:
```
Start → Login → Load Profile → Load Settings → Show Dashboard
```
Each step is a Promise. Any step can fail. Handle all errors in one `.catch()`.
```
Expected Output (success):
✅ Logged in
✅ Profile loaded
✅ Settings loaded
✅ Dashboard ready for Chandan

Expected Output (failure at any step):
❌ App failed: [reason]
```

---

### Q75. The Ultimate Challenge
Build a food ordering system using Promise chaining with ALL of these:
- At least 4 chained steps
- At least one step that returns a Promise
- A `.catch()` that recovers and continues
- A `.finally()` at the end
- Error handling at a specific middle step

```
Expected Output (happy path):
🍕 Order received
✅ Restaurant confirmed
💳 Payment processed
📧 Confirmation sent
🔄 Order system ready
```

---

# Quick Reference — Topics Covered

```
Q1  - Q20  → Callbacks (20 questions)
Q21 - Q40  → Promise Basics & Syntax (20 questions)
Q41 - Q55  → Promise Lifecycle & States (15 questions)
Q56 - Q75  → Promise Chaining (20 questions)
─────────────────────────────────────
Total: 75 Questions
```

---

**Tip:** Don't rush. Do 5 questions a day. By day 15 you'll have covered everything deeply with your hands — not just your eyes. 💪