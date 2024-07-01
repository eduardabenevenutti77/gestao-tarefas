const app = require('./app');
const database = require('./database');
const UserRouter = require('./routes/user');
const ProjectRouter = require('./routes/project');
const TaskRouter = require('./routes/task');

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/project', ProjectRouter);
app.use('/api/v1/task', TaskRouter);

const port = process.env.PORT || 8000;

database.db.sync({ force: false })
    .then(_ => {
        app.listen(port, _ => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = app