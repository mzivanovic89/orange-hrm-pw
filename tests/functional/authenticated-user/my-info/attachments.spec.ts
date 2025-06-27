import { faker } from '@faker-js/faker';
import { expect, test } from 'base/test';
import { config } from 'project.config';
import { Tag } from 'types/project/Tag';
import FileUtils from 'util/FileUtils';
import { DateTime } from 'luxon';
import PersonalDetailsPage from 'pages/authenticated-user/my-info/PersonalDetailsPage';

const FILE = 'resources/assets/images/tree.jpeg';

test.describe('Attachment tests', () => {
  test.beforeEach(async ({ page, pages }) => {
    await page.goto('/');

    await pages.loginPage().login(config.adminCredentials);
  });

  test(
    'Add attachment',
    { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.SMOKE, Tag.MY_INFO_PERSONAL_DETAILS] },
    async ({ actions, pages }) => {
      const comment = `${config.automationPrefix}${faker.string.alphanumeric({ length: 10 })}`;

      await actions.addPersonalAttachment({
        data: { file: FILE, comment },
      });

      const attachmentData = await pages
        .personalDetailsPage()
        .extractDataFromAttachmentsTable(comment);

      expect(attachmentData).toEqual({
        fileName: FILE.split('/').pop(),
        description: comment,
        size: FileUtils.getReadableFileSize(FILE),
        type: 'image/jpeg',
        dateAdded: DateTime.now().toFormat('yyyy-dd-MM'),
        addedBy: config.adminCredentials.username,
      });
    }
  );

  test(
    'Download attachment',
    { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.SMOKE, Tag.MY_INFO_PERSONAL_DETAILS] },
    async ({ actions, page, pages }) => {
      const comment = `${config.automationPrefix}${faker.string.alphanumeric({ length: 10 })}`;

      await actions.addPersonalAttachment({
        data: { file: FILE, comment },
      });

      // download the attachment
      const downloadPromise = page.waitForEvent('download');

      await pages.personalDetailsPage().clickAttachmentDownloadButton(comment);

      const download = await downloadPromise;

      const downloadedFile =
        config.downloadDirectory + download.suggestedFilename();

      await download.saveAs(downloadedFile);

      // verify file name and hash
      expect.soft(download.suggestedFilename()).toBe(FILE.split('/').pop());
      expect
        .soft(FileUtils.getFileHash(downloadedFile))
        .toBe(FileUtils.getFileHash(FILE));
    }
  );

  test(
    'Delete attachment',
    { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.SMOKE, Tag.MY_INFO_PERSONAL_DETAILS] },
    async ({ actions, pages, page }) => {
      const comment =
        config.automationPrefix + faker.string.alphanumeric({ length: 10 });

      await actions.addPersonalAttachment({
        data: { file: FILE, comment },
      });

      await pages.personalDetailsPage().clickAttachmentDeleteButton(comment);
      await pages.confirmDeleteModal().yesButton.click();

      // verify there are no rows with file
      const expectedRows = page
        .locator(PersonalDetailsPage.TABLE_ROW_SELECTOR)
        .filter({ hasText: FILE.split('/').pop() })
        .filter({ hasText: comment });

      expect(await expectedRows.count()).toBe(0);
    }
  );
});
