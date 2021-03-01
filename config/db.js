const DBPORT = '27017';
const DBNAME = 'dbtutorial';
const DBUSER = 'user';
const DBPWD = 'password';
const DBHOST = '127.0.0.1';
const uri = 'mongodb://'+ DBUSER+':'+DBPWD+'@'+DBHOST+':'+DBPORT + '/'+DBNAME;

module.exports = {
    'url'	: uri
};