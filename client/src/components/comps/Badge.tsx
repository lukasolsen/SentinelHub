interface BadgeProps {
  name: string;
  index?: number;
}

export const Badge = ({ name, index }: BadgeProps) => {
  return (
    <span
      key={index}
      className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
    >
      {name}
    </span>
  );
};
