import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navOptions } from "../../conf/routes.conf";

const Nav = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    navigate(navOptions[idx].route);
  };

  return (
    <div className="w-full px-2">
      <div className="flex bg-base-200 rounded-b-lg shadow-lg overflow-hidden gap-0">
        {navOptions.map((option, idx) => (
          <button
            key={option.label}
            className={`flex-1 py-2 text-center font-semibold transition-colors
              hover:bg-blue-400 hover:text-white
              focus:outline-none
              ${
                activeTab === idx
                  ? "bg-blue-400 text-white"
                  : "bg-base-200 text-blue-300"
              }
              ${idx !== navOptions.length - 1 ? "border-r border-base-300" : ""}
            `}
            onClick={() => handleTabClick(idx)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Nav;
