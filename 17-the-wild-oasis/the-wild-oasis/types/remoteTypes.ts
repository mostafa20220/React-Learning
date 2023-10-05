export type TCabin = {
  id?: number;
  created_at: string;
  description: string;
  discount: number;
  image: File | string;
  max_capacity: number;
  name: string;
  regular_price: number;
};

export type TSettings = {
  breakfast_price: number;
  max_gusts_per_bookings: number;
  max_booking_length: number;
  min_booking_length: number;
};

export type TSettingName = "breakfast_price" | "max_gusts_per_bookings" | "max_booking_length" | "min_booking_length";


export type TSetting = {
  [x in TSettingName]: number;
};

// export type TSetting = {"breakfast_price" : number } | {"max_gusts_per_bookings" : number} | {"max_booking_length" : number} | {"min_booking_length": number};

