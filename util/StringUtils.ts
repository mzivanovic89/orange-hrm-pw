/**
 * Utility class for string-related operations.
 */
export default class StringUtils {
  /**
   * Reverses the case of each character in the given string.
   *
   * Converts lowercase letters to uppercase and vice versa.
   * Non-alphabetic characters remain unchanged.
   *
   * @param {string} text - The input string whose character cases will be reversed.
   * @returns {string} A new string with each character's case inverted.
   */
  static reverseCase(text: string): string {
    let reversedCase = [];

    for (let i = 0; i < text.length; i++) {
      const character = text[i];

      if (character === character.toLowerCase()) {
        reversedCase.push(character.toUpperCase());
      } else {
        reversedCase.push(character.toLowerCase());
      }
    }

    return reversedCase.join('');
  }
}
