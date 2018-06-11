const http = require('http');
const https = require('https');
const fs = require('fs');
const request = require('request');

const server = http.createServer(function (req, res) {}).listen(50082);
console.log('http start');

const contents = fs.readFileSync('guest.json');

const jsonContent = JSON.parse(contents);
//console.log('Output Content : \n' + jsonContent);

for (var i = 0; i < jsonContent.length; i++) {
  if (jsonContent[i].id !== 'undefined') {
    request.get({
    url: 'http://graph.facebook.com/' + jsonContent[i].id + '/picture?width=200&height=200',//type=large
    headers: {
        'fbid': jsonContent[i].id
    }
}, function (err, res, body) {
      cb(res.request.uri.href, this.headers.fbid);
    });
  }
}

function cb(redirectUrl, fbid) {
  https.get(redirectUrl, function (res) {
    var imgData = '';
//    console.log(fbid);
    res.setEncoding('binary'); //一定要設置response的編碼為binary否則會下載下來的圖片打不開


    res.on('data', function (chunk) {
      imgData += chunk;
    });

    res.on('end', function () {
      // console.log('<li><img src="./p200x200/'+fbid+'.jpg"></li>');
      fs.writeFile('./p200x200/' + fbid + '.jpg', imgData, 'binary', function (err) {
        if (err) throw err;
        // console.log(fbid + ' down success');
      });
    });
  });

}