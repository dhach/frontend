#!/bin/bash

ng build --configuration=testproduction,de --base-href=/de/de/ --outputPath=dist/de/de
ng build --configuration=testproduction,en --base-href=/de/en/ --outputPath=dist/de/en

ng build --configuration=testproduction,de --base-href=/at/de/ --outputPath=dist/at/de
ng build --configuration=testproduction,en --base-href=/at/en/ --outputPath=dist/at/en

ng build --configuration=testproduction,it --base-href=/it/it/ --outputPath=dist/it/it
ng build --configuration=testproduction,en --base-href=/it/en/ --outputPath=dist/it/en

ng build --configuration=testproduction,en --base-href=/my/en/ --outputPath=dist/my/en
