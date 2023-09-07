import ContentLoader, {
  BulletList,
  List,
  Facebook,
} from "react-content-loader";

const TextLoader = ({ width, height }: { width?: string; height?: string }) => {
  return (
    <ContentLoader
      speed={100}
      backgroundColor="#f5f6f7"
      foregroundColor="#eee"
      animate={true}
      style={{ width: width, height: height }}
    >
      <rect x="0" y="0" rx="5" ry="5" width={width} height="10" />
    </ContentLoader>
  );
};

const CustomBulletList = ({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <>
      <BulletList
        backgroundColor="#121212"
        foregroundColor="#1E90FF"
        viewBox="0 0 700 140" // make it even smaller then 0 0 400 160
        className="w-full h-full"
        height={height}
        width={width}
      />
      <BulletList
        backgroundColor="#121212"
        foregroundColor="#1E90FF"
        viewBox="0 0 700 140" // make it even smaller then 0 0 400 160
        className="w-full h-full"
        height={height}
        width={width}
      />
    </>
  );
};

// make it include a fake report with a fake id and some simple fake list data, do not show any actual image colors or anything, nor any text.
const ReportLoader = () => {
  return (
    <>
      <div className="mb-5">
        <Facebook
          viewBox="0 0 740 100"
          backgroundColor="#121212"
          foregroundColor="#1E90FF"
        />
      </div>
      <List
        viewBox="0 0 740 100"
        backgroundColor="#121212"
        foregroundColor="#1E90FF"
      />
      <List
        viewBox="0 0 740 100"
        backgroundColor="#121212"
        foregroundColor="#1E90FF"
      />
      <List
        viewBox="0 0 740 100"
        backgroundColor="#121212"
        foregroundColor="#1E90FF"
      />
    </>
  );
};

export { TextLoader, CustomBulletList, ReportLoader };
