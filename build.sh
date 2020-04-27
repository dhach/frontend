#!/bin/bash

set -e

ng build --configuration=production,de --base-href=/de/de/ --outputPath=dist/de/de
ng build --configuration=production,en --base-href=/de/en/ --outputPath=dist/de/en

ng build --configuration=production,de --base-href=/at/de/ --outputPath=dist/at/de
ng build --configuration=production,en --base-href=/at/en/ --outputPath=dist/at/en

ng build --configuration=production,it --base-href=/it/it/ --outputPath=dist/it/it
ng build --configuration=production,en --base-href=/it/en/ --outputPath=dist/it/en

ng build --configuration=production,en --base-href=/my/en/ --outputPath=dist/my/en
