# PES Innovation Lab (formerly Microsoft Innovation Lab)

<img src="./public/images/mlab/mlab_logo_black.png" alt="logo" width="100px" height="90px"><br/>

 We are a student community dedicated to cultivating the spirit of research and innovation in budding engineers.<br/>


This is the main repository for the website hosted at - [PES Innovation Lab website](https://pes-innovation-lab.github.io/web/). Be sure to head out to our website and take a look at some of the exciting projects carried out at the lab.

# Development
The development version up to date with the current version of the `gh-pages` branch can be found here - [PES Innovation Lab Github pages](https://pes-innovation-lab.github.io/web/). This application is written in Javascript and is powered by NextJS and consequently, by ReactJS.

Dynamic data is fetched from an API server running on Heroku. Refer to: [PES Innovation Lab API Repository](https://github.com/PES-Innovation-Lab/api) for more information on the API.

## Setting up your development environment :

1. Clone the repository after forking.
2. Ensure you have nodeJS and npm installed.
3. Run `npm install` to fetch and install all the necessary packages
4. Run `npm run dev` to run the development server.
5. Access website at `http://localhost:3000/`.

## Build and export

1. Run `npm run build` to build the application.
2. Run `npm run export` to export the application as a set of static pages.

## Contributing

We use a rebase-oriented workflow. We do not use merge commits. This means to get your local branch up-to-date with the upstream, you would use
```
git pull --rebase upstream master
```
instead of regular `git pull`. It’s best to write your commits prefacing the file you changed, but if you don’t, you can always fix your history using `git rebase -i`. An example of a good commit would be
```
index: Fix UI layout in mobile view.
```

## Adding new blogs

Blogs written in the markdown format are rendered and displayed on the site. To add a new blog, create a file with the `.md` extension in the `blogs/` directory under the root folder.

Contact
-----
email : pes.mlab@gmail.com <br/>
Website : https://pes-innovation-lab.github.io/web/ <br/>

----