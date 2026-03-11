# 1. Async Function

- What is an `async` function
- What an `async` function returns (Promise)
- Implicit Promise wrapping
- Calling an async function
- Difference between normal function vs async function

---

# 2. Await Keyword

- What `await` does
- How `await` pauses execution
- `await` and Promise resolution
- `await` with rejected promises
- `await` with non-Promise values
- `await` and microtask queue

---

# 3. Async Function Syntax

- Async function declaration
- Async function expression
- Async arrow functions
- Async class methods

---

# 4. Return Behavior

- Returning values from async functions
- Returning Promises from async functions
- `return` vs `return await`

---

# 5. Error Handling

- `try/catch` with async/await
- `finally` block in async code
- Handling rejected Promises
- Error propagation in async functions
- Unhandled Promise rejections
- Global rejection handlers

---

# 6. Execution Patterns

- Sequential execution
- Parallel execution
- `Promise.all()` with async/await
- `Promise.allSettled()`
- `Promise.race()`
- `Promise.any()`

---

# 7. Async in Loops

- `await` inside `for` loop
- `await` inside `for...of`
- `await` inside `while`
- Problems with `async forEach`
- Correct async iteration patterns
- `for await...of` loop

---

# 8. Top Level Async

- Top-level `await`
- ES modules requirement
- Limitations of top-level await
- Async IIFE

---

# 9. Timers with Async/Await

- Using `setTimeout` with async/await
- Creating a delay function
- Converting callback APIs to Promises

---

# 10. Cancellation & Control

- `AbortController`
- Cancelling fetch requests
- Timeout patterns with async/await

---

# 11. Internal Behavior

- How async/await works internally
- Async/await vs Promise chain
- Async/await and the Event Loop
- Microtask queue behavior with `await`

---

# 12. Utility Patterns

- Delay / sleep function
- Retry logic
- Rate limiting async calls
- Parallel API requests
- Sequential API requests
- Wrapper to avoid repetitive try/catch