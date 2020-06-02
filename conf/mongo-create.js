db = connect('127.0.0.1:27017/content-center');
db.dropDatabase();
db = connect('127.0.0.1:27017/content-center');
db.createCollection('users');
db.users.createIndex({ 'id': id }, { unique: true });
db.createCollection('sequences');
db.sequences.insertOne({
    name: 'user_id',
    value: 1
});