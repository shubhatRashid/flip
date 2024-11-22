export function generateHex24() {
    return [...Array(12)] // Create an array with 12 empty elements
      .map(() => Math.floor(Math.random() * 256) // Generate a random number between 0 and 255
      .toString(16) // Convert to hexadecimal
      .padStart(2, '0')) // Ensure each byte is 2 digits long
      .join(''); // Join all bytes into a single string
  }
  