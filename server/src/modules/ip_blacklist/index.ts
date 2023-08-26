/**
 * Blacklist IP Module
 */

import { getData } from "../../service/fetcher-service";

// make response type
type FeodotrackerAbuseCHResp = {
  ip_address: string;
  port: number;
  status: string;
  hostname: string;
  as_number: number;
  as_name: string;
  country: string;
  first_seen: string;
  last_online: string;
  malware: string;
};

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

  async getData(): Promise<FeodotrackerAbuseCHResp[]> {
    if (this.data.length === 0) {
      const dataPromises = this.urls.map((url) => getData(url));
      const dataArray = await Promise.all(dataPromises);
      this.data = dataArray.reduce((acc, data) => acc.concat(data), []);
      console.log("feodotracker abuse ch data fetched");
    } else {
      console.log("feodotracker abuse ch data already fetched");
    }
    return this.data;
  }

  async getIPs() {
    const data = await this.getData();
    console.log(data);
    return data.map((item: FeodotrackerAbuseCHResp) => item.ip_address);
  }

  async getIPsByCountry(country: string) {
    const data = await this.getData();
    return data
      .filter((item: FeodotrackerAbuseCHResp) => item.country === country)
      .map((item: FeodotrackerAbuseCHResp) => item.ip_address);
  }

  async getIPsByMalware(malware: string) {
    const data = await this.getData();
    return data
      .filter((item: FeodotrackerAbuseCHResp) => item.malware === malware)
      .map((item: FeodotrackerAbuseCHResp) => item.ip_address);
  }
}
