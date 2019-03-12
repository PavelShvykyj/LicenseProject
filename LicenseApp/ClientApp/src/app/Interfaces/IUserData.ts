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
	Organization?  : string
}

export interface ISignInResource {
        Id : string,
        Contact : IContact,
        Password? : string,
        Roles  : Array<string>
}
