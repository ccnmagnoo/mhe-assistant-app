import { cities, City } from '../Assets/cities';

export function getCityList(territory: string, landType: TerritoryType): string[] {
  /**
   * this function return all the cities in the territory requersted
   */
  const filterCities: City[] = cities.filter((land) => {
    const cityObject: { [key: string]: string } = { ...land };
    return cityObject[landType] === territory;
  });

  const result = filterCities.map((land) => {
    return land.city;
  });

  return result;
}

export function getTerritoryNames(landType: TerritoryType): string[] {
  /**
   * this function return all the names of specifict land type
   */
  const territories: string[] = cities.map((land) => {
    const cityObject: { [key: string]: string } = { ...land };
    return cityObject[landType];
  });
  const unique = territories.filter(function (elem, index, self) {
    return index === self.indexOf(elem);
  });

  return unique;
}

export enum TerritoryType {
  city = 'city',
  province = 'province',
  region = 'region',
}