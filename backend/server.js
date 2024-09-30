const app = require('./app');
const port = process.env.PORT || 3200;
const logger = require('./utils/logger'); // Import logger

app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`);
});
