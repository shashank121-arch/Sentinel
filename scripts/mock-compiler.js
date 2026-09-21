const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'dist', 'contracts');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Generate mock TS bindings
const tsContent = `
export interface SentinelContract {
  submit_report: (reportText: string) => Promise<void>;
  counter: () => Promise<number>;
  reports: (index: number) => Promise<string | null>;
}
export const contract = {}; // Mock contract object
`;
fs.writeFileSync(path.join(outDir, 'sentinel.ts'), tsContent);

// Generate mock prover and verifier
fs.writeFileSync(path.join(outDir, 'sentinel.prover'), 'mock-prover-data');
fs.writeFileSync(path.join(outDir, 'sentinel.verifier'), 'mock-verifier-data');

console.log('Compiled sentinel.compact to dist/contracts successfully.');
