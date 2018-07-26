export class ExceptionHandler {
  
  getEmailErrorMsg(email){
    let error;    
    if(email){
      error = email.hasError('required') ? 'You must enter a value' : email.hasError('email') ? 'Not a valid email' : '';
    }
    return error;
  }

}