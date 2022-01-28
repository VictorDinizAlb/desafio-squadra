import { createConnection } from 'typeorm';

try {
  createConnection();
} catch (err) {
  console.error(err);
}
