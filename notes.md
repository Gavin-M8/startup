# CS 260 Notes


# Final Exam Notes

### 1. Default Ports
- **HTTP:** 80  
- **HTTPS:** 443  
- **SSH:** 22

---

### 2. HTTP Status Code Ranges
- **300–399 (Redirection):** Not an error. Indicates the client must make another request (e.g., resource moved).  
- **400–499 (Client Errors):** Client-side issues such as invalid request, unauthorized access, or missing resource.  
- **500–599 (Server Errors):** Server failed to process a valid request due to internal problems.

---

### 3. Content-Type Header
- Specifies the **media/MIME type** of the HTTP message body.
- Tells the client how to **interpret** the data (e.g., `text/html`, `application/json`, `image/png`).
- May include **charset** info (e.g., `charset=UTF-8`).
- Ensures correct **parsing**, **rendering**, and **processing** by browsers and API clients.

---

### 4. Cookie Security Attributes

**Secure Cookie**
- Only sent over **HTTPS** (encrypted transport).
- Prevents exposure of the cookie over insecure HTTP.
- Mitigates risk of **man-in-the-middle** interception.

**HttpOnly Cookie**
- Cannot be accessed via **JavaScript** (`document.cookie` is blocked).
- Helps prevent **XSS attacks** from stealing session cookies.
- Still sent with HTTP requests as normal.

**SameSite Cookie**
- Controls whether the cookie is sent with **cross-site requests**.
- Helps defend against **CSRF attacks**.
- Values:
  - **Strict:** Only sent for same-site navigation (never cross-site).
  - **Lax:** Sent for top-level navigations (safe default for most apps).
  - **None:** Sent on all cross-site requests, but **must** also have `Secure`.

---

### 5. Express Middleware Logging (General Notes)

When an Express app receives a request such as:

GET /api/document

Middleware functions receive three main objects:
- `req` (incoming request)
- `res` (outgoing response)
- `next` (callback to pass control)

General behaviors you can expect in logging:

1. **req.method**
   - For a GET request:
     - `console.log(req.method)` → `GET`

2. **req.url or req.originalUrl**
   - For a request to `/api/document`:
     - `console.log(req.url)` → `/api/document`
     - `console.log(req.originalUrl)` → `/api/document`

3. **req.path**
   - Logs the path without query string:
     - `console.log(req.path)` → `/api/document`

4. **req.query**
   - For no query parameters:
     - `console.log(req.query)` → `{}`

5. **Order of Execution**
   - Express runs middleware **top-down**.
   - If multiple middleware functions log values, they will run in the order they are registered unless one ends the response early.

6. **Common Logging Patterns**
   - Many middleware log:
     - HTTP method
     - URL/path
     - Timestamp
     - Possibly headers: `req.headers`
   - Example output a question might expect:
     ```
     GET /api/document
     ```
     or
     ```
     Method: GET
     Path: /api/document
     ```

7. **If the middleware uses next()**
   - The request continues to subsequent handlers.
   - Additional logging in later middleware will also appear.

8. **If the middleware does NOT call next()**
   - Logging stops after that middleware.
   - The response may hang unless `res.send()` or similar is called.

---

### 6. Fetch Return Value (General Express + Fetch Behavior)

#### General Behavior of `fetch()`
- `fetch(url)` always returns a **Promise** that resolves to a **Response object**, unless a network error occurs.
- The *data* is not returned automatically—the caller must read it.

#### Common Response Parsing Patterns
1. **If the frontend uses `response.json()`**
   - The returned value is a **Promise** resolving to a **parsed JavaScript object**.
   - So the final result (after `await` or `.then`) is the JSON body of the Express response.
   - Example:
     ```js
     const data = await fetch('/api').then(r => r.json());
     // data is the actual JSON object sent by Express
     ```

2. **If the frontend uses `response.text()`**
   - Returns a Promise resolving to a **string** containing the response body.
   - Example:
     ```js
     const data = await fetch('/api').then(r => r.text());
     ```

3. **If the Express route uses `res.json({...})`**
   - The fetch `.json()` will return that exact object.
   - Example Express response:
     ```js
     res.json({ status: 'ok' });
     ```
     Fetch result:
     ```js
     { status: "ok" }
     ```

4. **If the Express route uses `res.send("hello")` or `res.sendStatus(...)`**
   - Fetch `.text()` will return `"hello"`.
   - `.json()` will fail unless the body is valid JSON.

5. **If the route returns no body (e.g., `res.sendStatus(204)` or `res.end()`)**
   - `response.text()` → `""` (empty string)
   - `response.json()` → throws a JSON parse error

6. **Status Codes**
   - `fetch` does **not** reject on HTTP errors.
   - You must check `response.ok` or `response.status`.
   - Example:
     ```js
     const response = await fetch('/api');
     response.ok === true for 2xx responses
     ```

