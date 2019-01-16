## **Todo 4pp**

![](Resources/img/readMeImg/home.jpg)

#### *App info*:

Todo 4pp is a productivity To-Do list application for managing daily tasks. 
It all starts with user authentication, followed by an email notification. Users can list everything they want to do and from that point they can update description of each todo, title and complete status. They can delete todos, search for todos and even filter the results.

Goal of this project for me was getting familiar working with mongo databases, preforming CRUD operations and JWT authentication,
but I'm having so much fun, that I decided to go extra mile and build effective Todo application. 

![](Resources/img/readMeImg/todos.jpg)

#### *Current functionalities*:

* User authentication 
* Hashing passwords
* Email notification
* Posting todos to database
* Deleting todos
* Updating todos, title of todo, description and completed status
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
- GulpJS                - Lodash               - Nodemailer
- Body-Parser           - Cookie-Parser
``` 

**Frontend** is done from scratch. No templates, no plugins, no third party snippets. 
**Design** is also custom made. I looked at other todo apps and tried to create something new, yet familiar.

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
