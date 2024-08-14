export interface TokenModel {
  sub: string;
  unique_name: string;
  jti: string;
  roles: string | string[];
  exp: number;
  iss: string;
  aud: string;
}