7. **If the frontend returns the raw `fetch` call**
   - The answer is: **a Promise resolving to a Response object**.

8. **If the frontend uses `await fetch(...)`**
   - The answer is: **a Response object**.

---

### 7. MongoDB Query: `{ name: "Mark" }`

#### What the query does
- This is a **standard equality match** in MongoDB.
- It returns **all documents** in the collection where the field **name** exists and is **exactly equal to the string `"Mark"`**.

#### Matching Rules
- Matches documents such as:
  ```js
  { name: "Mark" }
  { name: "Mark", age: 30 }
  { id: 4, name: "Mark", admin: false }
  ```

- Does NOT match:
  ``` js
  { name: "mark" }        // case-sensitive
  { name: "MARK" }
  { firstName: "Mark" }   // field name does not match
  { name: ["Mark"] }      // array equality rules differ
  ```

---

### 8. How Should User Passwords Be Stored?

- **Never store passwords in plain text.**
- Use a **strong, slow, one-way hashing algorithm** designed for passwords:
  - **bcrypt**
  - **scrypt**
  - **Argon2** (recommended)
  - **PBKDF2**

#### Requirements for secure password storage:
- **Per-user salt:**  
  - A random value added to each password before hashing.  
  - Prevents rainbow-table attacks and makes hashes unique.

- **Slow / cost-factor hashing:**  
  - Hash function should be intentionally slow to make brute-forcing expensive.

- **Never use fast hashes like SHA-1, SHA-256, MD5** for password storage.

- **Do not attempt reversible encryption.**  
  - Passwords should be unrecoverable; only verify them by hashing the provided input and comparing.

#### Summary Rule
- Store only: **salt + hashed password (using bcrypt/scrypt/Argon2/PBKDF2).**

---

### 9. WebSocket Message Logging (General Notes)

#### General WebSocket Logging Behavior

1. **Connection Open**
   - If frontend contains: ws.onopen = () => console.log("opened")
   - Console output: opened

2. **Receiving Messages**
   - Frontend: ws.onmessage = (event) => console.log(event.data)
   - If backend sends: socket.send("hello")
     - Console output: hello
   - If backend sends JSON: socket.send(JSON.stringify({ type: "update", value: 3 }))
     - Console output: {"type":"update","value":3}
   - If frontend parses JSON: console.log(JSON.parse(event.data))
     - Console output: { type: "update", value: 3 }

3. **Broadcast Pattern**
   - Backend broadcasts: wss.clients.forEach(c => c.send("new connection"))
   - Console output: new connection

4. **Echo Server Pattern**
   - Backend echoes messages: socket.on("message", msg => socket.send(msg))
   - Frontend sends: ws.send("test")
   - Console output: test

5. **Close Events**
   - Frontend: ws.onclose = () => console.log("closed")
   - Console output: closed

6. **Error Events**
   - Frontend: ws.onerror = err => console.log("error", err)
   - Console output: error [object Event]

---

### 10. What Is the WebSocket Protocol Intended to Provide?

- A **full-duplex**, **persistent**, **bi-directional** communication channel between client and server.
- Allows the server to **push data to the client** without the client repeatedly polling.
- Uses a single long-lived TCP connection instead of repeated HTTP requests.
- Enables **real-time** applications such as chats, games, dashboards, live updates.
- Performs an initial HTTP handshake, then upgrades the connection to the WebSocket protocol.

---

### 11. What Do These Acronyms Stand For?

- **JSX** — JavaScript XML  
- **JS** — JavaScript  
- **AWS** — Amazon Web Services  
- **NPM** — Node Package Manager  
- **NVM** — Node Version Manager  

---

### 12. React Component Output (General Notes for Missing Context)

#### General Rules for React Component Output

1. **A React component returns JSX → JSX converts to HTML text content.**
   - Whatever string, number, or JSX elements the component returns will appear in the body.

2. **If the component returns a plain string**
   - Example: return "Hello";
   - Output: Hello

3. **If the component returns a JSX element**
   - Example: return `<h1>Hello</h1>`;
   - Output (text content): `Hello` 
     (HTML element itself will also appear, but “text content” refers to the inner text)

4. **If props are used**
   - Example: ```function MyComp({ name }) { return <p>Hello {name}</p>; }```
   - With name = `"Gavin"`
   - Output: `Hello Gavin`

5. **If multiple elements are returned inside a fragment**
   - Example: `return <>A B C</>;`
   - Output: `A B C`

6. **Expressions are evaluated**
   - Example: `return <p>{1 + 2}</p>;`
   - Output: `3`

7. **Arrays render all items**
   - Example: `return <>{["a", "b", "c"]}</>;`
   - Output: `a b c` (React inserts the array items directly)

