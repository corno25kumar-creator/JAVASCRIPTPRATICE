# 75 Practical Coding Questions — Complete Practice Set

---

# SECTION 1 — Callbacks (Q1—20)

---

### Q1. Your First Callback
Write a function `greet` that takes a `name` and a `callback`. Print `"Hello, [name]!"` then call the callback.

> 💡 **Hint:** Define a separate function and pass it as the second argument. Remember — pass the function name without `()`.

```
Expected Output:
Hello, Chandan!
Goodbye!
```

---

### Q2. Callback with Math
Write a function `calculate(a, b, callback)`. The callback receives the sum of `a` and `b`. Print the result.

> 💡 **Hint:** Inside `calculate`, call `callback(a + b)`. The callback function receives that sum as its argument.

```
Expected Output:
Result: 8
```

---

### Q3. Predict the Output
What will this print? Write it yourself first, then verify.
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

> 💡 **Hint:** Functions run line by line. `first(second)` runs completely before `console.log("Third")` is reached.

```
Expected Output:
First
Second
Third
```

---

### Q4. setTimeout Callback
Write code using `setTimeout` that prints three lines — `"Start"` and `"End"` print immediately, `"Inside Timer"` prints after 2 seconds.

> 💡 **Hint:** `console.log("Start")` and `console.log("End")` go outside setTimeout. The callback inside setTimeout runs later.

```
Expected Output:
Start
End
Inside Timer  ← (after 2 seconds)
```

---

### Q5. Callback with Array
Write `processNumbers(arr, callback)`. Call `callback` with each number multiplied by 2.

> 💡 **Hint:** Use a `for` loop or `forEach` inside `processNumbers`. Call `callback(num * 2)` for each element.

```
Expected Output:
2
4
6
8
10
```

---

### Q6. Error First — Success Case
Write `divide(a, b, callback)` using error-first pattern. Call it with `10, 2`.

> 💡 **Hint:** Error-first means `callback(error, result)`. On success: `callback(null, result)`. On failure: `callback("error message", null)`.

```
Expected Output:
Result: 5
```

---

### Q7. Error First — Failure Case
Use the same `divide` function from Q6. Call it with `10, 0`.

> 💡 **Hint:** Check `if (b === 0)` inside the function. Call `callback("Cannot divide by zero", null)` in that case.

```
Expected Output:
Error: Cannot divide by zero
```

---

### Q8. Simulate API Call
Write `fetchUser(id, callback)`. Wait 1 second, then call callback with `{ id, name: "Chandan" }`.

> 💡 **Hint:** Use `setTimeout` with 1000ms. Inside the timeout, create the user object and call `callback(user)`.

```
Expected Output:
{ id: 1, name: 'Chandan' }
```

---

### Q9. Callback Inside Callback
Write `getUser` returning a user after 1 second. Inside its callback, write `getRole` returning `"Developer"` after 1 second. Print both.

> 💡 **Hint:** Call `getRole` INSIDE the callback of `getUser`. This is intentional nesting — you're practicing the pattern before seeing the problem.

```
Expected Output:
User: Chandan
Role: Developer
```

---

### Q10. Sync vs Async Order
Predict then verify:
```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
```

> 💡 **Hint:** Even `setTimeout(..., 0)` doesn't run immediately. It goes to the callback queue and only runs after the current code finishes.

```
Expected Output:
A
C
B
```

---

### Q11. Named vs Anonymous
Rewrite this using a **named** function instead of anonymous:
```javascript
setTimeout(function() {
    console.log("Hello!");
}, 1000);
```

> 💡 **Hint:** Define `function sayHello() { ... }` separately. Then pass `sayHello` (without parentheses) into setTimeout.

```
Expected Output:
Hello!
```

---

### Q12. Multiple Callbacks
Write `doTask(onSuccess, onError)`. Use `Math.random()` to randomly call either `onSuccess("Task done!")` or `onError("Task failed!")`.

> 💡 **Hint:** `if (Math.random() > 0.5)` gives you a 50/50 chance. Call the appropriate callback based on the result.

```
Expected Output (one of):
Success: Task done!
  OR
Error: Task failed!
```

---

### Q13. Callback Counter
Write a function that accepts a callback and calls it exactly 3 times. The callback prints `"Called: [count]"`.

