type RegisterInitialValue = {
  firstName: string;
  lastName: string;
  phoneNumber: number | string;
  email: string;
  // city: string;
  // postCode: number | string;
  // address: string;
  password: string;
  // confirmPassword: string;
};


type SignInInitialValue = {
  email:string;
  password:string
}

type User = {
  id:string
  firstName:string
  lastName:string
  phoneNumber:string
  email:string
}