import * as bcrypt from 'bcrypt';

export async function toHash(rawPassword:string){
  const salt = await bcrypt.genSalt();
  
  return bcrypt.hash(rawPassword, salt);
}

export async function compareHash(password: string, hash: string){
  return bcrypt.compare(password,hash);
}