> 💡 **Hint:** Use a `for` loop from 1 to 3. Pass `i` as an argument to the callback each time.

```
Expected Output:
Called: 1
Called: 2
Called: 3
```

---

### Q14. Simulate File Read
Write `readFile(filename, callback)`. Wait 1 second and return fake content `"File content of [filename]"`.

> 💡 **Hint:** Use template literals inside setTimeout: `` `File content of ${filename}` ``. Pass this string to the callback.

```
Expected Output:
File content of data.txt
```

---

### Q15. Callback Hell — 3 Levels
Write nested callbacks: get user → get their order → get order status. Each step takes 1 second.

> 💡 **Hint:** Each function takes an id and a callback. Call the next function INSIDE the previous callback. You'll have 3 levels of nesting.

```
Expected Output:
User: Chandan
Order: Pizza
Status: Delivered
```

---

### Q16. Fix the Bug
What is wrong here? Fix it.
```javascript
function greet(name, callback) {
    console.log("Hello " + name);
    callback;
}
greet("Chandan", function() {
    console.log("Done!");
});
```

> 💡 **Hint:** Look very carefully at line 3. There is one character missing that makes the difference between referencing a function and calling it.

```
Expected Output:
Hello Chandan
Done!
```

---

### Q17. Callback with Filter
Write `filterNumbers(arr, test, callback)`. `test` is a function returning true/false. Call callback with filtered results.

> 💡 **Hint:** Use `arr.filter(test)` inside the function. Then pass the filtered array to `callback`.

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
Take an array of messages. Print each one with 1 second delay between them using callbacks.

> 💡 **Hint:** Use `setTimeout` with increasing delays: `1000`, `2000`, `3000`. Multiply the index by 1000 to get the right delay.

```
Expected Output:
Message 1: Hello      ← (1 second)
Message 2: World      ← (2 seconds)
Message 3: Done       ← (3 seconds)
```

---

### Q19. Callback Returning Data
Write `getScore(student, callback)`. Return a fake score. In the callback print `"[student] scored [score]/100"`.

> 💡 **Hint:** Hardcode a score like `92` inside the function. Call `callback(score)`. In the callback use the student name from the outer scope.

```
Expected Output:
Chandan scored 92/100
```

---

### Q20. Spot the Hell
Rewrite this with proper indentation and comments that explain WHY each level exists and WHY it's hard to maintain:
```javascript
a(function() { b(function() { c(function() { d(function() { console.log("done"); }); }); }); });
```

> 💡 **Hint:** Each level exists because the next step DEPENDS on the result of the previous step. Write a comment at each level explaining this dependency.

```
Expected Output:
(well formatted code with comments showing the problem)
done
```

---
---

# SECTION 2 — Promise Basics & Syntax (Q21—40)

---

### Q21. Your First Promise
Create a Promise that resolves with `"Hello, Promises!"` after 1 second. Print the result.

> 💡 **Hint:** `new Promise((resolve, reject) => { setTimeout(() => resolve("..."), 1000) })`. Chain `.then(value => console.log(value))`.

```
Expected Output:
Hello, Promises!
```

---

### Q22. Rejected Promise
Create a Promise that rejects with `"Something went wrong"` after 1 second. Handle with `.catch()`.

> 💡 **Hint:** Call `reject("Something went wrong")` inside setTimeout. Chain `.catch(err => console.log("Error:", err))`.

```
Expected Output:
Error: Something went wrong
```

---

### Q23. Resolve with Object
Create a Promise resolving with `{ name: "Chandan", age: 22 }`. Print both values in `.then()`.

> 💡 **Hint:** Pass a full object to `resolve({...})`. In `.then()` receive it and access `.name` and `.age` properties.

```
Expected Output:
Name: Chandan
Age: 22
```

---

### Q24. Catching Pending State
Create a Promise with 3 second delay. Log the Promise object IMMEDIATELY after creating it.

> 💡 **Hint:** Store the Promise in a variable: `const p = new Promise(...)`. Then immediately `console.log(p)` on the next line before it resolves.

```
Expected Output:
Promise { <pending> }
```

---

### Q25. Only First Wins
Write a Promise with BOTH resolve and reject called. Prove only the first one runs.

> 💡 **Hint:** Call `resolve("first")` then `resolve("second")` then `reject("error")` one after another. Only attach `.then()` and `.catch()`. See what fires.

