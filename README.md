## Northcoders News (Front End)

A deployed version of this project can be found here: (https://nicola-nc-news.netlify.com/)

### About

Northcoders News is a social news aggregation, web content rating, and discussion website. Think something along the lines of [Reddit](https://www.reddit.com/).

Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.
There is a log in function, which randomly generates a different user each time and provides you with the password pre-filled. Once logged in, you remain logged in for the duration of your browser session (or until you log out) and this allows you to vote up or down on articles and comments, add new articles and comments, and delete your own comments.

Northcoders News was built in React, using Reach Router. This Front End uses Axios to make requests and relies on a Back-End API, which has been deployed here: (https://nd-be-news.herokuapp.com/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js
- React

Dependencies:

```
@reach/router: ^1.2.1,
axios: ^0.18.0,
lodash: ^4.17.11,
react: ^16.6.3,
react-collapsible: ^2.3.2,
react-dom: ^16.6.3,
react-loading: ^2.0.3,
react-scripts: 2.1.1,
react-tooltip: ^3.9.0,
react-truncate: ^2.4.0,
reactjs-popup: ^1.3.1,
// icons
@fortawesome/fontawesome-svg-core: ^1.2.8,
@fortawesome/free-brands-svg-icons: ^5.5.0,
@fortawesome/free-regular-svg-icons: ^5.5.0,
@fortawesome/free-solid-svg-icons: ^5.5.0,
@fortawesome/react-fontawesome: ^0.1.3,
```



### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
