import { useState } from "react";

const Body = () => {
  const tabs = ["Logs", "Alerts", "Info"];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex w-full h-[30vh] gap-4 py-2 px-2">
      <div className="flex flex-col flex-1 bg-base-200 text-blue-300 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-base-300 px-3 py-2 font-bold border-b border-base-300 text-base tracking-wider">
          Logs
        </div>
        <div className="flex-1 p-3 font-mono text-sm overflow-y-auto"></div>
        <div className="flex bg-base-300 border-t border-base-300">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-center font-semibold transition-colors
                hover:bg-blue-400 hover:text-white
                focus:outline-none
                ${
                  activeTab === idx
                    ? "bg-blue-400 text-white"
                    : "bg-base-300 text-blue-300"
                }
                ${idx !== tabs.length - 1 ? "border-r border-base-200" : ""}
              `}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Body;
