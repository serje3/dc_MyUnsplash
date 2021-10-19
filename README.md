<!-- Please update value in the {}  -->

<h1 align="center">Unsplash clone by serje3</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://serje3-unsplash-clone.netlify.app">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/serje3/dc_MyUnsplash">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![screenshot](https://raw.githubusercontent.com/serje3/dc_MyUnsplash/master/demo/img/preview_git.gif)

The site is located on the domain https://serje3-unsplash-clone.netlify.app

Written in React using ajax requests to the server with the Django REST Framework.
For the authorization and authentication process using JWT tokens, the python djoser library was used.

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [React](https://reactjs.org/)
- [Django](https://www.djangoproject.com/)
- [DRF](https://www.django-rest-framework.org/)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP) was to build an application to complete the given user stories.

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)), [Python 3.8+](https://www.python.org/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/serje3/dc_MyUnsplash.git
```

### React
```bash
# in directory unsplash-front

# Install dependencies
$ npm install

# Run the app
$ npm start
```
### Django
```bash
# in directory django/
$ python -m venv venv
$ source venv/bin/activate

$ pip install -r requirements.txt

$ cd unsplash/

$ python manage.py makemigrations
$ python manage.py migrate

$ python manage.py runserver

```

## Acknowledgements

<!-- This section should list any articles or add-ons/plugins that helps you to complete the project. This is optional but it will help you in the future. For example: -->

- [JWT Token Authorizations (RUS)](https://django.fun/tutorials/registraciya-i-avtorizaciya-polzovatelej-v-django-s-pomoshyu-djoser-i-veb-tokenov-json/)

## Contact

- GitHub [@serje3](https://github.com/serje3})
- Telegram [@serJAYY](https://telegram.org/)
