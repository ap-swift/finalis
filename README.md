# finalis
Challenge: SSR QA Automation Engineer (Playwright)

# Description
This repository contains Playwright tests for validating two features on Amazon:
- Sorting and stock validation when searching for "wireless headphones."
- Amazon cart validation for product details and subtotal accuracy.

# Setup Instructions

# Clone the repository:
git clone https://github.com/ap-swift/finalis.git
cd amazon-playwright-tests

# Install dependencies:
npm install

# Run the tests:
npx playwright test

# Running Specific Tests
First exercise:
npx playwright test tests/SortingAndStockValidation.spec.ts
Second exercise:
npx playwright test tests/AmazonCartValidation.spec.ts
