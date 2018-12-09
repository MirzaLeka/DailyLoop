## **Todo 4pp**

![](Resources/img/readMeImg/home.jpg)

#### *App info*:

Goal of this project for me was getting familiar working with mongo databases, preforming CRUD operations and JWT authentication,
but I'm having so much fun, that I decided to go extra mile and build effective Todo application. 

Users can create new todos. They can update them, add description, tag the completed ones, delete a single todo, selected todos
or all of them at once and if they have too many todos, they can always search for the ones they want, choose which todos to display, sort todos and even limit the results.

![](Resources/img/readMeImg/todos.jpg)

#### *Current functionalities*:

* User authentication 
* Hashing passwords
* Email notification
* Posting todos to database
* Deleting todos
* Updating todos, title of todo, description and completed attribute
* Receiving todos from database and presenting them on website
* Search for todos and filter search

#### *Current tech stack*:

``` bash
# Frontend:
- HTML                  - CSS                  - Bootstrap
- Sass                  - Javascript           - EcmaScript6
- Jquery                - Jquery Validate      - AJAX
# Backend: 
- NodeJS                - ExpressJS
- JWT                   - BcryptJS 
# Database:
- MongoDB               - Mongoose ORM
# Other modules:         
- GulpJS                - Lodash
- Body-Parser           - Cookie-Parser
``` 

**Frontend** is done from scratch. No templates, no plugins, no third party snippets. 
**Design** is also custom made. I looked at other todo apps and tried to create something new, yet familar.

All pictures on website are royalty free images downloaded from [Pexels](https://www.pexels.com).

Most of the **Backend** is done while following *Andrew Mead's* [Node.js](https://www.udemy.com/the-complete-nodejs-developer-course-2/) Udemy course. 
As I studied, I sometimes went off the course path, read the docs on my own and created features like saerch bar, search filter any many more that are yet to be revealed.

#### *Upcoming features*:

* Statistics
* Improved responsive design
* Solving all known issues
* More awesome features

![](Resources/img/readMeImg/update.jpg)

#### *Quick start*:

``` bash
# install dependencies
npm i

# run app
npm start

# Prerequisites: 
- NodeJS must be installed on your pc
- You will have to setup mongoDB database
```

Project is still in development, but you can see a preview hosted on [Heroku](https://todo4pp.herokuapp.com/).
