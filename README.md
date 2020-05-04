# PIRAT Frontend

This repository contains the frontend web application for https://pirat-tool.com/.


## Setup

#### Prerequisites

A running backend server is required for the web app to work. More details about how to start the backend can be found in the [backend repository](https://github.com/COVID19-PIRAT/backend).

Furthermore, the following tools should be installed:

* nodejs
* Angular CLI (`npm install -g @angular/cli`)


#### Getting Started

This is an Angular app.

To start the development mode:

`npm run start`

Linting (please run it before every commit):

`npm run lint`

We use [Angular's i18n](https://angular.io/guide/i18n). The translation files are in a [separate repository](https://github.com/COVID19-PIRAT/frontend-i18n) which is included as a Git submodule into this repository (`-> src/i18n`). Run the following command to extract the i18n-marked strings in the HTMLs:

`npm run extract-i18n`

Afterwards, commit the changes in the i18n repository.


## Translations

<a href="http://translate.pirat-tool.com/engage/pirat/?utm_source=widget">
<img src="http://translate.pirat-tool.com/widgets/pirat/-/multi-auto.svg" width="600" alt="Translation Status" />
</a>
