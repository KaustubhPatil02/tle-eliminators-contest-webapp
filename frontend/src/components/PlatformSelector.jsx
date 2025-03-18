const platforms = ["leetcode", "codeforces"];

const PlatformSelector = ({ selectedPlatforms, setSelectedPlatforms }) => {
  const handleCheckboxChange = (platform) => {
    setSelectedPlatforms((prevSelected) =>
      prevSelected.includes(platform)
        ? prevSelected.filter((p) => p !== platform)
        : [...prevSelected, platform]
    );
  };

  return (
    <div className="flex flex-wrap gap-4">
      {platforms.map((platform) => (
        <label key={platform} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedPlatforms.includes(platform)}
            onChange={() => handleCheckboxChange(platform)}
            className="hidden"
          />
          <span className={`px-4 py-2 rounded-lg text-white ${selectedPlatforms.includes(platform) ? "bg-blue-500" : "bg-gray-400"} hover:bg-blue-600 transition-all duration-300`}>
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </span>
        </label>
      ))}
    </div>
  );
};

export default PlatformSelector;
