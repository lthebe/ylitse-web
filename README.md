Ylitse Web README
=================

[Ylitse Project][], started by SOS Children's Villages Finland, aims at
reducing the need for intergenerational child protecting services by
supporting young parents with a foster care background.

Ylitse Web is a single-page application using [Ylitse API][]. Its main focus
is on providing administration UI for Ylitse service.

[Ylitse Project]: https://www.sos-lapsikyla.fi/mita-me-teemme/kehittamistyo/ylitse-projekti/
[Ylitse API]: https://gitlab.com/ylitse/ylitse-api/

Dependencies
------------

Ylitse Web is a [React][] application so you will need [npm][] package
manager to install dependencies. It is also recommended to have [make][] in
order to run preconfigured targets. To have everything installed just run:

    make install

The project depends on the following libraries:

* [Babel][]
* [ESLint][]
* [Fetch][]
* [Material UI][]
* [React][]
* [Roboto font][]
* [webpack][]

[React]: https://reactjs.org/
[npm]: https://www.npmjs.com/
[make]: https://www.gnu.org/software/make/
[Babel]: https://babeljs.io/
[ESLint]: https://eslint.org/
[Fetch]: https://fetch.spec.whatwg.org/
[Material UI]: https://material-ui.com/
[Roboto font]: https://fonts.google.com/specimen/Roboto
[webpack]: https://webpack.js.org/

Usage
-----

Start development server:

    make run

And point your browser to `http://localhost:3000/`.

Development
-----------

Ylitse Web in written in JavaScript ES6 following [Airbnb style guide][] (with
some small exceptions, see `.eslintrc`). Always make sure that your code passes
all style tests:

    make lint

[Airbnb style guide]: https://github.com/airbnb/javascript

Releasing
---------

To bump a version, edit `package.json` and NEWS, where [ISO 8601][]
formatted dates should be used:

    0.1.1 (2017-12-10)

After a release bump the version again with `+git` suffix and start a new NEWS
entry:

    0.1.1+git (unreleased)

Always tag releases:

    git tag v$(npm run version --silent)
    git push --tags

[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html

Deployment
----------

TODO

License
-------

Ylitse Web is offered under the MIT license.