```
Expected Output:
First: win
```

---

### Q26. finally on Success
Create a resolving Promise. Add `.then()`, `.catch()`, `.finally()`. Prove `.finally()` runs on success.

> 💡 **Hint:** `.finally()` takes a function with NO arguments. It runs after `.then()` completes. It doesn't receive the resolved value.

```
Expected Output:
Success: Data loaded
Finally runs!
```

---

### Q27. finally on Failure
Same as Q26 but with a rejecting Promise. Prove `.finally()` runs on failure too.

> 💡 **Hint:** Even though `.catch()` handles the error, `.finally()` still runs after it. The order is always: `.then()` or `.catch()` → then `.finally()`.

```
Expected Output:
Error: Failed to load
Finally runs!
```

---

### Q28. Wrap setTimeout in Promise
Convert this callback code into a Promise-based version:
```javascript
setTimeout(function() {
    console.log("Done!");
}, 1000);
```

> 💡 **Hint:** Wrap the setTimeout in `new Promise((resolve) => { setTimeout(() => resolve("Done!"), 1000) })`. Then use `.then()` to print.

```
Expected Output:
Done!
```

---

### Q29. Promise.resolve() Shorthand
Use `Promise.resolve("Instant value")` and print it with `.then()`.

> 💡 **Hint:** `Promise.resolve()` creates an already-fulfilled Promise instantly. No need for `new Promise(...)` — it's a shortcut.

```
Expected Output:
Instant value
```

---

### Q30. Promise.reject() Shorthand
Use `Promise.reject("Instant error")` and handle with `.catch()`.

> 💡 **Hint:** `Promise.reject()` creates an already-rejected Promise. Always handle it with `.catch()` or you'll get an unhandled rejection warning.

```
Expected Output:
Caught: Instant error
```

---

### Q31. Login System
Write `loginUser(username, password)` returning a Promise. Resolve if password is `"1234"`, reject otherwise.

> 💡 **Hint:** Use an `if` statement inside the Promise. `resolve({ username, token: "abc123" })` on success. `reject("Wrong password")` on failure.

```
Expected Output (correct):
Welcome Chandan!

Expected Output (wrong):
Login failed: Wrong password
```

---

### Q32. Coin Flip Promise
Write a Promise that randomly resolves with `"Heads"` or rejects with `"Tails"`. Handle both.

> 💡 **Hint:** `Math.random() > 0.5` is your condition. Use resolve for one outcome, reject for the other. Handle with `.then()` and `.catch()`.

```
Expected Output (one of):
Result: Heads
  OR
Result: Tails
```

---

### Q33. Age Validator
Write `validateAge(age)` returning a Promise. Resolve if age >= 18, reject if not.

> 💡 **Hint:** Simple if/else inside Promise. `resolve("Access granted!")` or `reject("Too young")`. Test with both 20 and 15.

```
Expected Output (18+):
Access granted!

Expected Output (under 18):
Access denied: Too young
```

---

### Q34. Fake Product Fetch
Write `getProduct(id)` resolving after 1 second with `{ id, name: "Laptop", price: 999 }`. Print all details.

> 💡 **Hint:** Use template literals to print: `` `ID: ${product.id}` ``. Access each property separately in `.then()`.

```
Expected Output:
ID: 1
Name: Laptop
Price: 999
```

---

### Q35. wait() Function
Write a function `wait(seconds)` returning a Promise that resolves after given seconds. Use it to wait 2 seconds.

> 💡 **Hint:** `return new Promise(resolve => setTimeout(resolve, seconds * 1000))`. Then `wait(2).then(() => console.log("Done waiting!"))`.

```
Expected Output:
Done waiting!
```

---

### Q36. Chain Simple Math
Start with `Promise.resolve(5)`. Chain 3 `.then()` calls: multiply by 2, add 10, subtract 3. Print final.

> 💡 **Hint:** Each `.then()` receives the result of the previous one. Return the calculated value so the next step gets it. `5 * 2 = 10`, `10 + 10 = 20`, `20 - 3 = 17`.

```
Expected Output:
Final: 17
```

---

### Q37. String Builder Chain
Start with `Promise.resolve("Hello")`. Chain to add `" World"`, then `"!"`, then print.

