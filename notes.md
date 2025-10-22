# CS 260 Notes

[My startup - Recipes Please](https://startup.recipesplease.click)

## Helpful links

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