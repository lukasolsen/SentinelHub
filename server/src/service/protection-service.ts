import { FeodotrackerAbuseCH } from "../modules/ip_blacklist";

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
  data: object;
};

export const CheckIP = async (ip: string): Promise<IPResponse> => {
  const FeodotrackerAbuseCHData = await FeodotrackerAbuseCH.getInstance()
    .getData(ip)
    .then((data) => {
      return data;
    });

  const isThreat = FeodotrackerAbuseCHData.isThreat;

  return {
    verdict: isThreat ? "Threat" : "Safe",
    country: "Norway",
    size: 123,
    tags: ["Malware", "Botnet", "C&C", "Spam"],
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