> 💡 **Hint:** In each `.then()`, receive the string and return it with something added: `return value + " World"`. Each step builds on the last.

```
Expected Output:
Hello World!
```

---

### Q38. User to Posts Chain
Write `getUser()` and `getPosts(userId)` as Promises. Chain them — get user then their posts.

> 💡 **Hint:** RETURN `getPosts(user.id)` from inside the first `.then()`. If you don't return it, the next `.then()` gets undefined.

```
Expected Output:
User: Chandan
Posts: 3 posts found
```

---

### Q39. Catch in the Middle
Chain 4 `.then()` steps. Throw an error in step 2. Add `.catch()` after step 3. Prove step 3 is skipped but step 4 runs after catch.

> 💡 **Hint:** After `.catch()` returns a value, the chain CONTINUES to the next `.then()`. `.catch()` recovers the chain, it doesn't end it.

```
Expected Output:
Step 1 ✅
Error caught: broke in step 2
Step 4 ✅
```

---

### Q40. Full Order Flow
Write: place order → verify payment → send confirmation. Each step is a Promise taking 1 second.

> 💡 **Hint:** Each function should take the result of the previous one as an argument and return a new Promise. Return each Promise in `.then()` so the chain waits.

```
Expected Output:
Order placed: Pizza
Payment verified!
Confirmation sent!
```

---
---

# SECTION 3 — Promise Lifecycle (Q41—55)

---

### Q41. Watch State Change
Create a Promise with 3 second delay. Log it at 0s, 1s, and 4s using `setTimeout`. Watch the state change.

> 💡 **Hint:** Store Promise in variable `p`. Use three separate `setTimeout` calls with 0, 1000, and 4000ms. Log `p` in each one.

```
Expected Output:
0s: Promise { <pending> }
1s: Promise { <pending> }
4s: Promise { <fulfilled>: 'done' }
```

---

### Q42. Late .then() Still Works
Create a Promise resolving immediately. Attach `.then()` AFTER 3 seconds using setTimeout. Prove it still gets the value.

> 💡 **Hint:** Settled Promises remember their value forever. Attach `.then()` inside a `setTimeout(..., 3000)`. It will still fire.

```
Expected Output:
(3 seconds later)
Still got it: Hello!
```

---

### Q43. Multiple Resolves — Only First Counts
Call `resolve` 3 times with different values inside one Promise. Prove only the first value comes through.

> 💡 **Hint:** Write `resolve("first")`, `resolve("second")`, `resolve("third")` on consecutive lines. Only the first call has any effect.

```
Expected Output:
Value: first
```

---

### Q44. Resolve then Reject — Reject Ignored
Call `resolve` then `reject` in same Promise. Prove reject is completely ignored.

> 💡 **Hint:** Once `resolve()` is called, the Promise state is locked. Any subsequent `reject()` call is silently ignored — no error thrown.

```
Expected Output:
Success: worked!
```

---

### Q45. Reject then Resolve — Resolve Ignored
Call `reject` then `resolve` in same Promise. Prove resolve is completely ignored.

> 💡 **Hint:** Same principle as Q44 but reversed. First call wins. The `.then()` handler will never fire if `reject()` was called first.

```
Expected Output:
Error: failed!
```

---

### Q46. Multiple Handlers Same Promise
Attach 3 separate `.then()` handlers to the SAME Promise. Prove all 3 get the same value.

> 💡 **Hint:** `promise.then(...)`, `promise.then(...)`, `promise.then(...)` — attach them separately, not chained. All three will fire.

```
Expected Output:
Handler 1: done
Handler 2: done
Handler 3: done
```

---

### Q47. Log Every State
Log a message when Promise is created (pending), when it resolves (inside executor after resolve), and in `.finally()` (settled).

> 💡 **Hint:** `console.log("PENDING")` right after `new Promise(...)`. `console.log("FULFILLED")` right after calling `resolve()`. `console.log("SETTLED")` in `.finally()`.

```
Expected Output:
State: PENDING
State: FULFILLED
State: SETTLED
```

---

### Q48. Three Promises Different Timing
Create 3 Promises with 1s, 2s, 3s delays. Log when each one settles.

> 💡 **Hint:** Create all three independently (not chained). Each one will settle at its own time. Attach separate `.then()` to each.

```
Expected Output:
Promise 1 settled ← (1 second)
Promise 2 settled ← (2 seconds)
Promise 3 settled ← (3 seconds)
```

