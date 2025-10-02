import axios from 'axios';

type TCountryCode = 'GB' | 'GBR' | 'AE';

interface ICountryCodeResponse {
  ip: string;
  city: string;
  region: string;
  country: TCountryCode;
  loc: string;
  org: string;
  timezone: string;
  readme: string;
}

export async function getCountryCode(): Promise<TCountryCode | undefined> {
  const { data } = await axios.get<ICountryCodeResponse>(
    'https://ipinfo.io/json',
  );

  return data.country;
}

export function isUkCountry(countryCode?: TCountryCode): boolean {
  return countryCode === 'GB' || countryCode === 'GBR';
}
