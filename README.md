![Tessellate](https://media.github.bus.zalan.do/user/115/files/7af8ba6e-91f8-11e6-854d-0e3ce4d4a3e0)

Micro service stack for dynamic fragments. &nbsp;&nbsp; [![Build Status](https://travis-ci.org/zalando-incubator/tessellate.svg?branch=master)](https://travis-ci.org/zalando-incubator/tessellate) [![Coverage Status](https://coveralls.io/repos/github/zalando-incubator/tessellate/badge.svg?branch=master)](https://coveralls.io/github/zalando-incubator/tessellate?branch=master) [![Code Climate](https://codeclimate.com/github/zalando-incubator/tessellate/badges/gpa.svg)](https://codeclimate.com/github/zalando-incubator/tessellate) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## What is Tessellate?

Tessellate is a server-side React renderer that creates static HTML and a complementary component tree from abstract JSON definitions. It comprises several micro services built on top of the [Mosaic](https://www.mosaic9.org) architecture.

|Package                                            |Description                                                        |Version|
|:--------------------------------------------------|:------------------------------------------------------------------|:------|
|[tessellate-editor](packages/tessellate-editor)    |Editor for composing reusable components.                          |[![npm version](https://badge.fury.io/js/tessellate-editor.svg)](https://badge.fury.io/js/tessellate-editor)|
|[tessellate-bundler](packages/tessellate-bundler)  |Builds portable ReactJS modules from abstract component structures.|[![npm version](https://badge.fury.io/js/tessellate-bundler.svg)](https://badge.fury.io/js/tessellate-bundler)|
|[tessellate-fragment](packages/tessellate-fragment)|Agnostic fragment for rendering any ReactJS module.                |[![npm version](https://badge.fury.io/js/tessellate-fragment.svg)](https://badge.fury.io/js/tessellate-fragment)|
|[tessellate-viewer](packages/tessellate-viewer)    |Simple layout service for composing fragments.                     |[![npm version](https://badge.fury.io/js/tessellate-viewer.svg)](https://badge.fury.io/js/tessellate-viewer)|
|[tessellate-transform](packages/tessellate-transform)|Transform content to JSON for tessellate-bundler.                |[![npm version](https://badge.fury.io/js/tessellate-transform.svg)](https://badge.fury.io/js/tessellate-transform)|

## Dynamic fragments

A Mosaic Fragment is a web service that provides one part of a modular web page. Fragments can be composed together with other Fragments by the [Tailor](https://github.com/zalando/tailor) layout service. Tessellate is an implementation of such a Fragment.

tessellate-fragment can respond to requests dynamically and is agnostic about the content it provides. It renders precompiled JavaScript bundles made of React components. The bundles are compiled from an abstract JSON definition using tessellate-bundler.

## Installation

Tessellate micro services can easily be installed as Node modules:

```
npm i --save tessellate-bundler tessellate-fragment
```

## Configuration

Each micro service reads configuration from environment variables, command line arguments or a file. See each subproject for details.

## Development

Tessellate requires Node.js >= 7.6 and uses [Lerna](https://github.com/lerna/lerna) for managing packages. Run the following commands in the root directory to get started:

```
npm install   # Install dependencies and initialize packages.
npm run dist  # Compile all packages.
```

We recommend using [Atom](https://atom.io) text editor together with the [Nuclide](https://nuclide.io) plugin and [Flow](https://flowtype.org) for static type checking.

Here's how to install Nuclide (requires Atom) and Flow:

```
apm install nuclide
npm install -g flow-bin
```

For details on pull requests, commit messages and contributing please see [CONTRIBUTING.md](CONTRIBUTING.md)

## Documentation

Go to [zalando-incubator.github.io/tessellate](https://zalando-incubator.github.io/tessellate) for detailed documentation.
