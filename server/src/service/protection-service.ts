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
  vendors: EVendorOutput[];
};

// Function to get vendor data for a specific IP
const getVendorData = async (
  vendor: any, // Replace 'any' with the specific vendor type
  ip: string
): Promise<EVendorOutput> => {
  const data = await vendor.getInstance().getData(ip);
  return {
    name: vendor.name,
    url: data.url,
    isThreat: data.isThreat,
    tags: data.tags,
    data: data.data, // Replace 'any' with a more specific type if possible
    country: {
      name: data.country.name,
      code: data.country.code,
    },
  };
};

//TODO - Make the function give out the correct country code and name, not dependent on filter of the vendor
export const CheckIP = async (ip: string): Promise<IPResponse> => {
  // List of vendors to check
  const vendorList = [
    FeodotrackerAbuseCH,
    StrictBlockPAlleboneBlockIP,
    AlienVault,
  ];

  // Get data from all vendors concurrently
  const vendorsData = await Promise.all(
    vendorList.map((vendor) => getVendorData(vendor, ip))
  );

  // Check if any vendor reported a threat
  const isThreat = vendorsData.some((vendor) => vendor.isThreat);

  // Combine tags from all vendors into a single array
  const tagsArray = vendorsData.flatMap((vendor) => vendor.tags);

  return {
    verdict: isThreat ? "Threat" : "Safe",
    tags: tagsArray,
    vendors: vendorsData,
    country: {
      code: vendorsData[2].country.code, // Assuming the third vendor's data is used for the country
      name: vendorsData[2].country.name, // Replace with the appropriate vendor index
    },
  };
};
