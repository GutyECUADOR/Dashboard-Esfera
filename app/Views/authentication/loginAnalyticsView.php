<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Google Analytics Login</title>
  <meta name="google-signin-client_id" content="9864280064-mp2jar0gln48p447drbu004vl4bc7jva.apps.googleusercontent.com">
  <meta name="google-signin-scope" content="https://www.googleapis.com/auth/analytics.readonly">
</head>
<body>

<h1>Google Analytics Login v4</h1> 

<!-- The Sign-in button. This will run `queryReports()` on success. -->
<p class="g-signin2" data-onsuccess="redirect"></p>

<script>
  function redirect() {
    window.location = './dashboard';
  }

  
</script>

<!-- Load the JavaScript API client and Sign-in library. -->
<script src="https://apis.google.com/js/client:platform.js"></script>

</body>
</html>
