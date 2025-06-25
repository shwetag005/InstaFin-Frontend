import { toTitleCase } from "@/lib/commonFunctions";

const ApplicantName = ({ fullName, subName, branchCount }) => (
  <div className="flex items-center">
    <div className="text-xl font-bold">{toTitleCase(fullName)}</div>
    {subName && (
      <div className="text-md ml-2 font-semibold">{`(${subName})`}</div>
    )}
    {branchCount && (
      <span className="text-gray-500 ml-2 text-sm">
        Branches: {branchCount}
      </span>
    )}
  </div>
);
export default ApplicantName;
