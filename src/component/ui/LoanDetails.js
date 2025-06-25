import SkeletonLoader from "./SkeletonLoader";

const LoanDetails = ({ loanType, status }) => (
  <>
    {loanType ? (
      <span className="text-gray-500">
        <span className="font-bold uppercase text-md">{loanType}</span><span className="text-xs">{status ? `  ${status}` : ""}</span>
      </span>
    ) : (
      <SkeletonLoader />
    )}
  </>
);

export default LoanDetails;