---

### Q49. Payment — Single Charge Proof
Simulate a payment Promise. Call `resolve` multiple times pretending to double-charge. Prove it only fires once.

> 💡 **Hint:** Write `resolve("Charged Rs.299")` three times in the executor. The `.then()` should only print once — proving single resolution protects against double charging.

```
Expected Output:
💳 Charged: Rs.299
(only once — no duplicate)
```

---

### Q50. Three Different Rejection Reasons
Write 3 Promises each rejecting with a different specific error. Handle each separately.

> 💡 **Hint:** Create each Promise separately with its own `.catch()`. Give each a unique reject message like `"Network failed"`, `"Not found"`, `"Unauthorized"`.

```
Expected Output:
Promise 1 Error: Network failed
Promise 2 Error: Not found
Promise 3 Error: Unauthorized
```

---

### Q51. Five Value Types
Write 5 Promises resolving with 5 different types: string, number, boolean, array, object.

> 💡 **Hint:** Create 5 separate `Promise.resolve(...)` calls. Chain `.then()` to each. Use `typeof` or just print the value directly.

```
Expected Output:
String: Hello
Number: 42
Boolean: true
Array: [1, 2, 3]
Object: { name: 'Chandan' }
```

---

### Q52. Value Never Changes
Resolve a Promise. After 2 seconds try to resolve it again with a different value. Prove original value never changes.

> 💡 **Hint:** Store the resolve function: `let res; new Promise(resolve => { res = resolve })`. Call `res("original")` then `setTimeout(() => res("changed"), 2000)`. Attach `.then()` separately.

```
Expected Output:
Value: original
(2 seconds later — nothing changes)
```

---

### Q53. Error Object Properties
Reject a Promise with `new Error("Something broke")`. In `.catch()` print `error.message` and `error.name`.

> 💡 **Hint:** `new Error("...")` creates an Error object with `.name` (always `"Error"`) and `.message` properties. Pass it to `reject()`.

```
Expected Output:
Name: Error
Message: Something broke
```

---

### Q54. Recover and Continue
Reject a Promise. In `.catch()` return `"default value"`. Continue chain with 2 more `.then()` steps after.

> 💡 **Hint:** When `.catch()` returns a value, the next `.then()` receives it. The chain is "healed" — it continues as if nothing went wrong.

```
Expected Output:
Caught error, recovering...
Continuing with: default value
Final: DEFAULT VALUE
```

---

### Q55. Execution Order Prediction
Predict then verify this output:
```javascript
console.log("Before");

const p = new Promise((resolve) => {
    console.log("Inside executor");
    resolve("done");
});

p.then(val => console.log("Then:", val));

console.log("After");
```

> 💡 **Hint:** The executor runs SYNCHRONOUSLY (immediately). But `.then()` always runs ASYNCHRONOUSLY — even if the Promise is already resolved. So "After" prints before "Then".

```
Expected Output:
Before
Inside executor
After
Then: done
```

---
---

# SECTION 4 — Promise Chaining (Q56—75)

---

### Q56. Add 5 Four Times
Chain 4 `.then()` calls. Each adds 5 to previous value. Start with `Promise.resolve(0)`.

> 💡 **Hint:** Each `.then(value => value + 5)`. The last `.then()` should print the final value. `0+5+5+5+5 = 20`.

```
Expected Output:
Final value: 20
```

---

### Q57. Build a Sentence
Start with `Promise.resolve("Hello")`. Chain to add `" World"` then `"!"`. Print the final string.

> 💡 **Hint:** `return value + " World"` in first `.then()`. `return value + "!"` in second. Third `.then()` prints the complete sentence.

```
Expected Output:
Hello World!
```

---

### Q58. Build an Object Step by Step
Start with `Promise.resolve({})`. Each `.then()` adds one property. End with full user object.

> 💡 **Hint:** Use spread operator: `return { ...obj, name: "Chandan" }`. Each step adds a new field without removing old ones.

```
Expected Output:
{ name: 'Chandan', role: 'Developer', level: 'Senior' }
```

---

### Q59. Async Double Chain
Write `double(n)` returning a Promise resolving with `n * 2`. Chain it 3 times starting from 1.

