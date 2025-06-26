import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import { config } from 'project.config';

/**
 * Utility class for file-related operations.
 */
export default class FileUtils {
  /**
   * Converts the size of a file into a human-readable string using units B, kB, or MB.
   * Note: Size conversion uses 1000 as the divisor instead of the typical 1024.
   *
   * @param {string} file - The path to the file whose size is to be determined.
   * @returns {string} The file size formatted as a human-readable string (e.g., "1.23 kB").
   */
  static getReadableFileSize(file: string): string {
    const sizeInBytes = statSync(file).size;

    const units = ['B', 'kB', 'MB'];
    let unitsIndex = 0;
    let size = sizeInBytes;

    // Number below should be 1024 but OrangeHRM app is dividing by 1000
    while (size >= 1000 && unitsIndex < units.length - 1) {
      size /= 1000;
      unitsIndex++;
    }

    return `${size.toFixed(2)} ${units[unitsIndex]}`;
  }

  /**
   * Generates a hash of the file contents using the configured hashing algorithm.
   *
   * @param {string} file - The path to the file to hash.
   * @returns {string} The hexadecimal hash of the file contents.
   */
  static getFileHash(file: string): string {
    const buffer = readFileSync(file);
    return createHash(config.fileHashingAlgorithm).update(buffer).digest('hex');
  }
}
