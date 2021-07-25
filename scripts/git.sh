#!/bin/bash
echo "Input the commit message"
read commit

cd ../
pwd
git add .
git commit -m "$commit"
git push origin main
