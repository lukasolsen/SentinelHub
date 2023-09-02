import {
  AlienVault,
  FeodotrackerAbuseCH,
  StrictBlockPAlleboneBlockIP,
} from "../modules/ip_blacklist";

type IPResponse = {
  verdict: string;
  tags: string[];
  country: {
    code: number;
    name: string;
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
  };
};

const getVendorData = async (
  vendor: any, // Replace 'any' with the specific vendor type
  ip: string
): Promise<Vendors> => {
  const data = await vendor.getInstance().getData(ip);
  return {
    name: vendor.name,
    url: data.url,
    isThreat: data.isThreat,
    tags: data.tags,
    data: data.data,
    country: {
      name: data.country.name,
      code: data.country.code,
    },
  };
};

export const CheckIP = async (ip: string): Promise<IPResponse> => {
  const vendorList = [
    FeodotrackerAbuseCH,
    StrictBlockPAlleboneBlockIP,
    AlienVault,
  ];

  const vendorsData = await Promise.all(
    vendorList.map((vendor) => getVendorData(vendor, ip))
  );

  const isThreat = vendorsData.some((vendor) => vendor.isThreat);

  const tagsArray = vendorsData.flatMap((vendor) => vendor.tags);
  return {
    verdict: isThreat ? "Threat" : "Safe",
    tags: tagsArray,
    vendors: vendorsData,
    country: {
      code: vendorsData[2].country.code,
      name: vendorsData[2].country.name,
    },
  };
};
