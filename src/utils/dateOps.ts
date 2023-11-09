

export function addMinutes(date: Date, m: number){
  return new Date(date.getTime() + (m * 60* 1000));
}

export function isExpired(expiry: Date){
  const now: Date = new Date();
  return expiry.getTime() <= now.getTime()
}