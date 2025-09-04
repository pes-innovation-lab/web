---
title: 'How to make an application with VueJS'
date: '2024-11-19'
language: 'en'
tags: ['Blog', 'VueJS', 'Web-Dev']
author: 'Anirudh Revanur'
draft: false
description: 'Let us build a VueJS application!'
---

VueJS is a very popular JavaScript framework thanks to its speed in both compiling and development. It is also compatible with all modern browsers, making it a very popular choice for new projects.

In this article, we'll be building a very simple "To-Do List" application with the help of VueJS and Tailwind CSS.

# Getting Started

In order to start off with making a VueJS application, we need to install the CLI tool that allows us to generate boilerplate code, make a development server, and additional scripts.

To install the CLI globally, run `npm install -g @vue/cli` in your terminal. This will make sure that the vue/cli can be accessed from anywhere in the machine.

Once that is done, we can start off with our project.

In the terminal, run `npm create vue@latest vue-js-blog`. This will ask us a few questions which we will answer **"No"** to all of them, because this is a demo project and we will not be using any of the more advanced tools that VueJS has to offer. Now the command prompts us to move into the directory and run `npm install`.

This is because when we run `npm create vue@latest vue-js-blog`, what we are doing is that we are generating a folder called as `vue-js-blog` and then that directory will contain the files required to run a VueJS application. On performing `npm install`, we install all of the dependencies that Vue needs.

Once npm has finished installing all of the packages, we can run `npm run dev` to open a development server of the project we're working on. This development server opens on port 5173 by default, and we can access the port by opening a browser and going to the url: [localhost:5173]("http://localhost:5173"). On opening port 5173, we see a "You did it!" page.

Congratulations, you have successfully made a VueJS application.

# Tailwind CSS

When working with frontend frameworks like Vue or React, I prefer to use TailwindCSS instead of Vanilla CSS. This is because Tailwind provides a layer of abstraction, and I do not have to worry about someone else not understanding the styling.

To install TailwindCSS on this particular project, run `npm install -D tailwindcss postcss autoprefixer` in the vue-js-blog directory. This will install tailwindcss and all of the dependencies so we can start using TailwindCSS.

Now that we have TailwindCSS installed, we have to initialize Tailwind. We cannot use Tailwind as is. To initialize Tailwind, run `npx tailwindcss init -p`. This will create two files, named "tailwind.config.js" and "postcss.config.js". These two files are config files for Tailwind and PostCSS respectively.

By default Tailwind does not watch all the files in the directory and we need to add some files to be watched.

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

This is how your tailwind.config.js file will look by default. We need to make it so that Tailwind will be applied to all of the files that we will edit. Change your tailwind.config.js file to this:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

This is how it should look now. What we have done is that we have told Tailwind to be applied to all the files in the src/ directory that end in .vue, .js, .ts, .jsx, and .tsx. We will majorly be using .vue files in this project, but for future reference, make sure to watch all file formats.

We are still not done yet! We have just installed TailwindCSS and told it what files to look at, but we have not included it anywhere.

In the project root directory, create a new file `src/assets/tailwind.css`, and within that file, add these three lines

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now in `src/main.js`, import the tailwind.css file by including `import ./assets/tailwind.css` at the top of the file.

Congratulations! You have successfully initialized a VueJS app with TailwindCSS

# Building the Application

In the project root directory we see that there is a folder called "src/". This is where all of our code will be going. On expanding the "src/" directory we see a file called `App.vue` and `main.js`. On opening `main.js`, we see that the file mounts a div using the `createApp.create()`

We will now turn our attention to `App.vue`. This is the main file that contains all of the logic. A .vue file contains three main parts.

The first part is the \<template\> tag. This is where we write all of the "HTML" code that will be rendered.

We'll start making the application now. We'll make a div tag that has the id "app", because this is what we are rendering in main.js

When making a To-Do List application, we need to take into consideration a few things. We have to make a user interface through which the user can enter a task that they want to complete. After that, the user will also have to delete a task that has been completed. So we have to have a text box where the user enters the particular task. Let's make this our first priority

## User Input

Create an \<input\> tag that will allow the user to type text into. We want this to be where the user enters text. We'll also add a placeholder text that tells "Enter your task here: ".

This is how your App.vue file should be looking like now

```
<template>
  <div id="app">
    <input placeholder="Enter your task here:"/>
  </div>
</template>
```

Now we just have a floating input box that does nothing. If we want to add the functionality of it doing something on pressing the "Enter" key, we need to add the event listener for that particular tag. In VueJS we can use the shorthand which is prefixed by "@".

We'll add the event listener on the input tag by adding `@keyup.enter="addTask"` following to the input tag. Currently "addTask" does nothing. We'll write those functions soon though.

This is how App.vue should look like now.

```
<template>
  <div id="app">
    <input @keyup.enter="addTask" placeholder="Enter your task here:"/>
  </div>
</template>
```

Now we have the user input, but we are not storing it anywhere. In order to save any kind of input, we can use the Vue directive called as "v-model". This is a way to create a two way binding, meaning if a user interacts with any text, in this case the task input, then the data property will get updated and vice-versa.

We'll add a "v-model" tag to out input that calls a function that creates a new task by adding `v-model="newTask"` to the input tag.

```
<template>
  <div id="app">
    <input @keyup.enter="addTask" v-model="newTask" placeholder="Enter your task here:"/>
  </div>
</template>
```

