export default interface Country {
   id: number;
   name: {
      common: string;
      official: string;
   };
   capital: string;
   currencies: string[] | string;
   region: string;
   languages: string[];
   flags: {
      png: string;
   };
   population: number;
   cca3: string;
   capitalInfo: {
      latlng: [number, number];
   };
   latlng: number[];
   plannedDate: string;
}
