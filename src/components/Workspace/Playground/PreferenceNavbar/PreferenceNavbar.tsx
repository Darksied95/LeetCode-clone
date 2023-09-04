import React, { useEffect, useState } from "react";
import { AiOutlineSetting, AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

type PreferenceNavbarProps = {};

const PreferenceNavbar: React.FC<PreferenceNavbarProps> = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  function handleFullScreen(): void {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  }

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }

      setIsFullScreen(true);
    }
    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("Msfullscreenchange", exitHandler);
    }
  }, []);

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <p className="text-xs text-label-2 dark:text-dark-label-2">JavaScript</p>
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

        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
          </div>
          <span className="preferenceBtn-tooltip">Full Screen</span>
        </button>
      </div>
    </div>
  );
};
export default PreferenceNavbar;
