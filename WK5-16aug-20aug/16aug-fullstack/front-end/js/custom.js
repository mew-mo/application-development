(function() {

  console.log('welcome 2 tha world');

  document.querySelector('.admin-btn').addEventListener('click', () => {
    document.querySelector('.admin-nav').style.display = 'block';
  }, false);

  document.querySelector('.reg-btn').addEventListener('click', () => {
    document.querySelector('.form-register').style.display = 'block';
    document.querySelector('.form-login').style.display = 'none';
  }, false);

  document.querySelector('.login-btn').addEventListener('click', () => {
    document.querySelector('.form-login').style.display = 'block';
    document.querySelector('.form-register').style.display = 'none';
  }, false);

  let url; //declare url as a variable, es6 style
  $.ajax({
    url: 'js/config.json',
    type: 'GET',
    dataType: 'json',
    success: function(configData) {
      console.log(configData);
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      console.log(url);
    },
    error: function(error) {
      console.log('error:', error);
    }
  });

  // document.querySelector('.view-btn').addEventListener('click', () => {
  //   document.querySelector('.form-login').style.display = 'none';
  //   document.querySelector('.form-register').style.display = 'none';
  // }, false);

  $.ajax({
    url: `${url}/allProductsFromDB`,
    // the url comes from our server ... the
    type: 'GET',
    dataType: 'json',
    success: function(productsFromDB) {
      console.log(productsFromDB);
      for (var i = 0; i < productsFromDB.length; i++) {
        // document.querySelector('#result').innerHTML += `
        // <div class="col-6">
        //   <p> ${productsFromDB[i].name} </p>
        //   <br>
        //   <p> $${productsFromDB[i].price} </p>
        // </div>`
      }
    }, //success ends
    error: function(){

    } //error ends
  }); //ajax ends


}()); //iife ends
