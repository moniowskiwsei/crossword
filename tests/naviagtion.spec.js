import { test, expect } from '@playwright/test';
const userData = require('./userData.json');

test('has link do login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.click("text=Sign in");
  expect(page).toHaveURL('http://localhost:3000/public/user/signin?returnUrl=/');
  await expect(page.locator('h1')).toContainText('Sign in');
});

test('redirect not logged user to sign in page', async ({ page }) => {
  await page.goto('http://localhost:3000/protected/user/profile');
  expect(page).toHaveURL('http://localhost:3000/public/user/signin?returnUrl=/protected/user/profile');
  await expect(page.locator('h1')).toContainText('Sign in');
});

test('sign in', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.goto('http://localhost:3000/public/user/signin');

  await page.locator("[name='email']").fill(userData.email)
  await page.locator("[name='password']").fill(userData.password)

  await page.getByRole("button", {name:"Login"}).click();

  await expect(page).toHaveURL('http://localhost:3000/');
  await page.goto('http://localhost:3000/protected/user/profile');

  await expect(page.locator('h1')).toContainText('Profile edit');
});

test('sign in with redirect', async ({ page }) => {
  await page.goto('http://localhost:3000/protected/user/profile');

  await page.locator("[name='email']").fill(userData.email)
  await page.locator("[name='password']").fill(userData.password)

  await page.getByRole("button", {name:"Login"}).click();

  await expect(page).toHaveURL('http://localhost:3000/protected/user/profile');

  await expect(page.locator('h1')).toContainText('Profile edit');
});