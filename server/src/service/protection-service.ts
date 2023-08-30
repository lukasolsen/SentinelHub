import {
  AlienVault,
  FeodotrackerAbuseCH,
  StrictBlockPAlleboneBlockIP,
} from "../modules/ip_blacklist";

type IPResponse = {
  verdict: string;
  size: number;
  tags: string[];
  country: {
    code: number;
    name: string;
    icon_url: string;
  };
  vendors: Vendors[];
};

type Vendors = {
  name: string;
  url: string;
  isThreat: boolean;
  tags: string[];
  data: object;
  country?: {
    name: string;
    code: number;
    icon_url: string;
  };
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

  const AlienVaultData = await AlienVault.getInstance()
    .getIPData(ip)
    .then((data) => {
      return data;
    });

  //For the isThreat, we need to check if any of the vendors have isThreat = true

  const isThreat =
    FeodotrackerAbuseCHData.isThreat ||
    StrictBlockPAlleboneBlockIPData.isThreat ||
    AlienVaultData.isThreat;

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
    {
      name: "AlienVault",
      url: AlienVaultData.url,
      isThreat: AlienVaultData.isThreat,
      tags: AlienVaultData.tags,
      data: AlienVaultData.data,
    },
  ];

  const tagsArray = vendors.map((vendor) => vendor.tags);

  return {
    verdict: isThreat ? "Threat" : "Safe",
    size: 123,
    tags: tagsArray.flat(),
    vendors,
    country: {
      code: AlienVaultData.country.code,
      name: AlienVaultData.country.name,
    },
  };
};
