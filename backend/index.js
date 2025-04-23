const app = require('./app');
const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`🚀 Simplex Solver API server running on port ${port}`);
  console.log(`📊 API Documentation: http://localhost:${port}/api-docs`);
});