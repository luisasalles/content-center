db = connect('127.0.0.1:27017/content-center');
db.dropDatabase();
db = connect('127.0.0.1:27017/content-center');
db.createCollection('users');
db.users.createIndex({ 'id': 1 }, { unique: true });
db.createCollection('sequences');
db.sequences.insertOne({
    name: 'user_id',
    value: 1
});
db.createCollection('codemail');
db.codemail.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 180 });
db.createCollection('courses');
db.courses.createIndex({ 'id': 1 }, { unique: true });
db.createCollection('sequencescourses');
db.sequencescourses.insertOne({
    name: 'course_id',
    value: 1
});