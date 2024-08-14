export interface IToken {
  aud: string;
  exp: number;
  iss: string;
  jti: string;
  sub: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}
