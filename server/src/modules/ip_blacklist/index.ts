/**
 * Blacklist IP Module
 */

import { getData } from "../../service/fetcher-service";

// make response type
type FeodotrackerAbuseCHResp = {
  ip_address: string;
  port: number;
  verdict: string;
  hostname: string;
  as_number: number;
  as_name: string;
  country: string;
  first_seen: string;
  last_online: string;
  malware: string;
};

interface IpAPIResp {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country_code: string;
  country_code_iso3: string;
  country_name: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  asn: string;
  org: string;
}

//feodotracker abuse ch

export class FeodotrackerAbuseCH {
  urls: string[];
  data: FeodotrackerAbuseCHResp[];
  static instance: FeodotrackerAbuseCH;

  constructor() {
    this.urls = [
      "https://feodotracker.abuse.ch/downloads/ipblocklist_recommended.json",
      "https://feodotracker.abuse.ch/downloads/ipblocklist.json",
    ];
    this.data = [];
  }

  static getInstance() {
    if (!FeodotrackerAbuseCH.instance) {
      FeodotrackerAbuseCH.instance = new FeodotrackerAbuseCH();
    }
    return FeodotrackerAbuseCH.instance;
  }

  async getData(ip: string): Promise<VendorOutput> {
    if (this.data.length === 0) {
      const dataPromises = this.urls.map((url) => getData(url));
      const dataArray = await Promise.all(dataPromises);

      // Merge arrays and remove duplicates
      this.data = dataArray.reduce((acc, data) => {
        data.forEach((item) => {
          if (
            !acc.some(
              (existingItem) => existingItem.ip_address === item.ip_address
            )
          ) {
            acc.push(item);
          }
        });
        return acc;
      }, []);
      console.log("feodotracker abuse ch data fetched");
    } else {
      console.log("feodotracker abuse ch data already fetched");
    }

    const isThreat = this.data.some((item) => item.ip_address === ip);
    const threatData = {
      tags: this.data
        .filter((item) => item.ip_address === ip)
        .map((item) => item.malware),
    };

    return {
      name: "Feodotracker Abuse CH",
      url: "https://feodotracker.abuse.ch/blocklist/",
      tags: threatData.tags,
      isThreat: isThreat,
      data: threatData,
    };
  }
}

export class StrictBlockPAlleboneBlockIP {
  url: string;
  data: string[];
  static instance: StrictBlockPAlleboneBlockIP;

  constructor() {
    this.data = [];
    this.url =
      "https://raw.githubusercontent.com/pallebone/StrictBlockPAllebone/master/BlockIP.txt";
  }

  static getInstance() {
    if (!StrictBlockPAlleboneBlockIP.instance) {
      StrictBlockPAlleboneBlockIP.instance = new StrictBlockPAlleboneBlockIP();
    }
    return StrictBlockPAlleboneBlockIP.instance;
  }

  async getData(ip: string): Promise<VendorOutput> {
    if (this.data.length === 0) {
      const data = await getData(this.url);
      this.data = data.split("\n");
      this.data = this.data.map((item) => item.replace("\r", ""));
      this.data.shift();

      console.log("StrictBlockPAlleboneBlockIP data fetched");
    } else {
      console.log("StrictBlockPAlleboneBlockIP data already fetched");
    }

    const isThreat = this.data.some((item) => item === ip);

    return {
      name: "StrictBlockP Allebone Block IP",
      url: "https://github.com/pallebone/StrictBlockPAllebone",
      tags: [],
      isThreat: isThreat,
    };
  }
}

export class IpAPI {
  static instance: IpAPI;
  url: string;
  data: IpAPIResp;

  constructor() {
    this.url = `https://ipapi.co/`;
    this.data = {} as IpAPIResp;
  }

  static getInstance() {
    if (!IpAPI.instance) {
      IpAPI.instance = new IpAPI();
    }
    return IpAPI.instance;
  }

  async getData(ip: string): Promise<IpAPIResp> {
    if (!this.data.ip) {
      const data = await getData(this.url + ip + "/json");
      this.data = data;
      console.log("ipapi data fetched");
    } else {
      console.log("ipapi data already fetched");
    }

    return this.data;
  }

  async getCountry(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.country_name;
  }

  async getCity(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.city;
  }

  async getRegion(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.region;
  }

  async getPostal(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.postal;
  }

  async getLatitude(ip: string): Promise<number> {
    const data = await this.getData(ip);
    return data.latitude;
  }

  async getLongitude(ip: string): Promise<number> {
    const data = await this.getData(ip);
    return data.longitude;
  }

  async getTimezone(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.timezone;
  }

  async getCurrency(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.currency;
  }

  async getLanguages(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.languages;
  }

  async getAsn(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.asn;
  }

  async getOrg(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.org;
  }

  async getCountryCode(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.country_code;
  }

  async getCountryCodeIso3(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.country_code_iso3;
  }

  async getCountryCapital(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.country_capital;
  }

  async getCountryTld(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.country_tld;
  }

  async getContinentCode(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.continent_code;
  }

  async getInEu(ip: string): Promise<boolean> {
    const data = await this.getData(ip);
    return data.in_eu;
  }

  async getRegionCode(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.region_code;
  }

  async getCountryCallingCode(ip: string): Promise<string> {
    const data = await this.getData(ip);
    return data.country_calling_code;
  }
}
