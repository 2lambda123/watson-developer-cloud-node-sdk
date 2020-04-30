'use strict';

var VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  // iam_apikey: 'INSERT YOUR IAM API KEY HERE',
  version: '2020-04-20',
});

var params = {
  // An image file (.jpg, .png) or .zip file with images
  // images_file: fs.createReadStream('./resources/car.png')
  images_file: fs.createReadStream('./resources/images.zip'),
};

visualRecognition.classify(params, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 2));
  }
});
