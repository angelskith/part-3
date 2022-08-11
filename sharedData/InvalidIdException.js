module.exports = function InvalidIdException(errors){
    this.status = 400;
    this.message = 'Invalid user ID';

}