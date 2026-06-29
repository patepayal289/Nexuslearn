const courses = [
  {
    id: 'html-basics',
    title: 'HTML Basics',
    description: 'Learn the structure of web pages using HTML. Master headings, sections, links, and tables.',
    category: 'Web Basics',
    difficulty: 'Beginner',
    duration: '1.5 Hours',
    imageText: 'HTML5',
    color: '#e34f26',
    lessons: [
      {
        title: 'HTML Introduction',
        description: 'Understand what HTML is, its history, and why it is important for modern web architecture.',
        resources: ['https://developer.mozilla.org/en-US/docs/Web/HTML'],
        youtubeLink: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        codeSnippet: `<!DOCTYPE html>
<html>
<head>
  <title>My First Webpage</title>
</head>
<body>
  <h1>Welcome to NexusLearn</h1>
  <p>Start learning HTML today!</p>
</body>
</html>`
      },
      {
        title: 'Common HTML Tags',
        description: 'Explore essential HTML elements like headings, anchor tags, images, paragraphs, and list components.',
        resources: ['https://www.w3schools.com/tags/'],
        youtubeLink: 'https://www.youtube.com/watch?v=kUMe1FH4CHE',
        codeSnippet: `<!-- Try headings and lists -->
<h2>My Favorite Frameworks</h2>
<ul>
  <li>React.js</li>
  <li>Next.js</li>
  <li>Vue.js</li>
</ul>
<a href="https://google.com" target="_blank">Go to Google</a>`
      },
    ],
    quiz: [
      {
        question: 'What does HTML stand for?',
        options: [
          'HyperText Markup Language',
          'HighText Machine Language',
          'HyperTransfer Markup Language',
          'HyperText Website Language'
        ],
        correctIndex: 0
      },
      {
        question: 'Which HTML tag is used to display the largest heading?',
        options: [
          '<h6>',
          '<head>',
          '<heading>',
          '<h1>'
        ],
        correctIndex: 3
      },
      {
        question: 'What is the correct HTML element for creating a line break?',
        options: [
          '<break>',
          '<lb>',
          '<br>',
          '<line>'
        ],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'css-fundamentals',
    title: 'CSS Fundamentals',
    description: 'Style your websites beautifully. Learn selectors, layout tools, box model, and animations.',
    category: 'Styling',
    difficulty: 'Beginner',
    duration: '2.0 Hours',
    imageText: 'CSS3',
    color: '#1572b6',
    lessons: [
      {
        title: 'Selectors and Properties',
        description: 'Learn how to select HTML elements using classes, IDs, and elements, and apply style properties.',
        resources: ['https://developer.mozilla.org/en-US/docs/Web/CSS'],
        youtubeLink: 'https://www.youtube.com/watch?v=1PnVor36_40',
        codeSnippet: `<style>
  h1 {
    color: #38bdf8;
    text-align: center;
    font-family: sans-serif;
  }
  p {
    color: #94a3b8;
    line-height: 1.6;
  }
</style>
<h1>Hello CSS World</h1>
<p>Style sheets make the web look wonderful!</p>`
      },
      {
        title: 'Box Model',
        description: 'Understand the box model details including margins, paddings, borders, and width/height calculations.',
        resources: ['https://css-tricks.com/the-css-box-model/'],
        youtubeLink: 'https://www.youtube.com/watch?v=rIO5326FgPE',
        codeSnippet: `<style>
  .box {
    background-color: #1e293b;
    border: 2px solid #38bdf8;
    padding: 20px;
    margin: 30px;
    border-radius: 8px;
    color: white;
  }
</style>
<div class="box">
  I have padding, border, and margin!
</div>`
      },
    ],
    quiz: [
      {
        question: 'What does CSS stand for?',
        options: [
          'Creative Style Sheets',
          'Computer Style Sheets',
          'Cascading Style Sheets',
          'Colorful Style Sheets'
        ],
        correctIndex: 2
      },
      {
        question: 'Which property is used in CSS to change the background color of an element?',
        options: [
          'color',
          'bgcolor',
          'background-color',
          'background-style'
        ],
        correctIndex: 2
      },
      {
        question: 'How do you select an element with the ID "demo"?',
        options: [
          '#demo',
          '.demo',
          'demo',
          '*demo'
        ],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'js-essentials',
    title: 'JavaScript Essentials',
    description: 'Add interactive behavior and dynamic scripts to websites. Learn variables, logic, events, and DOM.',
    category: 'Scripting',
    difficulty: 'Intermediate',
    duration: '3.0 Hours',
    imageText: 'JS ES6',
    color: '#f7df1e',
    lessons: [
      {
        title: 'Variables and Data Types',
        description: 'Learn how to declare variables using let, const, and var, and explore primitives and object structures.',
        resources: ['https://www.w3schools.com/js/js_datatypes.asp'],
        youtubeLink: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        codeSnippet: `<h3>JS Variable Output</h3>
<p id="demo"></p>

<script>
  const name = "Developer";
  let age = 22;
  document.getElementById("demo").innerHTML = 
    "Hello " + name + ", you are " + age + " years old.";
</script>`
      },
      {
        title: 'Functions and Events',
        description: 'Handle clicks, inputs, and keystrokes using callbacks, arrow functions, and event listeners.',
        resources: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions'],
        youtubeLink: 'https://www.youtube.com/watch?v=8dWL3wF_OMw',
        codeSnippet: `<h3>Interactive Alert</h3>
<button onclick="showAlert()">Click Me!</button>

<script>
  function showAlert() {
    alert("Button was clicked! JavaScript in action!");
  }
</script>`
      },
    ],
    quiz: [
      {
        question: 'Which syntax is correct to write "Hello World" in an alert box?',
        options: [
          'msgBox("Hello World");',
          'alertBox("Hello World");',
          'alert("Hello World");',
          'console.log("Hello World");'
        ],
        correctIndex: 2
      },
      {
        question: 'How do you create a function in JavaScript?',
        options: [
          'function:myFunction()',
          'function myFunction()',
          'def myFunction()',
          'create myFunction()'
        ],
        correctIndex: 1
      },
      {
        question: 'Which operator is used to assign a value to a variable?',
        options: [
          '==',
          '===',
          'x',
          '='
        ],
        correctIndex: 3
      }
    ]
  },
  {
    id: 'bootstrap-basics',
    title: 'Bootstrap Basics',
    description: 'Assemble mobile-responsive grids and custom layouts at lightning speed with Bootstrap 5.',
    category: 'Styling',
    difficulty: 'Beginner',
    duration: '1.5 Hours',
    imageText: 'BS5',
    color: '#7952b3',
    lessons: [
      {
        title: 'Grid System',
        description: 'Master the responsive grid system: rows, cols, container types, and responsive breakpoint rules.',
        resources: ['https://getbootstrap.com/docs/5.3/layout/grid/'],
        youtubeLink: 'https://www.youtube.com/watch?v=5GcQtLDGXy8',
        codeSnippet: `<!-- Bootstrap classes are pre-loaded in Bootstrap courses -->
<div class="container text-center bg-dark text-white p-3 rounded">
  <div class="row">
    <div class="col bg-primary p-2 m-1 rounded">Column 1</div>
    <div class="col bg-success p-2 m-1 rounded">Column 2</div>
    <div class="col bg-danger p-2 m-1 rounded">Column 3</div>
  </div>
</div>`
      },
      {
        title: 'Components',
        description: 'Leverage prebuilt elements like buttons, badges, alerts, modals, and headers.',
        resources: ['https://getbootstrap.com/docs/5.3/components/buttons/'],
        youtubeLink: 'https://www.youtube.com/watch?v=-qfEOE4vtxE',
        codeSnippet: `<!-- Try beautiful bootstrap buttons and badges -->
<button class="btn btn-primary">
  Notifications <span class="badge bg-secondary">4</span>
</button>
<div class="alert alert-warning mt-3">
  Warning: This is a warning banner.
</div>`
      },
    ],
    quiz: [
      {
        question: 'Which class provides a responsive fixed-width container in Bootstrap?',
        options: [
          '.container-fluid',
          '.container-fixed',
          '.container',
          '.row'
        ],
        correctIndex: 2
      },
      {
        question: 'How many grid columns exist in Bootstrap by default?',
        options: [
          '8 columns',
          '10 columns',
          '12 columns',
          '16 columns'
        ],
        correctIndex: 2
      },
      {
        question: 'Which class is used to style a primary action button in Bootstrap?',
        options: [
          '.btn-action',
          '.btn-blue',
          '.btn-primary',
          '.btn-main'
        ],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'react-intro',
    title: 'Intro to React',
    description: 'Build modular, reactive user interfaces. Understand states, props, hooks, and routing.',
    category: 'Frameworks',
    difficulty: 'Advanced',
    duration: '4.0 Hours',
    imageText: 'React',
    color: '#61dafb',
    lessons: [
      {
        title: 'JSX and Components',
        description: 'Understand the syntax of JSX, embedding expressions, and separating layouts into modular functional components.',
        resources: ['https://reactjs.org/docs/components-and-props.html'],
        youtubeLink: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
        codeSnippet: `// Example Component representation
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Rendered representation:
// <Welcome name="Creative Developer" />`
      },
      {
        title: 'State and Props',
        description: 'Learn dynamic data binding, the useState hook, and passing immutable state parameters to child structures.',
        resources: ['https://reactjs.org/docs/state-and-lifecycle.html'],
        youtubeLink: 'https://www.youtube.com/watch?v=TL6o1vEHMtA',
        codeSnippet: `// Counter state example
// const [count, setCount] = React.useState(0);
// <button onClick={() => setCount(count + 1)}>
//   Count: {count}
// </button>`
      },
    ],
    quiz: [
      {
        question: 'What is JSX in React?',
        options: [
          'JavaScript XML',
          'JavaScript Extension',
          'JSON Syntax XML',
          'Java standard syntax'
        ],
        correctIndex: 0
      },
      {
        question: 'How do you pass data from a parent component down to a child component?',
        options: [
          'Using State',
          'Using Props',
          'Using Context APIs',
          'Using custom Events'
        ],
        correctIndex: 1
      },
      {
        question: 'Which standard Hook is used to track and manage state in a React functional component?',
        options: [
          'useEffect',
          'useContext',
          'useReducer',
          'useState'
        ],
        correctIndex: 3
      }
    ]
  },
];

export default courses;