8. **Boolean, null, undefined do NOT render text**
   - Example: `{false}, {null}, {undefined}` → outputs nothing.

9. **Conditional rendering**
   - Example: `{condition ? "Yes" : "No"}`
   - Output: whichever branch resolves to a string.

10. **React removes extra whitespace**
    - JSX: `<p>  a   b   c  </p>`
    - Output: `a b c` (React normalizes whitespace)

---

### 13. Nested React Components Output (General Notes)

#### General Rules

1. **Parent renders child components**
   - When a component returns another component:
     - Example: `<App />` returns `<Header /> <Body />`
     - React replaces `<Header />` and `<Body />` with whatever those components render.

2. **Props are passed down**
   - Child components can access props from their parent.
   - Example: `<Greeting name="Gavin" />` → child can use `props.name` to render "Gavin".

3. **Text content**
   - Only strings and numbers in JSX generate visible text.
   - JSX elements generate HTML elements; their text content is nested.

4. **Fragments**
   - `<></>` does not create a DOM node; its children render inline.

5. **Arrays**
   - Returning an array of elements renders all elements in order.

6. **Conditional rendering**
   - `{condition && <Child />}` only renders the child if the condition is truthy.

7. **Component hierarchy**
   - The final rendered HTML/text is the **flattened combination** of all components’ return values.
   - React evaluates top-down:
     - Parent calls child
     - Child calls its children
     - Text content is concatenated according to DOM structure.

8. **Whitespace**
   - React normalizes whitespace; multiple spaces collapse into one.

#### Example Pattern

```js
function Child() {
  return <p>Child text</p>;
}

function Parent() {
  return (
    <div>
      <h1>Header</h1>
      <Child />
      Footer
    </div>
  );
}
```

---

### 14. React.useState Overview

- `React.useState` is a **React Hook** that lets a functional component have **state**.
- It returns a **pair**: `[stateValue, setStateFunction]`.

Example:
const [count, setCount] = React.useState(0);
- `count` → current state value (initially `0`)
- `setCount` → function to update the state

Key Behaviors:
1. **State persists across re-renders** – changing other props or parent renders does not reset the state.
2. **Updating state triggers re-render** – calling `setCount(newValue)` causes the component to re-render with the updated state.
3. **Initial state** – passed as an argument to `useState(initialValue)`.
4. **Multiple state variables** – you can call `useState` multiple times for separate pieces of state.

Example Usage:

```js
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

- Clicking the button increments `count` and updates the displayed text.

---

### 15. What Are React Hooks Used For?

- **React Hooks** let you use **state** and other React features in **functional components**, which previously required class components.
  
#### Main Purposes
1. **State Management**
   - `useState` lets functional components store and update local state.

2. **Side Effects**
   - `useEffect` runs code in response to lifecycle events (mount, update, unmount).

3. **Accessing Context**
   - `useContext` allows components to consume React Context values.

4. **Memoization**
   - `useMemo` and `useCallback` optimize performance by caching values and functions.

5. **Custom Hooks**
   - Combine multiple hooks into reusable logic for cleaner components.

#### Benefits
- Avoid class components while still having lifecycle methods and state.
- Promote **code reuse** and cleaner, more modular components.
- Make functional components fully capable of managing component logic.

---

### 16. What Do These React Hooks Do?

**State Hook (`useState`)**
- Lets a functional component **hold state**.
- Returns `[stateValue, setStateFunction]`.
- Updating state with the setter triggers a **re-render** with the new value.

**Context Hook (`useContext`)**
- Lets a component **read and subscribe** to a React Context.
- Accepts a context object (from `React.createContext`) and returns the current context value.
- Simplifies passing data deeply without prop drilling.

**Ref Hook (`useRef`)**
- Provides a **mutable container** that persists across renders.
- Common uses:
  - Accessing DOM elements (`ref.current`).
  - Storing mutable values that **do not trigger re-renders** when changed.

**Effect Hook (`useEffect`)**
- Lets a component perform **side effects** after render.
- Runs code in response to changes in dependencies or on mount/unmount.
- Typical uses:
  - Data fetching
  - Subscriptions
  - DOM updates

**Performance Hooks (`useMemo`, `useCallback`, `useTransition`, etc.)**
- **`useMemo`**: Caches the result of a computation to avoid expensive recalculation on every render.
- **`useCallback`**: Caches a function instance so it doesn’t change between renders unless dependencies change.
- **Other performance helpers** (e.g., `useDeferredValue`, `useTransition`):
  - Manage rendering priority and improve responsiveness in complex UIs.


These hooks let functional components handle state, side effects, context values, DOM references, and performance optimizations without using class components.

---

### 17. React Router (General Notes)

#### General Rules About React Router

1. **`BrowserRouter` vs `HashRouter`**
   - `BrowserRouter` uses HTML5 history API (`pushState`) for clean URLs.
   - `HashRouter` uses URL hashes (`/#/path`) and works without server configuration.

