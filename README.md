### Live Demo : https://amazon-app-with-tailwind-darkmode.netlify.app/


## to build the css: npm run build:css

## to run the app: use the live server by right click....

## build with vanilla.js, tailwind, firebase, mediaquery, and build with imagine design.

## tailwind: https://tailwindcss.com/resources

## with Tailwind , we can control more and make it customisable as i want and all that by adding bunch of css classes ( properties9), than what we can do with boostrap css

## class= w-1/2 ---> is in CSS --> width: 50%

## Icons from tailwind : https://heroicons.com/

## Jdenticon : https://jdenticon.com/get-started/vanilla-js.html ( for CDN script) and https://jdenticon.com/ ( website)

## Connecting with firebase:

## We are also connecting with firebase, create project, then go to project setting and copy the CDN script portion and add on the firebase.js file.

## also add the script tag in index.html.

This 3 things we need to add in index.html, to make firebae work:

1. initial firebase app script
2. firebase- analytics script
3. firebase-firestore script

## ( number 3 ) add also firebase firestore CDN script ( https://firebase.google.com/docs/firestore/quickstart )

### for formating the price check : http://numeraljs.com/

## also have made mobile friendly with tailwind.... class="hidden md:block"

## for gitignore file check : https://www.youtube.com/watch?v=ErJyWO8TGoM

### for adding <!-- Dark Mode -->

## READ: https://medium.com/html-all-the-things/how-to-quickly-install-tailwind-css-b4dc5431385a

## Watch : https://www.youtube.com/watch?v=O1aIa_QE1Mc ( installation of tailwind)

## https://www.youtube.com/watch?v=rFAATv30v4Y ( <!-- dark mode -->)

## https://www.youtube.com/watch?v=4OM26EUodFE

## npm init -y ( to generat package json for us, so we can install the dependency we need)

## Install Tailwind using the command prompt : npm install tailwindcss --save-dev

## npx tailwindcss init ( gives us configure file for tailwind, tailwind.config.js)

## READ: https://dev.to/dawnind/how-to-setup-tailwind-with-purgecss-and-postcss-3341 (Fix css)

## https://www.geeksforgeeks.org/how-to-add-new-colors-to-tailwind-css-and-keep-the-originals-ones/

### GOOD READ: https://saleem.dev/blog/tailwindcss-v2-enable-dark-mode-using-class/ ( useful link)

## in Pakage.json : https://tailwindcss.com/docs/just-in-time-mode#sibling-selector-variants

Not working:  
"scripts": {
"dev": "TAILWIND_MODE=watch postcss -i ./src/tailwind.css -o styles.css --watch",
"build": "postcss -i ./src/tailwind.css -o styles.css"
},
