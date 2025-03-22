// Select form elements
const form = document.querySelector('#ageCalculatorForm');
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const yearOutput = document.querySelector('#yearOutput');
const monthOutput = document.querySelector('#monthOutput');
const daysOutput = document.querySelector('#daysOutput');
const daysErrorMsg = document.querySelector('#daysErrorMsg');
const monthErrorMsg = document.querySelector('#monthErrorMsg');
const yearErrorMsg = document.querySelector('#yearErrorMsg');
const iconContainer = document.querySelector('.icon-container'); // Select the icon-container

// Helper function to validate the date
function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

// Helper function to calculate age
function calculateAge(day, month, year) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  if (birthDate > today) {
    return null; // Date is in the future
  }

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths -= 1;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears -= 1;
    ageMonths += 12;
  }

  return { years: ageYears, months: ageMonths, days: ageDays };
}

// Event listener for the icon-container
iconContainer.addEventListener('click', () => {
  // Clear previous error messages
  daysErrorMsg.textContent = '';
  monthErrorMsg.textContent = '';
  yearErrorMsg.textContent = '';

  const day = parseInt(dayInput.value, 10);
  const month = parseInt(monthInput.value, 10);
  const year = parseInt(yearInput.value, 10);

  // Validation
  let isValid = true;

  if (!day || day < 1 || day > 31) {
    daysErrorMsg.textContent = 'Day must be between 1 and 31.';
    isValid = false;
  }

  if (!month || month < 1 || month > 12) {
    monthErrorMsg.textContent = 'Month must be between 1 and 12.';
    isValid = false;
  }

  if (!year || year > new Date().getFullYear()) {
    yearErrorMsg.textContent = 'Year must be valid and not in the future.';
    isValid = false;
  }

  if (!isValidDate(day, month, year)) {
    daysErrorMsg.textContent = 'Invalid date.';
    isValid = false;
  }

  if (!isValid) return;

  const age = calculateAge(day, month, year);

  if (!age) {
    yearErrorMsg.textContent = 'Date cannot be in the future.';
    return;
  }

  // Animate the result
  animateOutput(age);
});

// Function to animate the output
function animateOutput(age) {
  let currentYears = 0;
  let currentMonths = 0;
  let currentDays = 0;

  const interval = setInterval(() => {
    if (currentYears < age.years) currentYears++;
    if (currentMonths < age.months) currentMonths++;
    if (currentDays < age.days) currentDays++;

    yearOutput.textContent = currentYears;
    monthOutput.textContent = currentMonths;
    daysOutput.textContent = currentDays;

    if (
      currentYears === age.years &&
      currentMonths === age.months &&
      currentDays === age.days
    ) {
      clearInterval(interval);
    }
  }, 50); // Adjust speed as needed
}