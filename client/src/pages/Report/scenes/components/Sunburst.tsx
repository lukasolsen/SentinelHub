import { ResponsiveSunburst } from "@nivo/sunburst";

export default function Sunbirst({ data }) {
  let transformedData = data.familyTypes.map((familyType) => {
    const children = data.strings.map((stringGroup) => {
      const name = stringGroup.name;
      const filteredStrings = stringGroup.strings.filter(
        (string) => string.familyType === familyType.name
      );
      const loc = filteredStrings.length;

      //inside it make the name end with ... if it's too long
      const nestedChildren = filteredStrings.map(
        (filteredString: { string: string }) => ({
          name:
            filteredString.string.length > 20
              ? filteredString.string.substring(0, 35) + "..."
              : filteredString.string,
          key: filteredString.string,
          loc: loc, // Set loc to the number of filtered strings
        })
      );

      return {
        name,
        color: familyType.color,
        children: nestedChildren,
      };
    });

    return {
      name: familyType.name,
      color: familyType.color,
      children,
    };
  });

  transformedData = {
    name: "statistics",
    color: "#ffffff",
    children: transformedData,
  };

  const allColorsInList = data.familyTypes.map(
    (familyType) => familyType.color
  );

  console.log(transformedData);

  return (
    <ResponsiveSunburst
      data={transformedData}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      id="name"
      value="loc"
      cornerRadius={2}
      borderColor={{ theme: "background" }}
      colors={allColorsInList}
      childColor={{
        from: "color",
        modifiers: [["brighter", 0.1]],
      }}
      enableArcLabels={true}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 1.4]],
      }}
    />
  );
}
