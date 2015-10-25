# Kandy Tutorial: Creating Users

This tutorial will walk you through creating a Kandy account within your domain for your users.  git repo: https://github.com/goofiw/kandicreateuser

## Step 1: Sign up for a Kandy.io account

1.  Create your developer account on Kandy.io at https://developer.kandy.io/signup.
2.  Note your **ACCOUNT API KEY** and **ACCOUNT API SECRET**.
3.  Create a project in the developer portal.
4.  Make a note of your project API access key and your project API secret.

## Step 2: Retrieve an access token

```
  > $ curl -X GET
  > "https://api.kandy.io/v1.2/domains/accesstokens?key=[PROJECT_API_KEY]&domain_api_secret=[PROJECT_API_SECRET]"
```

This returns a token you can use to create users.

Now, of course you are going to want to use a service on your server to grab and store the token.  Here is an example using `koa-request`:

```
  var request = require('koa-request');
        
  function *getProjectToken(next) {
      var options = {
          url: 'https://api.kandy.io/v1.2/domains/accesstokens?key=[YOUR_PROJECT_KEY]&domain_api_secret=[YOUR_PROJECT_SECRET]',
      };
        
      var response = yield request(options); 
      var projectToken = JSON.parse(response.body);
      console.log(projectToken.result)
      this.body = yield projectToken;
  }
```

**Note:** Remember to use a body parser with koa!

Ok great, we have our project token. It's easy from here.

## Step 3: Create a Kandy user

Lets test our access token first:

```
  $ curl -H "Content-Type: application/json" -X POST -d '{"user_id":"bob","user_country_code":"+1"}' https://api.kandy.io/v1.2/domains/users/user_id?key=[ACCESS_TOKEN_FROM_SECTION_4]
```

Response:
```
  {
      "result": {
          "user_id": "bob",
          "user_password": "b0e4c71d674744",
          "full_user_id": "bob@goofiw.gmail.com",
          "domain_name": "goofiw.gmail.com",
          "user_api_key": "UAK5cb9736c147b4e348a825262e3871456",
          "user_api_secret": "UAS6c25d92676da442680612e096336f318"
      },
      "status": 0,
      "message": "success"
  }
```

Now, with `koa-request`:

```
  function *createKandyUser(next) {
     // You would get this from your db or during creation
      var user = { id: 'test' };
      var options = {
          method: 'POST',
          url: "https://api.kandy.io/v1.2/domains/users/user_id?key=[ACCESS_TOKEN_FROM_SECTION_4]",
          body: {
              user_id:user.id,
              user_country_code:'+1'//for usa
          },
          json: true
      }
      var kandiUserInfo = yield request(options)
      kandiUserInfo = kandiUserInfo.body;
      yield kandiUserInfo;
  }
```

Response:

```
  {
      result: {
          user_id: 'userid',
          user_password: 'e1ce3701543848',
          full_user_id: 'userid@goofiw.gmail.com',
          domain_name: 'goofiw.gmail.com',
          user_api_key: 'UAKf6595fedfd1e44d1a1aa88ab92a0e1ef',
          user_api_secret: 'UAS6b14a33e0232492892bec09733c23d41'
      },
      status: 0,
      message: 'success'
  }
```

**Note:** If you receive the following error message, you have already created the maximum number of users allowed  by  your acccount:

```
  {
      message: 'failed to register user on compass',
      status: 1
  }
```

Be sure to save this info into your database.

Bear in mind that you can only have five (5) users on the *Basic* account.

1. run npm install

2. add a ".env" file with your credentials

>>  PROJECT_ACCESS_TOKEN=""
>>  PROJECT_API_KEY=""
>>  PROJECT_API_SECRET=""
