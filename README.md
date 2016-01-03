# Mantra

[![Code Climate](https://codeclimate.com/github/jeremyckahn/mantra/badges/gpa.svg)](https://codeclimate.com/github/jeremyckahn/mantra)

## A professional web animation tool for everyone

Mantra is a timeline editing tool for web animations.  It is inspired by tools such as Adobe Flash and After Effects.

![Mantra screenshot](app/img/screenshot.png)

Mantra can either be used at http://jeremyckahn.github.io/mantra/ or installed and run locally.

## Installation

System requirements:

* [NodeJS](http://nodejs.org/)/NPM,
* [Bower](http://bower.io/) (version 1.0 or above)
* [Grunt](http://gruntjs.com/)
* [Sass](http://sass-lang.com/) and [Compass](http://compass-style.org/)

Clone this repo and install the dependencies:

````
npm install && bower install
````

To run the app:

````
grunt serve
````

You can now access Mantra from http://localhost:9009.

## Developing Mantra

You can build the project with:

````
grunt build
````

And test the optimized build locally with:

````
grunt serve:dist
````

## License

Mantra is distributed under a [CC BY-NC-SA license](http://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).  Don't worry, this license does not extend to the animations you create with Mantra, just the application itself.  You are free to use the animations created by Mantra however you please.  You are encouraged to use and modify the code to suit your needs, as well as redistribute it non-commercially.
