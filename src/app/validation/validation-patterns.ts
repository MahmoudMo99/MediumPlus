export class ValidationPatterns {
  static readonly emailPattern: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/;
  static readonly UniversityEmailPattern: RegExp =
    /^[a-zA-Z][a-zA-Z0-9]*([.][a-zA-Z0-9]+)?@([a-zA-Z]*\.)?svu\.edu(\.eg)?$/;
  static readonly passwordPattern: RegExp =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&:=+-/#%.()<>{}_~,;])(?=.*\d?)[A-Za-z\d@$!%*?&:=+-/#%.()<>{}_~,;]{8,}$/;
    static readonly PassportCodePattern: RegExp = /^[a-zA-Z0-9]+$/;
}
export class NamesPatterns {
  static readonly InDividualNamePattern: RegExp = /^[\u0600-\u06FF]{2,15}$/;
  static readonly fullNamePattern: RegExp =
    /^([\u0600-\u06FF]+)\s+([\u0600-\u06FF]+)\s+([\u0600-\u06FF]+)\s+([\u0600-\u06FF]+)$/;
  static readonly AdminNamesPattern: RegExp =
    /^[\u0621-\u064A][\u0621-\u064A\s]{0,13}[\u0621-\u064A]$/;
  static readonly facultyNamePattern: RegExp =
    /^[\u0621-\u064A][\u0621-\u064A\s]{0,28}[\u0621-\u064A]$/;
  static readonly NameWithSpacePattern: RegExp =
    /^[\u0621-\u064A\s]+(?:[\u0621-\u064A\s-]+)*$/;
  static readonly addressPattern: RegExp =
    /^[\u0621-\u064Aa-zA-Z0-9\s]+(?:[\u0621-\u064Aa-zA-Z0-9\s-\/]+)*$/;
}

export class CodesAndIdsPatterns {
  static readonly StudentCodePattern = /^\d{4,10}$/;
  static readonly PhoneNumberPattern = /^(010|011|012|015)\d{8}$/;
  static readonly StudentNationalIdPattern = /^30[0-9]{12}$/;
  static readonly GeneralNationalIdPattern = /^[0-9]{14}$/;
  static readonly GradeNumbersPattern: RegExp = /^\d+(\.\d{1,2})?$/;
  static readonly PercentagePattern: RegExp =
    /^(?:100(?:\.00?)?|\d{1,2}(?:\.\d{1,2})?)$/;
  static readonly YearPattern: RegExp = /^(?:[1-9]\d{3}|10000)$/;
  static readonly NumberRoomPattern: RegExp = /^[0-9]{1,10}$/;
  static readonly CapacityPattern: RegExp = /^[0-9]+$/;
}
