#!/bin/bash

echo "Deploy bash script..."
pwd
echo "Going to install run bower i"
bower i
rm -rf ./assets/vendor/angular-animate/
bower i --save-dev angular-animate@1.6.4