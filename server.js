import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
  res.json({ 
    name: 'Atlantis Limousine OS',
    version: '1.0.0',
    endpoints: [
      'GET /health',
      'POST /api/drivers',
      'GET /api/drivers',
      'GET /api/vehicles', 
      'POST /api/jobs',
      'GET /api/invoices',
      'POST /api/payroll/calculate'
    ]
  });
});

// API Routes
app.post('/api/drivers', (req, res) => {
  res.json({ success: true, message: 'Driver created' });
});

app.get('/api/drivers', (req, res) => {
  res.json({ drivers: [] });
});

app.get('/api/vehicles', (req, res) => {
  res.json({ vehicles: [] });
});

app.post('/api/jobs', (req, res) => {
  res.json({ success: true, jobId: 1 });
});

app.get('/api/invoices', (req, res) => {
  res.json({ invoices: [] });
});

app.post('/api/payroll/calculate', (req, res) => {
  res.json({ success: true, payroll: {} });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`╔═══════════════════════════════════════════════════════╗`);
  console.log(`║                                                       ║`);
  console.log(`║        ATLANTIS LIMOUSINE OPERATING SYSTEM            ║`);
  console.log(`║                                                       ║`);
  console.log(`║        Server running at http://localhost:${PORT}        ║`);
  console.log(`║                                                       ║`);
  console.log(`╚═══════════════════════════════════════════════════════╝`);
});
