import { type Locator, type Page } from '@playwright/test';
import AuthenticatedUserPage from '../AuthenticatedUserPage';
import { test } from 'base/test';

export default class PersonalDetailsPage extends AuthenticatedUserPage {
  readonly attachmentsSection: Locator;

  readonly addAttachmentButton: Locator;
  readonly attachmentFileInput: Locator;
  readonly attachmentCommentInput: Locator;

  readonly saveAttachmentButton: Locator;

  readonly deleteSelectedButton: Locator;

  static readonly TABLE_ROW_SELECTOR = '.oxd-table-row';

  constructor(page: Page) {
    super(page);

    this.attachmentsSection = this.page
      .locator('div.orangehrm-attachment')
      .describe('Add attachment section');

    this.addAttachmentButton = this.attachmentsSection
      .getByRole('button', { name: 'Add' })
      .describe('Expand attachment form button');
    this.attachmentFileInput = this.attachmentsSection
      .locator('input.oxd-file-input')
      .describe('Attachment file input');
    this.attachmentCommentInput = this.attachmentsSection
      .getByRole('textbox', { name: 'Type comment here' })
      .describe('Attachment comment');

    this.saveAttachmentButton = this.attachmentsSection
      .getByRole('button', { name: 'Save' })
      .describe('Save attachment button');

    this.deleteSelectedButton = this.page
      .getByRole('button', { name: 'Delete Selected' })
      .describe('Delete selected button');
  }

  async addAttachment(data?: { file?: string; comment?: string }) {
    await test.step('Personal details page: Add attachment', async () => {
      await this.addAttachmentButton.click();

      if (data?.file) {
        await this.attachmentFileInput.setInputFiles(data.file);
      }
      if (data?.comment) {
        await this.attachmentCommentInput.fill(data.comment);
      }

      await this.saveAttachmentButton.click();
    });
  }

  getRowForAttachmentComment(comment: string) {
    return this.page.getByRole('row').filter({ hasText: comment });
  }

  async extractDataFromAttachmentsTable(comment: string) {
    const tableCells =
      this.getRowForAttachmentComment(comment).getByRole('cell');

    const fileName = await tableCells.nth(1).innerText();
    const description = await tableCells.nth(2).innerText();
    const size = await tableCells.nth(3).innerText();
    const type = await tableCells.nth(4).innerText();
    const dateAdded = await tableCells.nth(5).innerText();
    const addedBy = await tableCells.nth(6).innerText();

    return {
      fileName,
      description,
      size,
      type,
      dateAdded,
      addedBy,
    };
  }

  async clickAttachmentDownloadButton(comment: string) {
    await test.step(`Personal details page: Click download button [comment=${comment}]`, async () => {
      await this.getRowForAttachmentComment(comment)
        .locator('button')
        .nth(2)
        .click();
    });
  }

  async clickAttachmentDeleteButton(comment: string) {
    await test.step(`Personal details page: Click delete button [comment=${comment}]`, async () => {
      await this.getRowForAttachmentComment(comment)
        .locator('button')
        .nth(1)
        .click();
    });
  }
}
