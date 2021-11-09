const express = require('express') //express를 설치했기 때문에 가져올 수 있다.
const fs =  require('fs');
const app = express();

app.get('/', (req, res) => {
  fs.readFile('index.html', function(error, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  })
})


app.listen(5000)