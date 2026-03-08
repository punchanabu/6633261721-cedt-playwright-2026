import { Page, Locator } from '@playwright/test';

export class AppointmentPage {
  readonly page: Page;
  readonly facilitySelect: Locator;
  readonly hospitalReadmission: Locator;
  readonly medicareProgram: Locator;
  readonly medicaidProgram: Locator;
  readonly noneProgram: Locator;
  readonly visitDateInput: Locator;
  readonly commentTextArea: Locator;
  readonly bookAppointmentButton: Locator;
  readonly confirmationSummary: Locator;
  readonly facilitySummary: Locator;
  readonly readmissionSummary: Locator;
  readonly programSummary: Locator;
  readonly dateSummary: Locator;
  readonly commentSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.facilitySelect = page.locator('#combo_facility');
    this.hospitalReadmission = page.locator('#chk_hospotal_readmission');
    this.medicareProgram = page.locator('#radio_program_medicare');
    this.medicaidProgram = page.locator('#radio_program_medicaid');
    this.noneProgram = page.locator('#radio_program_none');
    this.visitDateInput = page.locator('#txt_visit_date');
    this.commentTextArea = page.locator('#txt_comment');
    this.bookAppointmentButton = page.locator('#btn-book-appointment');
    this.confirmationSummary = page.locator('h2');
    this.facilitySummary = page.locator('#facility');
    this.readmissionSummary = page.locator('#hospital_readmission');
    this.programSummary = page.locator('#program');
    this.dateSummary = page.locator('#visit_date');
    this.commentSummary = page.locator('#comment');
  }

  async selectFacility(facility: string) {
    await this.facilitySelect.selectOption(facility);
  }

  async checkHospitalReadmission() {
    await this.hospitalReadmission.check();
  }

  async selectProgram(program: 'medicare' | 'medicaid' | 'none') {
    switch (program) {
      case 'medicare':
        await this.medicareProgram.check();
        break;
      case 'medicaid':
        await this.medicaidProgram.check();
        break;
      case 'none':
        await this.noneProgram.check();
        break;
    }
  }

  async setVisitDate(date: string) {
    await this.visitDateInput.fill(date);
  }

  async setComment(comment: string) {
    await this.commentTextArea.fill(comment);
  }

  async bookAppointment() {
    // Use form submission directly as button click may not trigger submit
    await this.page.evaluate(() => {
      const form = document.querySelector('form');
      if (form) {
        (form as HTMLFormElement).submit();
      }
    });
  }

  async makeAppointment(options: {
    facility: string;
    applyForHospitalReadmission: boolean;
    healthcareProgram: 'medicare' | 'medicaid' | 'none';
    visitDate: string;
    comment?: string;
  }) {
    await this.selectFacility(options.facility);
    if (options.applyForHospitalReadmission) {
      await this.checkHospitalReadmission();
    }
    await this.selectProgram(options.healthcareProgram);
    await this.setVisitDate(options.visitDate);
    if (options.comment) {
      await this.setComment(options.comment);
    }
    await this.bookAppointment();
  }

  async getConfirmationTitle(): Promise<string> {
    return await this.confirmationSummary.textContent() || '';
  }

  async getFacilitySummary(): Promise<string> {
    return await this.facilitySummary.textContent() || '';
  }

  async getReadmissionSummary(): Promise<string> {
    return await this.readmissionSummary.textContent() || '';
  }

  async getProgramSummary(): Promise<string> {
    return await this.programSummary.textContent() || '';
  }

  async getDateSummary(): Promise<string> {
    return await this.dateSummary.textContent() || '';
  }

  async getCommentSummary(): Promise<string> {
    return await this.commentSummary.textContent() || '';
  }
}