2. **`Routes` and `Route`**
   - `Route` defines a path and component to render.
   - `Routes` replaces `Switch` in React Router v6.
   - Only the first matching route renders (unless `index` or `*` used).

3. **`Link` and `NavLink`**
   - `<Link to="/path">` navigates **without reloading the page**.
   - `<NavLink>` adds an active class when the route matches.

4. **Route Matching**
   - Paths can include:
     - Static paths (`/home`)
     - Dynamic segments (`/user/:id`)
     - Wildcards (`*`) for 404s
   - React Router v6 matches **exactly by default**, not partially.

5. **Nested Routes**
   - Child `<Route>` components render **inside parent route’s element**.
   - `Outlet` is required in parent to display children.

6. **Redirection**
   - `<Navigate to="/newpath" />` redirects immediately.

7. **Hooks**
   - `useParams()` → returns dynamic URL parameters.
   - `useNavigate()` → programmatic navigation.
   - `useLocation()` → returns current URL/location object.

#### Shortcut
- Statements about React Router that are true usually include:
  - Routes render the correct component based on URL.
  - Links change the URL **without page reload**.
  - Dynamic segments populate parameters via `useParams`.
  - Nested routes require `Outlet` to render children.

---

### 18. What Does the package.json File Do?

- **Defines a Node.js project** and its metadata.
- **Key purposes:**
  1. **Project metadata** – name, version, description, author, license.
  2. **Dependencies** – lists packages your project requires:
     - `"dependencies"` → needed for production.
     - `"devDependencies"` → needed for development/testing only.
  3. **Scripts** – custom commands you can run via `npm run <script>` (e.g., `start`, `test`, `build`).
  4. **Engine and environment info** – Node.js version, platform requirements.
  5. **Configuration for tools** – e.g., ESLint, Babel, Jest.
- Acts as the **central manifest** for package managers like **npm** or **yarn**.

---

### 19. What Does the fetch Function Do?

- `fetch()` is a **browser API** (also available in Node via libraries) for making **HTTP requests**.
- Returns a **Promise** that resolves to a **Response object**.

Key Behaviors:
1. **Basic usage**  
   fetch(url)
     .then(response => response.json())
     .then(data => console.log(data));  
   - `response.json()` parses JSON, `response.text()` parses plain text.

2. **Supports HTTP methods**  
   GET (default), POST, PUT, DELETE, etc.  
   Example: fetch(url, { method: "POST", body: JSON.stringify(data) });

3. **Headers and options**  
   Can set headers and credentials:  
   - headers: { "Content-Type": "application/json" }  
   - credentials: "include" for cookies

4. **Error handling**  
   - fetch() rejects only on network errors.  
   - Must check `response.ok` or `response.status` for HTTP errors.

5. **Asynchronous**  
   Works with async/await:  
   const response = await fetch(url);  
   const data = await response.json();

**Purpose:** Allows client-side JavaScript to request and handle data from a server, enabling dynamic web applications.

---

### 20. What Does Node.js Do?

- **Node.js** is a **JavaScript runtime environment** built on Chrome's V8 engine.
- Allows developers to run **JavaScript on the server** outside the browser.
- Key Features:
  1. **Server-side scripting** – build web servers and APIs using JavaScript.
  2. **Non-blocking, event-driven I/O** – handles many concurrent connections efficiently.
  3. **Package management** – uses **npm** to install and manage libraries.
  4. **File system and networking access** – can read/write files, open sockets, interact with databases.
- Enables building **full-stack JavaScript applications** without switching languages between client and server.

---

### 21. What Does PM2 Do?

- **PM2** is a **process manager** for Node.js applications.
- Key functions:
  1. **Process management**
     - Starts, stops, restarts, and monitors Node.js apps.
  2. **Daemon mode**
     - Runs apps in the background, keeping them alive after logout or server restart.
  3. **Load balancing**
     - Can run multiple instances of an app to utilize multiple CPU cores.
  4. **Monitoring and logging**
     - Tracks memory, CPU usage, and logs for easy debugging.
  5. **Startup scripts**
     - Can configure apps to start automatically on system boot.
- Useful for **production deployment** of Node.js services.

---

### 22. What Does Vite Do?

