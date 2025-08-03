import { useState } from "react";

const navTabs = ["Dashboard", "Details", "Settings"];

const Nav = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full px-2">
      <div className="flex bg-base-200 rounded-b-lg shadow-lg overflow-hidden gap-0">
        {navTabs.map((tab, idx) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-center font-semibold transition-colors
              hover:bg-blue-400 hover:text-white
              focus:outline-none
              ${
                activeTab === idx
                  ? "bg-blue-400 text-white"
                  : "bg-base-200 text-blue-300"
              }
              ${idx !== navTabs.length - 1 ? "border-r border-base-300" : ""}
            `}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Nav;
