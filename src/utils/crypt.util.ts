import { createCipheriv,createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';


export class CryptUtil{
  private static instance: CryptUtil;

  private key: Buffer;
  private iv = randomBytes(16);

  private cipher: any;
  private decipher: any;
  private constructor(){
    this.iv = randomBytes(16);
  }
  private async initializeCrypto(): Promise<void> {
    if (!this.key) {
      this.key = await this.generateKey();
    }
  }
  private async generateKey(): Promise<Buffer>{
    return (await promisify(scrypt)(process.env.CRYPT_PASS, 'salt', 32)) as Buffer;
  }

  public static async getInstance(): Promise<CryptUtil> {
    if (!CryptUtil.instance) {
      CryptUtil.instance = new CryptUtil();
      await CryptUtil.instance.initializeCrypto();
    }

    return CryptUtil.instance;
  }
  encrypt = (text: string)=>{
    this.cipher = createCipheriv(process.env.CRYPT_METHOD, this.key, this.iv);
    return this.initializeCrypto().then(() => {
      const encrypted = Buffer.concat([
        this.cipher.update(text),
        this.cipher.final()
      ]);
      console.log(encrypted);
      return encrypted.toString('base64');
    });
  }
  
  decrypt = (text: string)=>{
    this.decipher = createDecipheriv(process.env.CRYPT_METHOD, this.key, this.iv);
    return this.initializeCrypto().then(() => {
      console.log(text)
      const encrypted = Buffer.from(text,'base64')
      console.log(encrypted)
      const decrypted = Buffer.concat([

        this.decipher.update(encrypted),
        this.decipher.final(),
      ]);
      return decrypted.toString();
    }).catch((err)=>{
      console.log(err)
      return null;
    });
    
  }

}