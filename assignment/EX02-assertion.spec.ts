import { test, expect } from './fixtures';

test.describe('Make Appointment Page - Assertion Tests', () => {
  test.beforeEach(async ({ appointmentPage }) => {
  });

  test('should display "Make Appointment" heading', async ({ appointmentPage }) => {
    await expect(appointmentPage.locator('h2')).toContainText('Make Appointment');
  });

  test('should select all facility combo box options', async ({ appointmentPage }) => {
    const facilitySelect = appointmentPage.locator('#combo_facility');

    const facilities = [
      'Tokyo CURA Healthcare Center',
      'Hongkong CURA Healthcare Center',
      'Seoul CURA Healthcare Center'
    ];

    for (const facility of facilities) {
      await facilitySelect.selectOption(facility);
      await expect(facilitySelect).toHaveValue(facility);
    }
  });

  test('should select apply for hospital readmission checkbox', async ({ appointmentPage }) => {
    const checkbox = appointmentPage.locator('#chk_hospotal_readmission');

    await expect(checkbox).not.toBeChecked();

    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('should select health care program radio buttons', async ({ appointmentPage }) => {
    const medicareRadio = appointmentPage.locator('#radio_program_medicare');
    await medicareRadio.check();
    await expect(medicareRadio).toBeChecked();

    const medicaidRadio = appointmentPage.locator('#radio_program_medicaid');
    await medicaidRadio.check();
    await expect(medicaidRadio).toBeChecked();
    await expect(medicareRadio).not.toBeChecked();

    const noneRadio = appointmentPage.locator('#radio_program_none');
    await noneRadio.check();
    await expect(noneRadio).toBeChecked();
    await expect(medicaidRadio).not.toBeChecked();
    await expect(medicareRadio).not.toBeChecked();
  });

  test('should input current date on Visit Date', async ({ appointmentPage }) => {
    const visitDateInput = appointmentPage.locator('#txt_visit_date');

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');

    await visitDateInput.fill(formattedDate);
    await expect(visitDateInput).toHaveValue(formattedDate);
  });

  test('should input comment in the comment field', async ({ appointmentPage }) => {
    const commentTextarea = appointmentPage.locator('#txt_comment');
    const testComment = 'This is a test comment for the appointment booking.';

    await commentTextarea.fill(testComment);
    await expect(commentTextarea).toHaveValue(testComment);
  });

  test('should verify book appointment button is displayed and enabled', async ({ appointmentPage }) => {
    const bookButton = appointmentPage.locator('#btn-book-appointment');

    await expect(bookButton).toBeVisible();
    await expect(bookButton).toBeEnabled();
  });
});
