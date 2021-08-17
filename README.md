# About

This repo is here because I was asked to complete a take-home assignment while applying for the position of **Developer Support Engineer** with [Cloudinary](https://www.cloudinary.com).

## Exercise Requirements:

-   Modify the sample project's image upload form to:
    -   Automatically limit image size to 500x500 pixels on upload
    -   Tag uploaded images (does not matter which tag)
-   Modify the sample project's gallery to display 2 additional thumbnails per image:
    -   One with the Cloudinary logo as an overlay (watermark)
    -   The other with the image saturation increased to 50%
-   **Bonus**
    -   Add a button to delete the image on the gallery list
    -   Take care of all different upload methods of the app, server-side, signed direct/client-side uploads, and unsigned direct/client-side uploads

## Usage

-   clone or download the repo
-   cd into the 'samples' folder and follow the instructions in that README for setting up the Photo Album sample

## My process for completing these exercises

-   I carefully read the exercise requirements to be sure I understood what was being asked of me.
-   I found the code on Github. Forked and cloned it to my machine and installed all dependencies.
-   I took a lot of time to read through the code in the photo album project to determine which files I would need to modify in order to fulfill the exercise requirements. And to understand how the code works, where functions are called, with what parameters, etc.
-   I spent time reading Cloudinary documentation, especially documentation on the Node.js SDK and the Upload API.
-   I started coding my solution.

## What went well

-   Generally everything went well. I did have a couple of issues which I will detail below. But I'm happy with what I am turning in.
-   **Note:** I changed some of the CSS on the image gallery purely for my own benefit. The two additional thumbnails I added per exercise requirements were causing a horizontal scroll (see gif). It wasn't pretty. So I changed it. ![horizontal scroll demonstration](https://res.cloudinary.com/tangoecho/image/upload/c_scale,h_200/v1629220167/horizontal-scroll_hgatmt.gif)

## Things I had trouble with

-   I did have some trouble getting the Cloudinary logo to appear as a watermarked overlay. After entirely too much time floundering, I found the answer in a Cloudinary Support article. I used an external source for my overlay. But fetched URLs were marked as restricted in my account. So when I went into my settings and unchecked that option, it worked. Thank you so much to **Millie Axelrod** for leaving a comment on [this]('https://support.cloudinary.com/hc/en-us/articles/360032635232-Overlay-an-image-that-s-taken-from-a-fetched-public-URL#article-comments') thread that helped me solve my issue.
-   I had trouble with the server-side upload. I was getting this TypeError ![TypeError:Os.tmpDir is not a function](https://res.cloudinary.com/tangoecho/image/upload/v1629168727/iypsty5qblm0thcbhbgh.png)  
    Not having any idea what this meant, I did what any developer would do: turned to Google. This [stackoverflow]('https://stackoverflow.com/questions/40913034/os-tmpdir-is-deprecated-node-and-formidable') thread suggested that `os.tmpDir()` should be changed to `os.tmpdir()`, with a lowercase d. So I went to the node module and line indicated at the top of the stack trace, and made that correction. This worked perfectly for me on a MacBook Pro running macOS Big Sur version 11.4, node version 14.2.0

## ​What would I do differently next time

-   I think I should have cloned the repo, not forked and cloned.
-   I would do a better job with my git workflow. I did not make small atomic commits. And my commit messages could definitely be improved.
-   I was not able to get my button to delete images from the gallery to be functional. If this task were being done outside of a job application, I would have asked someone for help.
    ​

## What would I have done with more time

-   I would love to play with the CSS of the image gallery page to make a prettier display of the images and their transformations. Maybe I could do this in the future as a pull request 😃

## License

[MIT](https://choosealicense.com/licenses/mit/
