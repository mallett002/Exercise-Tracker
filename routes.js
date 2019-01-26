module.exports = (app) => {
  const controllers = require('./controllers');
  
  // test route
  app.get('/test', controllers.test);
  
  // Create a new user
  app.post('/api/exercise/new-user', controllers.createUser);
  
  // Add exercise for a user
  app.post('/api/exercise/add', controllers.addExercise);
  
  // Get a user's log data
  app.get('/api/exercise/log', controllers.getData);
    
  
};