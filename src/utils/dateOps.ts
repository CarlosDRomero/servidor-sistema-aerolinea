

export function addMinutes(date: Date, m: number){
  date = new Date(date)
  return new Date(date.getTime() + (m*60*1000));
}
export function addHours(date: Date, m: number){
  return new Date(date.getTime() + (m*60*60*1000));
}

export function isExpired(expiry: Date){
  const now: Date = new Date();
  expiry = new Date(expiry)
  return expiry.getTime() <= now.getTime()
}