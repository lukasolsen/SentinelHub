import { FeodotrackerAbuseCH } from "../modules/ip_blacklist";

type IPResponse = {
  threat: boolean;
  ip: string;
  country: string;
  vendors: Vendors[];
};

type Vendors = {
  name: string;
  url: string;
  isThreat: boolean;
  data: object;
};

export const CheckIP = async (ip: string): Promise<IPResponse> => {
  const FeodotrackerAbuseCHData = await FeodotrackerAbuseCH.getInstance()
    .getData(ip)
    .then((data) => {
      return data;
    });

  return {
    threat: FeodotrackerAbuseCHData.isThreat,
    ip: "",
    country: "",
    vendors: [
      {
        name: "Feodotracker Abuse CH",
        url: "https://feodotracker.abuse.ch/blocklist/",
        isThreat: FeodotrackerAbuseCHData.isThreat,
        data: FeodotrackerAbuseCHData.data,
      },
    ],
  };
};
