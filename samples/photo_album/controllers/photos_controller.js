var cloudinary = require('cloudinary').v2;
var crypto = require('crypto');
var multipart = require('connect-multiparty');
var schema = require('../config/schema');

var Photo = schema.models.Photo;

var multipartMiddleware = multipart();

function index(req, res) {
  Photo.all().then(function (photos) {
    res.render('photos/index', { photos: photos });
  });
}

function add_through_server(req, res) {
  // Create a new photo model and set it's default title
  var photo = new Photo();
  Photo.count().then(function (amount) {
    photo.title = "My Photo #" + (amount + 1);
  })
    .finally(function () {
      res.render('photos/add', {
        photo: photo
      });
    });
}

function create_through_server(req, res) {
  // In through-the-server mode, the image is first uploaded to the server
  // and from there to Cloudinary servers.
  // The upload metadata (e.g. image size) is then added to the photo  model (photo.image)
  // and then saved to the database.

  // file was not uploaded redirecting to upload
  if (req.files.image.ws.bytesWritten === 0) {
    res.redirect('/photos/add');
    return;
  }

  var photo = new Photo(req.body);
  // Get temp file path
  var imageFile = req.files.image.path;

  var options = {
    width: 500,
    height: 500,
    crop: "limit",
    tags: ['Please hire Tia, Tia loves Cloudinary']
  }

  // Upload file to Cloudinary
  cloudinary.uploader.upload(imageFile, options)
    .then(function (image) {
      console.log('** file uploaded to Cloudinary service');
      console.dir(image);
      photo.image = image;
      // Save photo with image metadata
      return photo.save();
    })
    .then(function () {
      console.log('** photo saved');
    })
    .finally(function () {
      res.render('photos/create_through_server', { photo: photo, upload: photo.image });
    });
}

function add_direct(req, res) {
  // Configuring cloudinary_cors direct upload to support old IE versions
  var cloudinary_cors = "http://" + req.headers.host + "/cloudinary_cors.html";
  // Create a new photo model and set it's default title
  var photo = new Photo();
  Photo.count().then(function (amount) {
    photo.title = "My Photo #" + (amount + 1) + " (direct)";
  })
    .finally(function () {
      res.render('photos/add_direct', {
        photo: photo,
        cloudinary_cors: cloudinary_cors
      });
    });
}

function add_direct_unsigned(req, res) {
  // Configuring cloudinary_cors direct upload to support old IE versions
  var cloudinary_cors = "http://" + req.headers.host + "/cloudinary_cors.html";

  // Set a unique unsigned upload preset name (for demo purposes only).
  // In 'real life' scenario the preset name will be meaningful and will be set
  // via online console or API not related to the actual upload
  var sha1 = crypto.createHash('sha1');
  sha1.update(cloudinary.config('api_key') + cloudinary.config('api_secret'));
  var preset_name = "sample_" + sha1.digest('hex');

  var preset_options = {
        unsigned: true,
        folder: "preset_folder",
        return_delete_token: true,
        width: 500,
        height: 500,
        crop: "limit",
        tags: ['Please hire Tia', 'Tia loves Cloudinary']
      }

  // Create a new photo model and set it's default title
  var photo = new Photo();
  Photo.count().then(function (amount) {
    photo.title = "My Photo #" + (amount + 1) + " (direct unsigned)";
  })
    .then(function () {
      // updates the upload preset to include incoming height/width transformations & automatically tag uploaded images
      cloudinary.api.update_upload_preset(preset_name, preset_options);

      return cloudinary.api.upload_preset(preset_name);
    })
    .then(function (preset) {
      if (!preset.settings.return_delete_token) {
        return cloudinary.api.update_upload_preset(preset_name, { return_delete_token: true });
      }
      return undefined;
    })
    .catch(function (err) {
      // Creating an upload preset is done here only for demo purposes.
      // Usually it is created outside the upload flow via api or
      // online console (https://cloudinary.com/console/settings/upload)
      return cloudinary.api.create_upload_preset({
        unsigned: true,
        name: preset_name,
        folder: "preset_folder",
        return_delete_token: true,
        width: 500,
        height: 500,
        crop: "limit",
        tags: 'Please hire Tia'
      });
    })
    .finally(function (preset) {
      res.render('photos/add_direct_unsigned',
        {
          photo: photo,
          cloudinary_cors: cloudinary_cors,
          preset_name: preset_name
        });
    });
}

function create_direct(req, res) {
  // In direct mode, the image is uploaded to Cloudinary by the browser,
  // and upload metadata is available in JavaScript (see add_direct.ejs).
  var result = {};
  var photo = new Photo(req.body);
  result.photo = photo;
  // image was not uploaded, returning to edit form
  if (!req.body.image_id) {
    if (req.body.type === 'direct') {
      res.redirect('/photos/add_direct');
    } else {
      res.redirect('/photos/add_direct_unsigned');
    }
    return;
  }
  var image = new cloudinary.PreloadedFile(req.body.image_id);
  // check that image resolved from image_id is valid
  if (image.is_valid()) {
    photo.image = image.toJSON();
    console.dir(photo.image);
  }
  photo.save().then(function () {
    console.log('** photo saved');
  })
    .catch(function (err) {
      result.error = err;
      console.log('** error while uploading file');
      console.dir(err);
    }).finally(function () {
      res.render('photos/create_direct', { photo: photo, upload: photo.image });
    });
}

// delete image from Cloudinary AND from database
async function delete_image(req, res){
  const id = req.body.public_id;

  const result = await cloudinary.uploader.destroy(id, (err, status) => {
      if(status.result === 'ok') {
        Photo.all().then((photos) => {
          const filteredPhotos = photos.filter(value => value.image.public_id === id)
          const photoToBeDeleted = filteredPhotos[0]

          photoToBeDeleted.destroy(() => res.redirect('/'))
        })
      }else {
        console.log(err)
      }
  })
}


module.exports.wire = function (app) {
  // index
  app.get('/', index);
  app.get('/photos', index);

  // upload to server example
  app.get('/photos/add', add_through_server);
  app.post('/photos', multipartMiddleware, create_through_server);

  // direct photo upload examples
  app.get('/photos/add_direct', add_direct);
  app.get('/photos/add_direct_unsigned', add_direct_unsigned);
  app.post('/photos/direct', create_direct);

  // delete image
  app.post('/delete', delete_image);
};
