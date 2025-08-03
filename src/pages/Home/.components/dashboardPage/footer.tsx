const Footer = () => {
  return (
    <div className="flex w-full h-[30vh] gap-4 py-2 px-2">
      <div className="flex flex-col flex-1 bg-base-200 text-yellow-300 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-base-300 px-3 py-2 font-bold border-b border-base-300 text-base tracking-wider">
          Warnings
        </div>
        <div className="flex-1 p-3 font-mono text-sm overflow-y-auto">
          {/* Terminal content for Warnings goes here */}
        </div>
      </div>
      <div className="flex flex-col flex-1 bg-base-200 text-red-400 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-base-300 px-3 py-2 font-bold border-b border-base-300 text-base tracking-wider">
          Critical
        </div>
        <div className="flex-1 p-3 font-mono text-sm overflow-y-auto">
          {/* Terminal content for Critical goes here */}
        </div>
      </div>
    </div>
  );
};
export default Footer;
