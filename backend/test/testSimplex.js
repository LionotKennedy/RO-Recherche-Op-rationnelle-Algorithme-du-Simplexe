// Simple test script to test the simplex solver with different examples
const SimplexModel = require('../models/simplexModel');
const exampleProblems = require('../examples/exampleProblems');

console.log('🧪 Running Simplex Solver Tests');
console.log('==============================\n');

// Test each example problem
Object.keys(exampleProblems).forEach(key => {
  const example = exampleProblems[key];
  console.log(`\n📝 Test: ${example.description}`);
  console.log('------------------------------');
  
  const simplexSolver = new SimplexModel();
  
  try {
    const result = simplexSolver.solve(example.problem);
    console.log('\n✅ Test result:');
    console.table(result);
    console.log('------------------------------');
  } catch (error) {
    console.error(`❌ Test failed: ${error.message}`);
    console.error(error);
    console.log('------------------------------');
  }
});

console.log('\n🎉 All tests completed!');