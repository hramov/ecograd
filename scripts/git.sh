#!/bin/bash
echo "Input the commit message"
read commit

cd ../server
pwd
git add .
git commit -m "$commit"
git push origin main

cd ../client
pwd
git add .
git commit -m "$commit"
git push origin main
