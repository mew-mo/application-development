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

  // put in a view all products btn click event !!
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


  // add product
  $('#addProduct').click(function() {
    event.preventDefault();

    let name = $('#a-name').val();
    let price = $('#a-price').val();
    let imageUrl = $('#a-imageurl').val();
    let userId = sessionStorage.getItem('userID');

    console.log(name, price, imageUrl, userId);

    if (name == '' || price == '' || userId == '') {
      alert('pls enter all details :/');
    } else {
      $.ajax({
        url: `${url}/addProduct`,
        type: 'POST',
        data: {
          name: name,
          price: price,
          image_url: imageUrl,
          user_id: userId
        },
        success: function(product){
          console.log(product);
          alert('product added,,!');
        },
        error: function(){
          console.log('error: cant call api');
        } //err
      }); //ajax
    } //else
  }); //addproduct

  //update products
  $('#updateProduct').click(function() {
    event.preventDefault();
    let productId = $('#productId').val();
    let productName = $('#productName').val();
    let productPrice = $('#productPrice').val();
    let productImg = $('#imageurl').val();
    let userId = sessionStorage.getItem('userID');

    console.log(productId, productName, productPrice, productImg, userId);

    if (productId == '') {
      alert('pls enter the id of the product ur updating');
    } else {
      $.ajax({
        url: `${url}/update/${productId}`,
        type: 'PATCH',
        data: {
          name: productName,
          price: productPrice,
          image_url: productImg,
          user_id: userId
        },
        success: function(data) {
          console.log(data);
          if (data == '401 error: user has no permission to update') {
            alert('401 error: user has no permission to update');
          } else {
            alert('updated successfully :3');
          } //else
          $('#productId').val('');
          $('#productName').val('');
          $('#productPrice').val('');
          $('#productImg').val('');
        }, //succ
        error: function() {
          console.log('error: cant call api');
        }
      });//ajax
    } //else
  }); //update product ends

// delete product
$('#deleteProduct').click(function() {
  event.preventDefault();

  if (!sessionStorage.userID) {
    alert('u dont have the right to do this, log in first. 401 permission denied');
    return;
  }
  let productId = $('#delProductId').val();
  console.log(productId);
  if (productId == '') {
    alert('please enter an id to delete product');
  } else {
    $.ajax({
      url: `${url}/delete/${productId}`,
      type: 'DELETE',
      data: {
        user_id: sessionStorage.userID
      },
      success: function(data) {
        console.log(data);
        if (data == 'deleted') {
          alert('successfully deleted');
          $('#delProductId').val('');
        } else {
          alert('enter a valid id');
        }
      }, //succ
      error: function() {
        console.log('err cant call api');
      } //err
    }); //ajax
  } // else
}); //delete


// user registration form :))
$('#regBtn').click(function(){
  event.preventDefault(); //prevents code breaking when no data is found :0

  let username = $('#regUser').val();
  let email = $('#regEmail').val();
  let password = $('#regPass').val();

  console.log(username, email, password);

  if (username === '' || email === '' || password === '') {
    alert('enter all your details fool');
  } else {
    $.ajax({
      url: `${url}/registerUser`,
      type: 'POST',
      data: {
        username: username,
        email: email,
        password: password
      },
      success: function(user) {
        console.log(user); //remove on completion of dev. all logs should be deleted :)
        if (!user == 'username already taken. pls use a different username.') {
          alert('Please log in to manipulate the product data');
        } else {
          alert('username taken already, pls try another name');
          $('#regUser').val('');
          $('#regEmail').val('');
          $('#regPass').val('');
        } // else ends
      }, // succcess ends
      error: function() {
        console.log('error: cant call api :');
      } // error ends
    }); //ajax ends
  } // big long else ends
}); //submit ends


// user login
$('#loginBtn').click(function() {
  event.preventDefault();
  let username = $('#loginUser').val();
  let password = $('#loginPass').val();

  console.log(username, password); //remove after dev for securityyyy

  if (username === '' || password === '') {
    alert('enter all your details fool');
  } else {
    $.ajax({
      url: `${url}/loginUser`,
      type: 'POST',
      data: {
        username: username,
        password: password
      },
      success: function(user) {
        console.log(user);

        if (user == 'user not found. please register :)') {
          alert('user not found, pls register as a new user or enter correct data');
        } else if (user == 'not authorized') {
          alert('get out of here,,, please try with correct details');
          $('#loginUser').val('');
          $('#loginPass').val('');
        } else {
          // session storage
          sessionStorage.setItem('userID', user._id);
          sessionStorage.setItem('userName', user.username);
          sessionStorage.setItem('userEmail', user.email);
          sessionStorage.setItem('passWord', user.password);
          // left = setting variable name for the session on the buffer, right = variable on the db / backend
          console.log(sessionStorage);
        } //else
      } //success
    }); //ajax ends
  } // else ends
}); //login click ends

$('#logoutBtn').click(function() {
  sessionStorage.clear();
  console.log('yourve been logged out.');
  console.log(sessionStorage);
});//click ends

$('h1').click(function() {
  console.log(sessionStorage);
});

}()); //iife ends
