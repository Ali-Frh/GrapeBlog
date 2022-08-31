# GrapeBlog 🍇
![Development Status](https://img.shields.io/badge/Development%20Status-Beta-green)
![License](https://img.shields.io/badge/License-MIT-blue) \
a Simple Static Blog Generator <br/> <br/>
![out](https://user-images.githubusercontent.com/16538325/185813590-ecf3ee2d-44d4-4ab1-aa9a-bcf8aa17afdd.gif) \
Demo: https://Ali-Frh.github.io/GrapeBlog


## WTF Is This ?
GrapeBlog is a simple static blog generator, that's it!\
I'm always interested in writing blog posts, but also I have concerns about keeping them as free as possible,\
On the other hand, I find Github Pages a great opportunity for static backend-less web pages to share their knowledge without any concern.\
and for this goal, I found a project named Jekyll which I find it very complicated and even not compatible with RTL Languages, so long story short I wanted to make a Jekyll alternative with less complexity without ruby-crap and stuff.

## Key Features:
### Performance ⚡
Nothing is faster than vanilla HTML and CSS!
### Security 🛡️ 
No backend = No vulnerability
### Easy to Use 👌 
Just write your Post and Build it.
### Supports different Themes 🖼️
Currently has Default RTL Theme.
### Comment System 💬         
Who says static websites can't have comment system ?!

## Project State:
Version 1 Deployed.

## Notes:
1. If You want to use Github Pages with GrapeBlog, there is a important thing that you should know:\
Github Idiotically Consider our Export (and maybe any static html file) as Jekyll Export and builds it with Jekyll builder \
and because we are not based on Jekyll, it fails and you see a 404 page instead of your Magnificent Blog. \
~~**Solution:** You have to make a file in / directory of your repo, with '.nojekyll' name to inform github that we are not using Jekyll. \
(i'll change the script to cover this issue and make this file in the generated files)~~\
Script Covers this and you just have to don't mess with the .nojekyll file.
2. We use python-markdown package as markdown parser, [Here](https://daringfireball.net/projects/markdown/syntax) is the Syntax document of it's accent.
(note that in this Markdown Accent you have to Use two spaces at the end of the line for newline effect)
3. Do not Change Your Posts' Slug! Because our comment system linked to post's filename (Date_Slug) and if you change it you will lose your previous comments. (its fine for posts with no comments though).

## TODO:
(in order of priority (completed first)) \
☑️ Choose Proper Licence \
☑️ Candy-ass Terminal Responses \
☑️ Simplify adding Custom Pages \
☑️ Screenshots and Demo \
☑️ Jalali Calendar \
⬜ Image Optimizer (Convert & Compress) \
⬜ 404 Page \
⬜ Build Date Timestamp \
⬜ Simple Usage Guide \
⬜ Cross Platform Support \
⬜ Following PEP-8 Pattern \
⬜ Increase GTMetrix of Default Template \
⬜ Make LTR Template \
⬜ Make Wiki and Theming Guide \
⬜ Assets Watermarker \
⬜ Design Another Themes \
⬜ Human Friendly gh-pages Deployer \
⬜ Add Useful Comments (in code) \
⬜ Make Cli Tool \
⬜ Post Recovery Tool \
⬜ Control through Web UI 

## Thanks To:
- Jekyll Project for inspiration 
- Cusdis Project for Comment Section
- [jdf.scr.ir](https://jdf.scr.ir/jdf/python) for Jalali Date Convertor \
[![forthebadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)](https://www.python.org/)
