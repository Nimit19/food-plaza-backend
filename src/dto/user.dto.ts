export interface UserPayload {
  _id?: number;
  email: string;
  name: string;
}

export type addressInput = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isPrimary: boolean;
};
