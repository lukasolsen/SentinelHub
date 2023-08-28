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
      isThreat: isThreat,
      data: threatData,
    };
  }
}
