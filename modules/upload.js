require('dotenv').load();
var AWS = require('aws-sdk'),
    AWS_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY = process.env.S3_SECRET;

AWS.config.update({accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY});
AWS.config.region = 'us-west-2';

var s3 = new AWS.S3();


var params = {
              Bucket: 'simple-notify',
              Key: AWS_ACCESS_KEY_ID,
              Expires: 600,

            }

var upload = {
  getUrl: function(){
    var url = s3.getSignedUrl('putObject', params)
    console.log('The Url is ', url);
    return url;
  }

}

module.exports = upload;