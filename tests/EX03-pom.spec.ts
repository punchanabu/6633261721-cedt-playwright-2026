import { test, expect } from '@playwright/test';
import { LoginPage, AppointmentPage } from './pages';

test.describe('Make Appointment - Page Object Model', () => {
  let loginPage: LoginPage;
  let appointmentPage: AppointmentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    appointmentPage = new AppointmentPage(page);
  });

  test('should successfully make an appointment', async ({ page }) => {
    await loginPage.goto();
    await loginPage.clickMakeAppointment();
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    await expect(page).toHaveURL(/.*#appointment/);
    await expect(appointmentPage.facilitySelect).toBeVisible();

    await appointmentPage.makeAppointment({
      facility: 'Tokyo CURA Healthcare Center',
      applyForHospitalReadmission: true,
      healthcareProgram: 'medicare',
      visitDate: '28/03/2026',
      comment: 'I need a regular checkup'
    });

    await expect(page).toHaveURL(/.*#summary/);
    await expect(appointmentPage.confirmationSummary).toContainText('Appointment Confirmation');
    await expect(appointmentPage.facilitySummary).toContainText('Tokyo CURA Healthcare Center');
    await expect(appointmentPage.readmissionSummary).toContainText('Yes');
    await expect(appointmentPage.programSummary).toContainText('Medicare');
    await expect(appointmentPage.dateSummary).toContainText('28/03/2026');
    await expect(appointmentPage.commentSummary).toContainText('I need a regular checkup');
  });

  test('should successfully make appointment without hospital readmission', async ({ page }) => {
    await loginPage.goto();
    await loginPage.clickMakeAppointment();
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    await appointmentPage.makeAppointment({
      facility: 'Hongkong CURA Healthcare Center',
      applyForHospitalReadmission: false,
      healthcareProgram: 'medicaid',
      visitDate: '15/04/2026'
    });

    await expect(page).toHaveURL(/.*#summary/);
    await expect(appointmentPage.confirmationSummary).toContainText('Appointment Confirmation');
    await expect(appointmentPage.readmissionSummary).toContainText('No');
    await expect(appointmentPage.programSummary).toContainText('Medicaid');
  });

  test('should successfully make appointment with none program', async ({ page }) => {
    await loginPage.goto();
    await loginPage.clickMakeAppointment();
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    await appointmentPage.makeAppointment({
      facility: 'Seoul CURA Healthcare Center',
      applyForHospitalReadmission: false,
      healthcareProgram: 'none',
      visitDate: '20/05/2026',
      comment: 'First time visitor'
    });

    await expect(page).toHaveURL(/.*#summary/);
    await expect(appointmentPage.confirmationSummary).toContainText('Appointment Confirmation');
    await expect(appointmentPage.programSummary).toContainText('None');
  });
});