> 💡 **Hint:** Return `double(value)` from each `.then()`. Since it returns a Promise, the chain waits for it. `1 → 2 → 4 → 8`.

```
Expected Output:
Start: 1
After double 1: 2
After double 2: 4
After double 3: 8
```

---

### Q60. Three Step API Chain
Chain: `getUser()` → `getOrders(userId)` → `getOrderStatus(orderId)`. Each takes 1 second.

> 💡 **Hint:** Each `.then()` must RETURN the next Promise. The data from each step must be passed as an argument to the next function.

```
Expected Output:
User: Chandan
Order: Pizza
Status: Delivered
```

---

### Q61. Find and Fix the Bug
Fix this broken chain:
```javascript
getUser()
    .then(function(user) {
        getPosts(user.id);
    })
    .then(function(posts) {
        console.log(posts);
    });
```

> 💡 **Hint:** Look at what's missing on the `getPosts` line. Without `return`, the Promise result is thrown away and the next `.then()` gets `undefined`.

```
Expected Output:
[actual posts data, not undefined]
```

---

### Q62. Error Skips Steps
Build a 5 step chain. Throw an error in step 3. Prove steps 4 and 5 are skipped.

> 💡 **Hint:** Use `throw new Error("broke in step 3")` inside the third `.then()`. Add a `.catch()` at the end. Steps 4 and 5 will be completely bypassed.

```
Expected Output:
Step 1 ✅
Step 2 ✅
Error caught: broke in step 3
(steps 4 and 5 never printed)
```

---

### Q63. Catch and Continue
Reject a Promise. In `.catch()` return `"recovered"`. Continue with 2 more `.then()` steps after it.

> 💡 **Hint:** `.catch()` is just like `.then()` for errors. If it returns a value, the next `.then()` gets it. The chain is fully healed after `.catch()`.

```
Expected Output:
Caught error, recovering...
Continuing: recovered
Final: RECOVERED
```

---

### Q64. finally in Order Flow
Write an order system chain. Add `.finally()` to always print `"Order process complete"` win or lose.

> 💡 **Hint:** `.finally()` goes at the very end. It runs whether the chain succeeded (reached last `.then()`) or failed (caught by `.catch()`).

```
Expected Output (success):
Order placed! 🍕
Order process complete 🔄

Expected Output (failure):
Order failed! ❌
Order process complete 🔄
```

---

### Q65. Flatten the Nest
Rewrite this nested Promise into a clean flat chain:
```javascript
getUser().then(function(user) {
    getPosts(user.id).then(function(posts) {
        getComments(posts[0].id).then(function(comments) {
            console.log(comments);
        });
    });
});
```

> 💡 **Hint:** Return `getPosts(user.id)` from first `.then()`. Return `getComments(posts[0].id)` from second `.then()`. The result flows down automatically.

```
Expected Output:
[comments printed cleanly — same result, much cleaner code]
```

---

### Q66. Transform Data in Chain
Get `[1,2,3,4,5]` from a Promise. Chain to filter even numbers. Chain to double each. Print result.

> 💡 **Hint:** First `.then()`: `return arr.filter(n => n % 2 === 0)`. Second `.then()`: `return arr.map(n => n * 2)`. Third `.then()`: print.

```
Expected Output:
[4, 8]
```

---

### Q67. Conditional Chain
Get a user from a Promise. In `.then()` check if `user.isAdmin`. Return different strings based on the result.

> 💡 **Hint:** `return user.isAdmin ? "Admin Dashboard" : "User Dashboard"`. The returned string flows to the next `.then()`.

```
Expected Output (admin):
Loading: Admin Dashboard

Expected Output (user):
Loading: User Dashboard
```

---

### Q68. Two Catches at Different Levels
Put a `.catch()` after step 2 AND one at the very end. Test errors at different steps to prove each catch only handles errors from above it.

> 💡 **Hint:** Middle `.catch()` only catches errors from steps 1 and 2. Errors from steps 3+ fall to the final `.catch()`. A caught error doesn't fall further unless rethrown.

```
Expected Output (error in step 1):
Middle catch got: step 1 error

Expected Output (error in step 3):
Final catch got: step 3 error
```

---

### Q69. finally Doesn't Change Value
Prove that returning from `.finally()` is ignored:
```javascript
Promise.resolve("original")
    .finally(function() {
        return "changed";
    })
    .then(function(value) {
        console.log(value);
    });
```

