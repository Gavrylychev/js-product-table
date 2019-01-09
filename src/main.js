require('file-loader?name=[name].[ext]!./index.html');
import './css/style.css';

fetch('/db.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(error) {
    console.log('parsing failed', error)
  })
  