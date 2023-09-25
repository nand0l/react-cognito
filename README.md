# REACT-Cognito

This is a react app that uses AWS Cognito for authentication. when a user creates an account the following items MUST be provided:

- username
- Firstname
- Lastname
- Email
- Password

An account is the created and must be confirmed by the user. After confirmation the user can login. After the user logs in the [JSON Web Token](https://jwt.io/) is shown on the screen. This token can be used to access other AWS services.

There are also User Attributes that can be used to store additional information about the user. These attributes can be used to create a user profile. The following attributes are available:

```json
{
  "sub": "3416dc02-5769-4094-8419-8ade6319baf5",
  "email_verified": true,
  "given_name": "Nando",
  "family_name": "Lutgerink",
  "email": "nando.lutgerink@gmail.com"
}
```

## Usage

Deploy infrastructure (Cognito User Pool, CloudFront Distribution, S3 Bucket) :

```sam deploy --guided```

Then grab your *User Pool id* and *User Pool Client Id* and modify the file `awsexports.js` with these values.

Then you can start the app in local mode:

```npm run start```

For now an examle is available [here](https://main.d1xzhkzby7zu6t.amplifyapp.com//)

It is deployed with [AWS Amplify](https://aws.amazon.com/amplify/) in [us-east-1](https://us-east-1.console.aws.amazon.com/amplify/home?region=us-east-1#/d1xzhkzby7zu6t/)

the source coude is available [here](https://github.com/nand0l/react-cognito)

and on macbook: ```/Users/nandolutgerink/code/react/react-cognito/```

## option 2

Build the app to generate your static website

```npm run build```

Sync the static website to your s3 bucket

```aws s3 sync build s3://your-s3-bucket-name```