> 💡 **Hint:** `.finally()` is designed for cleanup only. It intentionally passes the original value through, ignoring any return value inside it.

```
Expected Output:
original
```

---

### Q70. Full Request Pipeline
Chain 4 steps: authenticate → fetch data → format data → display. Each step is a Promise.

> 💡 **Hint:** Each function receives the result of the previous one. `authenticate()` returns credentials. `fetchData(credentials)` uses them. Each step builds on the last.

```
Expected Output:
✅ Authenticated
✅ Data fetched
✅ Data formatted
✅ Displaying: { formatted: true, user: 'Chandan' }
```

---

### Q71. Retry on Failure
First attempt fails. In `.catch()` retry the operation. If retry succeeds, continue chain.

> 💡 **Hint:** In `.catch()`, `return retryOperation()` — returning a new Promise from catch heals the chain. If that Promise resolves, the next `.then()` runs normally.

```
Expected Output:
First try failed...
Retrying...
Retry succeeded!
Final: Data loaded ✅
```

---

### Q72. Sequential Timing Proof
Run 3 Promises sequentially using chaining. Each takes 1 second. Total must be ~3 seconds.

> 💡 **Hint:** Chain them with `.then(() => task2()).then(() => task3())`. Each waits for the previous. Compare this to running them in parallel — sequential takes 3x longer.

```
Expected Output:
Task 1 done ← (1 second)
Task 2 done ← (2 seconds)
Task 3 done ← (3 seconds)
Total: ~3 seconds
```

---

### Q73. Report Builder Chain
Build a report step by step using chaining:
1. Get sales → `{ total: 50000 }`
2. Add expenses → add `expenses: 20000`
3. Calculate profit → add `profit: 30000`
4. Format and print

> 💡 **Hint:** Use object spread in each step: `return { ...data, expenses: 20000 }`. Each step enriches the same object. Final `.then()` prints the complete report.

```
Expected Output:
📊 Report:
Total Sales: 50000
Expenses: 20000
Profit: 30000
```

---

### Q74. Full App Flow with Error Handling
Chain: Login → Load Profile → Load Settings → Show Dashboard. Any step can fail. One `.catch()` handles all.

> 💡 **Hint:** If ANY step rejects, ALL remaining steps are skipped and the single `.catch()` fires. Test by making different steps fail. One `.catch()` at the end handles everything.

```
Expected Output (success):
✅ Logged in
✅ Profile loaded
✅ Settings loaded
✅ Dashboard ready for Chandan

Expected Output (any failure):
❌ App failed: [reason from whichever step failed]
```

---

### Q75. 🏆 Ultimate Challenge
Build a complete food ordering system using ALL of these together:
- Minimum 4 chained steps
- At least one step returns a Promise
- A `.catch()` that recovers and continues
- A `.finally()` at the end
- Error handling at a specific middle step

> 💡 **Hint:** Structure: `placeOrder → confirmRestaurant → [.catch() recovery here] → processPayment → sendConfirmation → .finally()`. The middle `.catch()` should handle restaurant errors and return a default restaurant so the chain continues.

```
Expected Output (happy path):
🍕 Order received: Burger
✅ Restaurant confirmed: Pizza Palace
💳 Payment processed: Rs.299
📧 Confirmation sent: Order #101
🔄 Order system ready

Expected Output (restaurant fails, recovered):
🍕 Order received: Burger
⚠️ Restaurant unavailable, switching to backup...
💳 Payment processed: Rs.299
📧 Confirmation sent: Order #101
🔄 Order system ready
```

---

# Summary

```
┌─────────────────────────────────────────┐
│         COMPLETE QUESTION SET           │
├─────────────────────────────────────────┤
│  Q1  - Q20  → Callbacks      (20 Qs)   │
│  Q21 - Q40  → Promise Basics (20 Qs)   │
│  Q41 - Q55  → Lifecycle      (15 Qs)   │
│  Q56 - Q75  → Chaining       (20 Qs)   │
├─────────────────────────────────────────┤
│  Total: 75 Questions                    │
│  Each has: Hint + Expected Output       │
│  Difficulty: Easy → Medium → Hard       │
└─────────────────────────────────────────┘
```

**Recommended pace:** 5 questions per day → done in 15 days with deep understanding. 💪