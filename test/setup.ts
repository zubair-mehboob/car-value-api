import { rm } from 'fs/promises';
import { join } from 'path';
/**
 * In Node.js, path.join() is used to safely concatenate paths in a way that works across different operating systems
 * (Windows uses \, Linux/macOS use /).
 * rm -> used to remove
 * gloabl.beforAll runs before all e2e test
 * this block "setupFilesAfterEnv":["<rootDir>/setup.ts"] in jest-e2e.json indicates this file runs before runnin
 * all e2e tests that have beforeAll block
 */
global.beforeAll(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (e) {}
});
