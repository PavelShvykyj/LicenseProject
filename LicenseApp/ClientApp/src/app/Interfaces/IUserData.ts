export interface IUserJWTData {
  Email: string,
  UserName : string,
  PhoneNumber : string,
  role : string | Array<string>
}

export interface  IContact {
	UserName      : string,
	Email         : string,
	PhoneNumber   : string,
	PersonName?    : string,
	Organisation?  : string
}

export interface ISignInResource {
        Id : string,
        Contact : IContact,
        Password? : string,
        Roles  : Array<string>
}


export interface ILicense {
  Id : number,
  Name : string, 
  Expired : Date,
  Quontity : number,
  DemoMode : boolean,
  DataLifeDurationInDemo : number,
  UserId : string 
}

export interface ILicenseUserData {
  Contact : IContact,
  Count : number,
  Licenses : Array<ILicense>
}

export interface ILicenseUserState {
  [key: string]: ILicenseUserData

}

export interface ILicenseUsers {
  UserState : ILicenseUserState,
  UserKeys : Array<string>
}