This is how your App.vue should look like at this point. We'll move on to implementing the actual functions now.

## Functions

In VueJS all of the JavaScript functions are written in the \<script\> tag. For this particular demonstration we'll be using JavaScript, but you can also use Typescript if you feel comfortable with it.

As we have defined in the template, the input data correlates to a variable called as "newTask". We can export this particular variable by calling it under the data function of VueJS. All of the reactive data in the application will be defined in the data function. This is how we do this in VueJS.

```
<script>
  export default{
      data() {
          return {
              newTask: ''
            };
        },
    }
</script>
```

Now we have taken care of all the reactive data that we currently have. We have a few methods that we are using, but have not defined yet. Let's do that now.

We also need to keep all of these tasks in some kind of storage, so that we can display it later when required. We do so by making another reactive data element called as "tasks" and we initialize it to an empty array.

When we want to define some methods, we cannot use the data method, because that is used for reactive data and it returns an object of all of the reactive data. We instead use a methods object that contains all of the methods that can be called in response to other actions.

```
<script>
  export default{
      data(){
          return {
              newTask: '',
              tasks: []
            };
        },

      methods: {
          addTask() {
              if(this.newTask.trim() !== ''){
                  this.tasks.push(this.newTask);
                  this.newTask = '';
                }
            },
        }
    }
</script>
```

This particular function that we have added in the script tag first trims all of the leading and trailing whitespaces in the newTask data and checks if it is an empty string. If it is not, then it pushes it to the tasks array, then replaces the newTask string back to empty, ready for new data.

Fantastic! We now have a way of taking user input and storing that data somewhere. Now it's time to render them and add a delete option from the task list.

## Rendering the List

Before we start rendering the list, we need to create an unordered list tag that will hold all of the elements from the array to render it. Under the input tag we'll make an unordered list tag with a list element under it.

```
<template>
  <div id="app">
    <input @keyup.enter="addTask" placeholder="Enter your task here:"/>
    <ul>
      <li>
        Task
      </li>
    </ul>
  </div>
</template>
```

Right now only the thing that will be rendered is the string "Task" in a unordered list fashion. We want to make it so that the elements in the array are rendered. To do this we have to use a for loop, but we cannot use a direct for loop in the template tag, so we use a directive that Vue gives, called as "v-for".

v-for allows us to render items based on a array or an object. This is going to be especially helpful because we have stored all of our tasks in an array.

```
<template>
  <div id="app">
    <input @keyup.enter="addTask" placeholder="Enter your task here: " />
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }}
      </li>
    </ul>
  </div>
</template>
```

Now using the v-for directive, we are iterating over the tasks array, and labeling each of the element with an index, and the data that is present is represented with the task. The ":key" is short hand syntax for "v-bind:key", which means that we are assigning a unique identifier to to each element that is rendered with the help of v-for. It is useful for having this unique binding because we will be deleting items from the list soon.

We use the moustache syntax \{\{\}\} in order to render a particular variable. In this case, the variable that changes in the loop is the "task" variable, and we can use the moustache syntax to render the different "tasks" from the array.

We now have a way of entering, storing and rendering a particular task on our To-Do List! Time to add the delete function for when we clear the task.

## Delete Function

In order to "delete" a task, or to remove it from our list, we need to basically remove it from the tasks array. This is quite easy because we have given all of the elements unique indices and we can use the splice command in JavaScript to remove a particular element from the list.

We need to make a button next to the task to remove the element from the list. This button will be the one that calls the delete function.

```
<template>
  <div id="app">
    <input @keyup.enter="addTask" placeholder="Enter your task here: " />
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }}
        <button @click="removeTask(index)">Mark as Complete</button>
      </li>
    </ul>
  </div>
</template>
```

What this does is that it adds a button next to each of the list elements and when clicked it calls the function removeTask while passing the index as the parameter to the function. Let's implement the function in the script tag now.

```
<script>
  export default{
      data(){
          return {
              newTask: '',
              tasks: []
            };
        },

      methods: {
          addTask() {
              if(this.newTask.trim() !== ''){
                  this.tasks.push(this.newTask);
                  this.newTask = '';
                }
            },
          removeTask(index){
              this.tasks.splice(index, 1)
            }
        }
    }
</script>
```

# Styling

This part is optional, but it is important if you want to make the application to look clean and stylish. We have Tailwind already installed, so we'll use those classes to style our web app cleanly.

First things first, go to `main.js` and remove the the line that imports "main.css". Now we can freely use Tailwind in our App.vue to make a fancy looking application. After a little amount of styling, this is how my App.vue looks like

```
<template>
  <div id="app" class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">My To-Do List</h1>
      <div class="mb-4">
        <input
          v-model="newTask"
          @keyup.enter="addTask"
          placeholder="Add a new task"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <ul class="space-y-2">
        <li
          v-for="(task, index) in tasks"
          :key="index"
          class="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg shadow-sm"
        >
          <span class="text-gray-700">{{ task }}</span>
          <button
            @click="removeTask(index)"
            class="text-red-500 hover:text-red-700 focus:outline-none"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      tasks: []
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push(this.newTask);
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    }
  }
};
</script>
```

That's it!
You've built your own To-Do List application entirely in VueJS and styled it with TailwindCSS. This web app can be run only locally and data cannot be persisted across visits, but you've learnt the basics of VueJS!
