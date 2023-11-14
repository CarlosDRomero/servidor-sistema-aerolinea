export class AmadeusApiToken {
  token_type: string
  access_token: string
  expired: boolean = false
  constructor(token_type: string, access_token: string){
      this.token_type = token_type;
      this.access_token = access_token;
  }
  toString(){
    return `${this.token_type} ${this.access_token}`
  }
  getExpired(){
    return this.expired;
  }
  setExpired(expired: boolean){
    this.expired = expired;
  }
}
