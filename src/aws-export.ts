const awsconfig = {
    aws_project_region: 'eu-west-3',  // Replace with your own region
    aws_cognito_region: 'eu-west-3',
    aws_user_pools_id: 'eu-west-3_tZEb81Cu4',            // Add your own user-pool-id
    aws_user_pools_web_client_id: '42j1rh0e59rll259taomd1o8ng', // Add your own client-id
    oauth: {
      domain: 'localhost:4200',    // Add your own domain-url
      scope: [
        'username',
        'email',
      ],
      redirectSignIn: 'https://www.omnisensa.com/',    // Add your own redirect sign-in url
      redirectSignOut: 'https://www.omnisensa.com/#/pages/lock',   // Add your own redirect sign-out url
      responseType: 'code'
    
    } 
  };
  
  export default awsconfig;