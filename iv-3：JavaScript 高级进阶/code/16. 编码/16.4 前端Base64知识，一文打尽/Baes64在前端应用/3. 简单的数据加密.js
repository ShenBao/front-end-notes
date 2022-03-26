
  const username = document.getElementById("username").value; 
  const password = document.getElementById("password").value;  
  const secureKey = "%%S%$%DS)_sdsdj_66";
  const sPass = utf8_to_base64(password + secureKey);
  
  doLogin({
      username,
      password: sPass
  })
  
