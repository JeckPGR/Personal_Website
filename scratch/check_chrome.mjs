import http from 'http';
import { writeFileSync } from 'fs';

async function main() {
  const versionRes = await fetch('http://127.0.0.1:9222/json/version').catch(() => null);
  if (!versionRes) {
    console.log('Chrome debugging not available directly');
    return;
  }
  const version = await versionRes.json();
  console.log('Browser:', version.Browser);
}

main();
