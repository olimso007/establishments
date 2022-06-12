import { Injectable } from '@angular/core';
import establishmentJson from '../data/establishment-data.json';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentsService {
  
  constructor() { }

  getAll() {
    return establishmentJson;
  }

  filterEstablishmnets(name: string | null, cities: string[] | null, postcode: string | null, startYear: number | null) {
    let result = [];
    for (const establishment of establishmentJson) {
      if(name && !establishment.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
        continue;
      }
      if (cities?.length && cities.includes(establishment.location.city)) {
        continue;
      }
      if (postcode && postcode.toLocaleLowerCase() !== establishment.location.zipcode.toLocaleLowerCase()) {
        continue;
      }
      if (startYear && startYear.toString() !== (establishment.dates as any)?.startdate?.split('-')[2]) {
        continue;
      }
      result.push(establishment);
    }
    return result;
  }

  getAllCities() {
    let cities: Set<string> = new Set();
    for (const establishment of establishmentJson) {
      cities.add(establishment.location.city);
    }   
    return cities;
  }

  getByName(name: string) {
    for (const establishment of establishmentJson) {
      if (establishment.title.toLocaleLowerCase().split(' ').join('') === name) {
        return establishment;
      }
    }
    return null;
  }
}
