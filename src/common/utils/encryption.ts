/* eslint-disable prettier/prettier */
import CryptoJS from "crypto-js";

export class Encryption {
  static encrypt(value: any): string {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      "CentralVAS1234!"
    );
    return encrypted.toString();
  }

  static decrypt(value: string): string {
    try {
      const decryptedBytes = CryptoJS.AES.decrypt(value, "CentralVAS1234!");
      return decryptedBytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption failed:", error);
      return "";
    }
  }
}
