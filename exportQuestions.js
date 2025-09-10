import { exportToCSV } from './src/questionManagement.js';
import fs from 'fs';

const csv = exportToCSV();
fs.writeFileSync('questions.csv', csv);
console.log('Exported questions to questions.csv');