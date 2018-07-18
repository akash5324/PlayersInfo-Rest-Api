# REST API 
####  This is simple working api build on Nodejs and Mongodb
####  It will provide the basic information of the cricket players and their ODI match records.
#### It will also have the functionality to upload an image and get the generated thumbnail of all the images.

# Frameworks and tools used:
```
1. Nodejs
2. Mongodb
3. Expressjs
4. postman
5. Robomongo
6. command promp
7. sublime Text
```

# How to run the application:

```
step 0: Download the github project

step 1: get to the file directory with command prompt and run the command:

> npm install

It will install all the node modules in your file directory.

step 2: Run mongodb locally on your computer from console.

command:(please take care of the version number of your installed mongodb)

> "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"

step 3: open another command prompt window and run the command:

> node app.js or nodemon app.js
```

## step 4: now open the postman app to send different requests:

### 1. To upload an Image:
```
        step 1:request type: POST
        step 2:url: localhost:3000/users
        
        step 3: goto the BODY section and in raw data type, pass two things as a json data i.e
        
          {
	
		        "email":"a valid email id",
		        "password":"a password with minimum length 5"


          }
          
          step 4: then from response headers copy the x-auth code.
          
          step 5: now you have valid token as a authenticated user.
          
          
          step 6: now open another request tab:
                  
                  step 6a):request type: POST
                  step 6b):url: localhost:3000/upload
                  step 6c): goto to the header section and set key-value pair to:
                  
                  key: x-auth
                  
                  value: your x-auth code from step 4
                  
                  step 6d)goto to the body section and then in form data section insert the key value pair as:
                  
                  key: image, type:file
                  
                  value: choose any file(.jpeg,.jpg,.png)
                   
                  step 6e) ** hit send and your file will get saved succesfully in the uploads folder of your directory
                  and the thumbnail is saved in the thumbnail folder of the same directory.**
```
### Get the thumbnail:
```
open the browser and type:

> http://localhost:3000/thumbnails/imagefilename.ext
```

## 2. Get the players Info:

```
        

     step 1:request type: POST
        step 2:url: localhost:3000/users
        
        step 3: goto the BODY section and in raw data type, pass two things as a json data i.e
        
          {
	
		        "email":"a valid email id",
		        "password":"a password with minimum length 5"


          }
          
          step 4: then from response headers copy the x-auth code.
          
          step 5: now you have valid token as a authenticated user.
          
          
          step 6: now open another request tab:
                  
                  step 6a):request type: POST
                  step 6b):url: localhost:3000/info
                  step 6c): goto to the header section and set key-value pair to:
                  
                  key: x-auth
                  
                  value: your x-auth code from step 4
                  
                  step 6d): send json data from Body- raw section:
                  
                  for eg:
                  
                  
                              {
                                  "Stats": {
                                      "Runs": 9588,
                                      "Wkts": 0
                                  },
                                  "Name": "Virat Kohli",
                                  "Age": 29,
                                  "Role": "Bat",
                                  "Team": "RCB"
                              }
                              
                            
                    step 6e): you will the output in the response body.
    
```

##  send other requests:

### 1. Delete Request
```
step 1:request type: DELETE
step 2:url: localhost:3000/info/:id
step3: same procedure with required BODY
```
### 2. Patch request
```
step 1:request type: PATCH
step 2:url: localhost:3000/info/:id

step 3:same procedure with required BODY
```
