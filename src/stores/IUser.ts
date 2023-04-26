import Country from './ICountry';

export default interface User {
   id: number;
   name: string;
   email: string;
   password: string;
   countries: Country[];
}
