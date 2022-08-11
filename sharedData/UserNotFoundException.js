module.exports = function UserNotFoundException(errors){
    this.status = 'error';
    this.message = 'User not found';
  
}