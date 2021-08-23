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

-   Carefully read the exercise requirements to be sure I understood what was being asked of me.
-   Found the code on Github, then forked and cloned it to my machine installing all dependencies.
-   Read through the code in the photo album project to determine which files I would need to modify in order to fulfill the exercise requirements as well as understand how the code works, where functions are called, with what parameters, etc.
-   Read Cloudinary documentation, especially documentation on the Node.js SDK and the Upload API.
-   Read the documentation for Juggling DB
-   Coded my solution, little by little, testing and refactoring along the way.

## What went well

-   Generally everything went well. I did have a couple of issues which I will detail below. But I'm happy with what I am turning in.
-   **Note:** I changed some of the CSS on the image gallery purely for my own benefit. The two additional thumbnails I added per exercise requirements were causing a horizontal scroll (see gif). It wasn't pretty. So I changed it. ![horizontal scroll demonstration](https://res.cloudinary.com/tangoecho/image/upload/c_scale,h_200/v1629220167/horizontal-scroll_hgatmt.gif)

## Things I had trouble with

-   I did have some trouble getting the Cloudinary logo to appear as a watermarked overlay. After some time, I found the answer in a Cloudinary Support article. I used an external source for my overlay. But fetched URLs were marked as restricted in my account. So when I went into my settings and unchecked that option, it worked. Thank you so much to **Millie Axelrod** for leaving a comment on [this thread](https://support.cloudinary.com/hc/en-us/articles/360032635232-Overlay-an-image-that-s-taken-from-a-fetched-public-URL#article-comments) that helped me solve my issue.
-   I had trouble with the server-side upload. I was getting this TypeError ![TypeError:Os.tmpDir is not a function](https://res.cloudinary.com/tangoecho/image/upload/v1629168727/iypsty5qblm0thcbhbgh.png)  
    Initially not having any idea what this meant, I did what any developer would do: turned to Google. This [stackoverflow thread](https://stackoverflow.com/questions/40913034/os-tmpdir-is-deprecated-node-and-formidable) thread suggested that `os.tmpDir()` should be changed to `os.tmpdir()`, with a lowercase d. So I went to the node module and line indicated at the top of the stack trace, and made that correction. This worked perfectly for me on a MacBook Pro running macOS Big Sur version 11.4, node version 14.2.0
-   Getting my button to delete an image was challenging. At first I went about it by adding a script tag to the bottom of the page, and trying to make a fetch request (when the button was clicked )to the server where I could use the destroy method of the Cloudinary uploader. That didn't work. Then I tried using the destroy method of the Cloudinary uploader directly in my script tag. This didn't work either. Finally I stumbled across this [Cloudinary blog post](https://cloudinary.com/blog/build_the_back_end_for_your_own_instagram_style_app_with_cloudinary) where I realized all I had to do was wrap my button in a form, with the action and method attributes. While challenging, I learned a lot, and am very grateful for the nudge to continue working on it!

## ​What would I do differently next time

-   I think I should have cloned the repo, not forked and cloned.
-   I would do a better job with my git workflow. I did not make small atomic commits. And my commit messages could definitely be improved.
-   I think I would take more breaks. Note to self: breaks are good for mind and body!

## What would I have done with more time

-   I would love to play with the CSS of the image gallery page to make a prettier display of the images and their transformations. Maybe I could do this in the future as a pull request 😃

## License

[MIT](https://choosealicense.com/licenses/mit/
