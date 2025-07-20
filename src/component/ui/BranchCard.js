import BankSettingForm from "../form/BankSettingForm";
import ApplicantName from "./ApplicantName";
import SkeletonLoader from "./SkeletonLoader";
import Title from "./Title";

const BranchCard = ({
  data,
  setIsSettingOpen,
  isSettingOpen,
  setSettingBranch,
  settingBranch,
  isSetting = false,
  showBranch = false,
  setIsBranchOpen,
  isBranchOpen,
  BranchBank,
  setBranchBank,
    bankId,
  branchId,
  setBankId,
  setBranchId,
  onSubmit=()=>{}
}) => {
  if (!data) return <SkeletonLoader />;
  console.log(data)

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-4">
      <div className="border rounded-md p-4 shadow-md w-full max-w-3xl">
        {data.bankBranch && (
          <ApplicantName
            fullName={data.bankBranch}
            subName={data.bankName}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
          {data.bankPersonDesignation && (
            <div>
              <Title title="Designation" />
              <p>{data.bankPersonDesignation}</p>
            </div>
          )}
          {data.bankPersonEId && (
            <div>
              <Title title="Employee ID" />
              <p>{data.bankPersonEId}</p>
            </div>
          )}
          {data.ifscCode && (
            <div>
              <Title title="IFSC Code" />
              <p>{data.ifscCode}</p>
            </div>
          )}
          {data.bankLocation && (
            <div>
              <Title title="Location" />
              <p>{data.bankLocation}</p>
            </div>
          )}
          {data.bankPin && (
            <div>
              <Title title="PIN Code" />
              <p>{data.bankPin}</p>
            </div>
          )}
        </div>

        {isSetting && (
          <div className="flex justify-end mt-6">
            <button
              onClick={() =>{
                branchId === data._id
                  ? (setBankId(null), setBranchId(null))
                  : (setBankId(data.bankId), setBranchId(data._id));
                console.log(data)}
              }
              className="text-sm bg-slate-100 hover:bg-slate-200 font-semibold px-4 py-2 rounded-md border border-slate-400 transition"
            >
              {branchId === data._id ? "Close Settings" : "Open Settings"}
            </button>
          </div>
        )}
      </div>

      {branchId === data._id && isSetting && (
        <div className="w-full max-w-3xl">
          <BankSettingForm branchId={branchId} bankId={bankId} onSubmit={onSubmit} data={data?.criteria} />
        </div>
      )}
    </div>
  );
};

export default BranchCard;


