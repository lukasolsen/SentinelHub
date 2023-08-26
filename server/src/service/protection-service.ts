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
    .getData()
    .then((data) => {
      return data;
    });

  //print out all ip addresses in data
  console.log(FeodotrackerAbuseCHData[0]);

  return {
    threat: FeodotrackerAbuseCHData.some((item) => item.ip_address === ip),
    ip: "",
    country: "",
    vendors: [
      {
        name: "Feodotracker Abuse CH",
        url: "https://feodotracker.abuse.ch/blocklist/",
        isThreat: FeodotrackerAbuseCHData.some(
          (item) => item.ip_address === ip
        ),
        data: FeodotrackerAbuseCHData.filter((item) => item.ip_address === ip),
      },
    ],
  };
};
