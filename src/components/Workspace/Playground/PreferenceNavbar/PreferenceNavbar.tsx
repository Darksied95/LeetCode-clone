import React from "react";
import { AiOutlineSetting, AiOutlineFullscreen } from "react-icons/ai";

type PreferenceNavbarProps = {};

const PreferenceNavbar: React.FC<PreferenceNavbarProps> = () => {
  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <p className="text-xs text-label-2 dark:text-dark-label-2">
              JavaScript
            </p>
          </div>
        </button>
      </div>

      <div className="flex items-center m-2">
        <button className="preferenceBtn group">
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineSetting />
          </div>
          <span className="preferenceBtn-tooltip">Settings</span>
        </button>

        <button className="preferenceBtn group">
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineFullscreen />
          </div>
          <span className="preferenceBtn-tooltip">Full Screen</span>
        </button>
      </div>
    </div>
  );
};
export default PreferenceNavbar;
