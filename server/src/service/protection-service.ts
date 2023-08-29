import {
  FeodotrackerAbuseCH,
  StrictBlockPAlleboneBlockIP,
} from "../modules/ip_blacklist";

type IPResponse = {
  verdict: string;
  size: number;
  tags: string[];
  country: string;
  vendors: Vendors[];
};

type Vendors = {
  name: string;
  url: string;
  isThreat: boolean;
  tags: string[];
  data: object;
};

export const CheckIP = async (ip: string): Promise<IPResponse> => {
  const FeodotrackerAbuseCHData = await FeodotrackerAbuseCH.getInstance()
    .getData(ip)
    .then((data) => {
      return data;
    });

  const StrictBlockPAlleboneBlockIPData =
    await StrictBlockPAlleboneBlockIP.getInstance()
      .getData(ip)
      .then((data) => {
        return data;
      });

  //For the isThreat, we need to check if any of the vendors have isThreat = true

  const isThreat =
    FeodotrackerAbuseCHData.isThreat ||
    StrictBlockPAlleboneBlockIPData.isThreat;

  const vendors = [
    {
      name: "Feodotracker Abuse CH",
      url: "https://feodotracker.abuse.ch/blocklist/",
      isThreat: FeodotrackerAbuseCHData.isThreat,
      tags: FeodotrackerAbuseCHData.tags,
      data: FeodotrackerAbuseCHData.data,
    },
    {
      name: "Strict BlockP Allebone Block IP",
      url: StrictBlockPAlleboneBlockIPData.url,
      isThreat: StrictBlockPAlleboneBlockIPData.isThreat,
      tags: StrictBlockPAlleboneBlockIPData.tags,
      data: StrictBlockPAlleboneBlockIPData.data,
    },
  ];

  const tagsArray = vendors.map((vendor) => vendor.tags);

  return {
    verdict: isThreat ? "Threat" : "Safe",
    country: "Norway",
    size: 123,
    tags: tagsArray.flat(),
    vendors,
  };
};
