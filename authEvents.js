//Hashing functions

 function authEvents(events) {
    /*events is 2D array: [1] [0]
        the first 2 elements in list of elements 
    */

    let ogPassword = '';
    //no password has been initially set
   let ogHash = 0;
   //no hash has been initially computed
   
   
   const results = [];
   //results wont change and need to be in array    

 function hashedPassword(password) {
    const p = 131;
    const M = 10 ** 9 + 7 
    let hashvalueOfPassword = 0;
    //iteratively updates hash value after each character in password  

    for(let i = 0; i < password.length; i++ ) {
    /*  i < password.length ensures each character is iterated
        over by counter variable i 

        i++ ensures progression to next character
*/

        hashvalueOfPassword = (hashvalueOfPassword * p + password.charCodeAt(i) % M);
        //charCodeAt retreives ASCII code of charcter at i in password 
        //impplements hashing formula 
    };

    return hashvalueOfPassword;
 };

 for (const event of events) {
    /*looking at each event in list 
        of all events
    */
    const firstEvent = event[0];
    /*accessing the event at index 0 
        the 1st event in array of events
    */
    
    const firstEventParameter = event[1];
    /*parameter of event:
        'set password' parameter is password
        'authorize' parameter is hashvalueOfPassword 
    */

    if (firstEvent === 'setPassword') {
        /*for event:
        ['setPassword', 'newPassword123']
        event type: 'setPassword'
        */
        ogPassword = firstEventParameter;
        /*password becomes the value inputted
        'newPassword123'
        */
      ogHash = hashedPassword(ogPassword);
    } else if (firstEvent === 'authorize') {
      const providedHash = parseInt(firstEventParameter);
      //converting password string into integer
      if (
        providedHash === ogHash ||
        providedHash === hashedPassword(ogPassword + 'a')
      ) {
        results.push(1);
        //pushes [1] to array indicating success
      } else {
        results.push(0);
        //pushes [0] to array indicating failure
      };
    };
  };

  return results;
};