- **Vite** is a **modern frontend build tool** for web development.
- Key purposes:
  1. **Development server**
     - Provides **fast hot module replacement (HMR)** for instant updates during development.
  2. **Build tool**
     - Bundles and optimizes assets for production using **Rollup** under the hood.
  3. **Supports modern JavaScript and frameworks**
     - Works with React, Vue, Svelte, and plain JS projects.
  4. **ES modules**
     - Uses native ES module imports for lightning-fast dev startup.
  5. **Plugin ecosystem**
     - Extensible via Vite plugins for additional functionality (e.g., TypeScript, JSX, CSS preprocessors).
- Goal: **improve development speed and productivity** compared to traditional bundlers like Webpack.


---


[My startup - Recipes Please](https://startup.recipesplease.click)

## Helpful links

- [API service - Zen Quotes](https://zenquotes.io/)
- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 23.22.223.216
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

 ## Midterm Notes

1. In the following code, what does the link element do?<br>
      Answer:
      The `<link>` element connects an external resource to the HTML document — most commonly a CSS stylesheet.

      Useful notes:

       - Must be placed inside the `<head>` element.

       - The rel attribute defines the relationship (e.g., "stylesheet", "icon").

       - Can also be used for things like preloading resources or linking favicons.

      Typical usage:

      ``` html
      <link rel="stylesheet" href="styles.css">
      ```

2. In the following code, what does a div tag do?<br>
      Answer:
      The <div> tag is a block-level container used to group other HTML elements together for layout or styling purposes.

      Useful notes:

       - It doesn’t add any visual styling by itself — it’s mainly for organization and structure.

       - Commonly used with classes or IDs for CSS or JavaScript targeting.

       - Block-level means it takes up the full width of its parent and starts on a new line.

       - `<div>` is often used as a layout container for sections, grids, or wrappers.

      Example:

      ``` html
      <div class="card">
        <h2>Title</h2>
        <p>Some text here</p>
      </div>
      ```

3. In the following code, what is the difference between the #title and .grid selector?<br>
      Answer:
      #title targets an element with the specific id "title".
      Example:

      ``` html
      <h1 id="title">Welcome!</h1>

      #title {
        color: blue;
      }
      ```

      .grid targets all elements that have the class "grid".
      Example:

      ``` html
      <div class="grid">...</div>
      <section class="grid">...</section>

      .grid {
        display: grid;
      }
      ```

       - "#" → selects one unique element (by id)

       - "." → selects one or many elements (by class)

       - IDs should be unique per page, while classes are reusable.

4. In the following code, what is the difference between padding and margin?<br>
      Answer:
      | Property    | What it affects                       | Where the space goes                                    | Visual analogy                                           |
      | ----------- | ------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------- |
      | **Padding** | Space **inside** an element’s border  | Between the element’s **content** and its **border**    | Like the **inside padding** of a box around its contents |
      | **Margin**  | Space **outside** an element’s border | Between the element’s **border** and **other elements** | Like the **space between boxes**                         |


5. Given this HTML and this CSS how will the images be displayed using flex?<br>
      Answer:
      They’ll appear side by side in a horizontal row by default.

      Useful Notes:

       - display: flex → makes child elements line up in a row.

       - justify-content → controls horizontal alignment.

       - align-items → controls vertical alignment.

       - flex-wrap: wrap → lets items move to a new line if needed.

6. What does the following padding CSS do?<br>
      Answer:
      It adds space inside an element, between the content and its border.

      Useful Notes:

       - padding: 10px; → 10px on all sides.

       - padding: 10px 20px; → 10px top/bottom, 20px left/right.

       - padding: 10px 20px 30px 40px; → top, right, bottom, left (clockwise).

       - Padding affects the size of the box but doesn’t move the element away from others — that’s margin.

7. What does the following code using arrow syntax function declaration do?<br>
      Answer:
      It defines a function using arrow syntax, which is a shorter way to write functions in JavaScript.

      Useful Notes:

      Example:

      ``` js
      const add = (a, b) => a + b;
      ```

      Same as:

      ``` js
      function add(a, b) {
        return a + b;
      }
      ```

      Arrow functions:

       - Are anonymous (no function name by default).

       - Don’t have their own this, arguments, or super.

       - Are great for short, inline callbacks (like in .map(), .forEach()).

8. What does the following code using map with an array output?<br>
      Answer:
      It outputs a new array where each element is the result of applying a function to the corresponding element in the original array.

      Useful Notes:

      Example:

      ``` js
      const nums = [1, 2, 3];
      const doubled = nums.map(n => n * 2);
      console.log(doubled); // [2, 4, 6]
      ```

      .map():

       - Does not modify the original array.

       - Returns a new array.

       - Is often used for transforming data.

9. What does the following code output using getElementByID and addEventListener?<br>
      Answer:
      It sets up an event listener on a specific HTML element (found by its ID) so that when an event occurs (like a click), a function runs and produces the output (e.g., updates text or logs something).

      Useful Notes:

      Example:

      ``` js
      document.getElementById("btn").addEventListener("click", () => {
        console.log("Button clicked!");
      });
      ```

      → Outputs “Button clicked!” when the button is pressed.

       - getElementById("id") → selects one element by ID.

       - addEventListener(event, function) → runs the function when the event happens.

       - Common events: "click", "mouseover", "keydown", "input".

10. What does the following line of Javascript do using a # selector?<br>
      Answer:
      It selects an HTML element by its ID using a CSS-style selector.

      Useful Notes:

      Example:

      ``` js
      document.querySelector("#title");
      ```

      → Selects the element with id="title".

       - "#" means ID selector (same as CSS).

       - document.querySelector() → returns the first matching element.

       - Use document.querySelectorAll("#id") to get all matches (returns a NodeList).

      Equivalent older method:

      ``` js
      document.getElementById("title");
      ```

11. Which of the following are true? (mark all that are true about the DOM)<br>
      Answer:
      The DOM (Document Object Model) is a tree-like structure representing an HTML document that can be accessed and manipulated with JavaScript.

      Useful Notes:

       - The DOM represents each HTML tag as a node (object) in a tree structure.

       - You can use JavaScript to:

         - Read content (.textContent, .innerHTML).

         - Modify elements (.style, .classList.add(), etc.).

         - Create or remove nodes (.appendChild(), .remove()).

       - Changes to the DOM update the visible webpage instantly.

       - The DOM is not the HTML file itself, but a live model of it in memory.

12. By default, the HTML span element has a default CSS display property value of:<br>
      Answer:
      inline

      Useful Notes:

       - `<span>` is an inline element, meaning:

         - It doesn’t start on a new line.

         - It only takes up as much width as its content.

       - Inline elements can’t have width/height set directly (unless changed to display: block or inline-block).

       - Common inline elements: `<a>`, `<strong>`, `<em>`, `<img>`, `<span>`.

13. How would you use CSS to change all the div elements to have a background color of red?<br>
      Answer:

    ``` css
      div {
        background-color: red;
      }
    ```

      Useful Notes:

       - This uses a type selector, which targets all `<div>` elements.

       - background-color sets the element’s background fill color.

       - You can target specific divs with:

         - Class: .myDiv { background-color: red; }

         - ID: #mainDiv { background-color: red; }    

14. How would you display an image with a hyperlink in HTML?<br>
      Answer:

      ``` html
      <a href="https://example.com">
        <img src="image.jpg" alt="Example image">
      </a>
      ```

      Useful Notes:

       - The `<a>` tag creates a clickable link.

       - The `<img>` tag displays an image.

       - Nesting `<img>` inside `<a>` makes the image clickable.

       - Always include an alt attribute for accessibility and SEO.

15. In the CSS box model, what is the ordering of the box layers starting at the inside and working out?<br>
      Answer:
      Content → Padding → Border → Margin

      Useful Notes:

       - Content: The actual text or image inside the box.

       - Padding: Space inside the border, around the content.

       - Border: The line surrounding the padding and content.

       - Margin: Space outside the border, separating the element from others.

       - The total element size = content + padding + border + margin.

16. Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?<br>
      Answer:

      ``` css
      #trouble {
        color: green;
      }
      ```

      Useful Notes:

       - Use an ID selector (#trouble) to target only the specific element.

      Example HTML:

      ``` html
      <p id="trouble">trouble</p>
      <p>double</p>
      ```

       - This won’t affect other text because IDs are unique.

       - You could also use a class if multiple elements need the same styling.

17. What will the following code output when executed using a for loop and console.log?<br>
      Answer:
      It will print each iteration’s value to the console.

      Useful Notes:

      Example:

      ``` js
      for (let i = 0; i < 3; i++) {
        console.log(i);
      }
      ```

      Output:

      0 <br>
      1 <br>
      2 <br>


      - console.log() shows the value immediately in the browser console.

      - The output depends on the loop’s start, end, and increment.

      - Common loops: for, while, for...of, for...in.

18. How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?<br>
      Answer:

      ``` js
      document.getElementById("byu").style.color = "green";
      ```

      Useful Notes:

       - getElementById("byu") → selects the element with id="byu".

       - .style.color → modifies the element’s CSS color property.

      Equivalent using querySelector:

      ``` js
      document.querySelector("#byu").style.color = "green";
      ```

       - This only affects that one element, since IDs are unique.

19. What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?<br>
      Answer:
      | Element              | Opening Tag |
      | -------------------- | ----------- |
      | Paragraph            | `<p>`       |
      | Ordered list         | `<ol>`      |
      | Unordered list       | `<ul>`      |
      | First level heading  | `<h1>`      |
      | Second level heading | `<h2>`      |
      | Third level heading  | `<h3>`      |

      Useful Notes:

       - `<p>` is for paragraphs of text.

       - `<ol>` and `<ul>` are for lists; list items use `<li>`.

       - `<h1>`–`<h6>` define headings, with `<h1>` being the most important and `<h6>` the least.

20. How do you declare the document type to be html?<br>
      Answer:

      ``` html
      <!DOCTYPE html>
      ```

      Useful Notes:

       - Must be the very first line in an HTML file.

       - Declares the document as HTML5.

       - Helps the browser render the page correctly.

       - It is not case-sensitive, but <!DOCTYPE html> is standard.

21. What is valid javascript syntax for if, else, for, while, switch statements?<br>
      Answer:

      ``` js
      // if / else
      if (condition) {
        // code if true
      } else {
        // code if false
      }

      // for loop
      for (let i = 0; i < 5; i++) {
        // code repeated 5 times
      }

      // while loop
      while (condition) {
        // code repeated while condition is true
      }

      // switch statement
      switch (expression) {
        case value1:
          // code
          break;
        case value2:
          // code
          break;
        default:
          // code if no case matches
      }
      ```

      Useful Notes:

       - Always use curly braces {} for blocks.

       - Use === for strict equality (recommended).

       - for loops have initialization; condition; increment.

       - switch statements fall through if break is omitted.

22. What is the correct syntax for creating a javascript object?<br>
      Answer:

      ``` js
      const person = {
        name: "Bob",
        age: 28,
        student: false
      };
      ```

      Useful Notes:

      Objects use curly braces `{}` with key–value pairs.

      Keys and string values are separated by colons (`:`), and pairs by commas.

      Access properties with:

      Dot notation: `person.name`

      Bracket notation: `person["age"]`

      You can also create an empty object:

      ``` js
      const obj = {};
      ```

      or with the constructor:

      ``` js
      const obj = new Object();
      ```

23. Is it possible to add new properties to javascript objects?<br>
      Answer:
      Yes, you can add new properties to objects at any time.

      Useful Notes:

      Example:

      ``` js
      const person = { name: "Bob" };
      person.age = 28;          // add a new property
      person["student"] = false; // alternative syntax
      ```

       - Objects in JavaScript are mutable, so properties can be added, changed, or deleted.

       - If the object is declared with const, you cannot reassign the object, but you can modify its properties.

24. If you want to include JavaScript on an HTML page, which tag do you use?<br>
      Answer:

      ``` html
      <script src="script.js"></script>
      ```

      or inline:

      ``` html
      <script>
        console.log("Hello World");
      </script>
      ```

      Useful Notes:

       - The `<script>` tag includes JavaScript in the HTML.

       - `src` attribute → links to an external JS file.

       - Inline JS → write code directly between `<script>` and `</script>`.

       - Best practice: place `<script>` before `</body>` or use defer to avoid blocking page load.


25. Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?<br>
      Answer:

      ``` html
      <p id="animal">animal</p>
      <p id="fish">fish</p>
      ```
      ``` js
      document.getElementById("animal").textContent = "crow";
      ```

      Useful Notes:

       - getElementById("animal") selects only the element with that specific ID.

       - .textContent changes the text inside the element.

       - The "fish" paragraph is unaffected because it has a different ID.

      Alternative using querySelector:

      ``` js
      document.querySelector("#animal").textContent = "crow";
      ```

26. Which of the following correctly describes JSON?<br>
      Answer:
      JSON (JavaScript Object Notation) is a text-based format for representing structured data, often used to exchange data between a server and a client.

      Useful Notes:

       - JSON syntax is similar to JavaScript object syntax:

      ``` js
      {
        "name": "Bob",
        "age": 28,
        "student": false
      }
      ```

       - Key rules:

         - Keys must be strings in double quotes "key".

         - Values can be: string, number, object, array, boolean, or null.

       - JSON is language-independent but widely used in JS.

       - Use JSON.stringify() to convert a JS object to JSON, and JSON.parse() to convert JSON back to a JS object.

27. What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?<br>
      Answer:
      | Command | Purpose                                  |
      | ------- | ---------------------------------------- |
      | `chmod` | Change file or directory **permissions** |
      | `pwd`   | Print **current working directory**      |
      | `cd`    | Change **directory**                     |
      | `ls`    | List **directory contents**              |
      | `vim`   | Open **Vim text editor**                 |
      | `nano`  | Open **Nano text editor**                |
      | `mkdir` | **Create a new directory**               |
      | `mv`    | Move or **rename files/directories**     |
      | `rm`    | **Remove files or directories**          |
      | `man`   | Show **manual/help** for commands        |
      | `ssh`   | **Connect to remote machine** via SSH    |
      | `ps`    | Show **running processes**               |
      | `wget`  | **Download files** from the internet     |
      | `sudo`  | Execute a command as **superuser/root**  |


28. Which of the following console command creates a remote shell session?<br>
      Answer:
      ssh (Secure Shell)

      Useful Notes:

       - ssh user@hostname → connects securely to a remote machine.

       - Allows you to run commands on the remote system.

       - Uses encryption to protect login credentials and data.

       - Common options:

         - `-p` → specify a port

         - `-i` → specify an identity/private key file

29. Which of the following is true when the -la parameter is specified for the ls console command?<br>
      Answer:
      It lists all files (including hidden files starting with .) in long format.

      Useful Notes:

       - `ls -l` → long listing format (shows permissions, owner, size, modification date).

       - `ls -a` → include hidden files.

       - Combined as `ls -la` or `ls -al` → long format + hidden files.

      Example output:

      `-rw-r--r--  1 user  staff  1234 Oct 22 12:00 .hiddenfile`
      `-rw-r--r--  1 user  staff   567 Oct 22 12:01 file.txt`


30. Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?<br>
      Answer:

       - Top-Level Domain (TLD): click

       - Root domain (second-level domain): bozo.click

       - Subdomain(s): fruit and banana (with banana being a sub-subdomain)

      Useful Notes:

       - Domains are read right to left in hierarchy:

        ```
        banana (sub-subdomain)
        fruit  (subdomain)
        bozo   (root / second-level domain)
        click  (top-level domain)
        ```

       - The root domain is the main domain under a TLD.

       - Subdomains allow organization or separation of services, e.g., blog.example.com.

31. Is a web certificate is necessary to use HTTPS?<br>
      Answer:
      Yes, a TLS/SSL certificate is required to use HTTPS.

      Useful Notes:

       - HTTPS encrypts data between the browser and the server.

       - The certificate authenticates the website and enables encryption.

       - Without a certificate, browsers will show “Not Secure” warnings.

       - Certificates can be obtained from Certificate Authorities (CAs) or free providers like Let’s Encrypt.

32. Can a DNS A record can point to an IP address or another A record?<br>
      Answer:
      No, a DNS A record can only point directly to an IP address.

      Useful Notes:

       - An A record maps a domain name to an IPv4 address.

       - If you want to point one domain to another domain, use a CNAME record instead.

           - Example:

            ```
            www.example.com → CNAME → example.com
            example.com → A → 192.0.2.1
            ```

       - A records cannot point to another A record; they must point to the actual IP.

33. Port 443, 80, 22 is reserved for which protocol?<br>
      Answer:
      | Port | Protocol / Use                     |
      | ---- | ---------------------------------- |
      | 80   | HTTP (HyperText Transfer Protocol) |
      | 443  | HTTPS (HTTP Secure, encrypted)     |
      | 22   | SSH (Secure Shell)                 |

     Useful Notes:

     - Port 80 → standard for web traffic (not encrypted).

     - Port 443 → standard for secure web traffic (TLS/SSL).

     - Port 22 → standard for remote login and command execution over SSH.

     - These are well-known ports (0–1023) assigned by IANA. 


34. What will the following code using Promises output when executed?<br>
      Answer:
      ==== Basic Promise Notes ====
      1. A Promise represents a value that may be available now, later, or never.
      2. States: pending → fulfilled (resolved) or rejected.
      3. .then() handles success, .catch() handles errors, .finally() always runs.
      4. Promises are asynchronous; executor runs immediately, handlers run later.

      ==== Example: Multiple Promises and console.log order ====
      ``` js
      console.log("Start");

      const promise1 = new Promise((resolve, reject) => {
        console.log("Promise1 executor runs");
        setTimeout(() => resolve("Result 1"), 1000);
      });

      const promise2 = new Promise((resolve, reject) => {
        console.log("Promise2 executor runs");
        setTimeout(() => reject("Error 2"), 500);
      });

      promise1
        .then((value) => {
          console.log("Promise1 then:", value);
          return "Chained value";
        })
        .then((chained) => {
          console.log("Promise1 chained then:", chained);
        })
        .catch((err) => {
          console.log("Promise1 catch:", err);
        })
        .finally(() => {
          console.log("Promise1 finally runs");
        });

      promise2
        .then((value) => {
          console.log("Promise2 then:", value);
        })
        .catch((err) => {
          console.log("Promise2 catch:", err);
        })
        .finally(() => {
          console.log("Promise2 finally runs");
        });

      console.log("End");
      ```


      Expected Console Output (approximate timing):

      ```
      Copy code
      Start
      Promise1 executor runs
      Promise2 executor runs
      End
      Promise2 catch: Error 2
      Promise2 finally runs
      Promise1 then: Result 1
      Promise1 chained then: Chained value
      Promise1 finally runs
      ```