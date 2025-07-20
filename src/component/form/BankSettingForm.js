// "use client";
// import React, { useEffect, useState } from "react";
// import InputField from "./InputField";
// import Title from "../ui/Title";
// import { allLoanTypes, percentageRange } from "@/app/data";
// import { Button } from "antd";
// import { createLoanCriteria } from "@/lib";
// import SelectInput from "./SelectInput";

// const defaultCriteria = {
//   salary: {
//     salary: false,
//     income: "",
//     creditScore: "",
//     collateral: "",
//     dti: "",
//   },
//   business: {
//     business: false,
//     income: "",
//     creditScore: "",
//     collateral: "",
//     dti: "",
//   },
// };

// // Capitalizes loan type to match display
// const formatString = (str) => str?.toLowerCase()?.replace(/\s+/g, "_");

// const LoanInputFields = ({ loanTypeIndex, type, handleChange, value }) => (
//   <div className="space-y-2">
//     <div className="flex items-center space-x-2">
//       <InputField
//         name="income"
//         value={value?.income}
//         onChange={(e) => handleChange(e, loanTypeIndex, type)}
//         width="40"
//       />
//       <span className="text-sm">Per 1 Lakh</span>
//     </div>
//     <div className="flex items-center space-x-2">
//       <InputField
//         name="creditScore"
//         value={value?.creditScore}
//         onChange={(e) => handleChange(e, loanTypeIndex, type)}
//         width="40"
//       />
//       <span className="text-sm">/900</span>
//     </div>
//     <div className="flex items-center space-x-2">
//       <SelectInput
//         name={"collateral"}
//         options={percentageRange}
//         value={value?.collateral}
//         onChange={(e)=>handleChange(e, loanTypeIndex, type)}
//         width="40"
//       />
//       {/* <InputField
//         name="collateral"
//         value={value?.collateral}
//         onChange={(e) => handleChange(e, loanTypeIndex, type)}
//         width="40"
//       /> */}
//       <span className="text-sm">%</span>
//     </div>
//     <div className="flex items-center space-x-2">
//       <SelectInput
//         name={"dti"}
//         options={percentageRange}
//         value={value?.dti}
//         onChange={(e) => handleChange(e, loanTypeIndex, type)}
//         width="40"
//       />
//       {/* <InputField
//         name="dti"
//         value={value?.dti}
//         onChange={(e) => handleChange(e, loanTypeIndex, type)}
//         width="40"
//       /> */}
//       <span className="text-sm">Lower is better</span>
//     </div>
//   </div>
// );

// const LoanFields = ({ index, loanData, handleCheckbox, handleChange }) => {
//   const { loanType, criteria } = loanData;

//   return (
//     <div>
//       <p className="ml-2 font-semibold text-md">{loanType?.toUpperCase()}</p>
//       <div className="border rounded-md p-4 mb-4 w-full shadow-md">
//         <div className="grid grid-cols-12 gap-4">
//           <div className="col-span-2 flex mt-8 flex-col space-y-8">
//             <Title title="Income" />
//             <Title title="Credit Score" />
//             <Title title="Collateral" />
//             <Title title="Debt to Income Ratio" />
//           </div>
//           <div className="col-span-5">
//             <label className="inline-flex items-center mb-2 ml-10">
//               <input
//                 type="checkbox"
//                 name="salary"
//                 checked={criteria?.salary?.salary}
//                 onChange={(e) => handleCheckbox(e, index, "salary")}
//                 className="mr-1"
//               />
//               Salary
//             </label>
//             <LoanInputFields
//               loanTypeIndex={index}
//               type="salary"
//               value={criteria?.salary}
//               handleChange={handleChange}
//             />
//           </div>
//           <div className="col-span-5">
//             <label className="inline-flex items-center mb-2 ml-10">
//               <input
//                 type="checkbox"
//                 name="business"
//                 checked={criteria?.business?.business}
//                 onChange={(e) => handleCheckbox(e, index, "business")}
//                 className="mr-1"
//               />
//               Business
//             </label>
//             <LoanInputFields
//               loanTypeIndex={index}
//               type="business"
//               value={criteria?.business}
//               handleChange={handleChange}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BankSettingForm = ({ branchId, bankId, onSubmit=()=>{}, data=[] }) => {
//   const [selectedLoans, setSelectedLoans] = useState([]);
//   const [formData, setFormData] = useState({
//     bankId: "",
//     branchId: "",
//     loanCriteriaList: [data],
//   });
//   console.log(data)
//  useEffect(() => {
//   if (data && Array.isArray(data)) {
//     const preselectedLoanTypes = data.map((item) => item.loanType);
//     setSelectedLoans(preselectedLoanTypes);

//     setFormData({
//       bankId: bankId || "",
//       branchId: branchId || "",
//       loanCriteriaList: data.map((item) => ({
//         loanType: item.loanType,
//         criteria: {
//           salary: {
//             salary: item.criteria?.salary?.salary ?? false,
//             income: item.criteria?.salary?.income ?? "",
//             creditScore: item.criteria?.salary?.creditScore ?? "",
//             collateral: item.criteria?.salary?.collateral ?? "",
//             dti: item.criteria?.salary?.dti ?? "",
//           },
//           business: {
//             business: item.criteria?.business?.business ?? false,
//             income: item.criteria?.business?.income ?? "",
//             creditScore: item.criteria?.business?.creditScore ?? "",
//             collateral: item.criteria?.business?.collateral ?? "",
//             dti: item.criteria?.business?.dti ?? "",
//           },
//         },
//       })),
//     });
//   } else {
//     // Default empty form if no data
//     setFormData({
//       bankId: bankId || "",
//       branchId: branchId || "",
//       loanCriteriaList: [],
//     });
//   }
// }, [data, bankId, branchId]);


//   const toggleLoanSelection = (loanType) => {
//     const exists = selectedLoans?.includes(loanType);
//     const updatedLoans = exists
//       ? selectedLoans?.filter((lt) => lt !== loanType)
//       : [...selectedLoans, loanType];

//     setSelectedLoans(updatedLoans);
//     setFormData((prev) => {
//       const updatedList = exists
//         ? prev.loanCriteriaList?.filter((item) => item?.loanType !== loanType)
//         : [
//             ...prev?.loanCriteriaList,
//             {
//               loanType,
//               criteria: JSON?.parse(JSON?.stringify(defaultCriteria)),
//             },
//           ];
//       return { ...prev, loanCriteriaList: updatedList };
//     });
//   };

//   const handleCheckbox = (e, index, type) => {
//     const { name, checked } = e.target;
//     const updatedList = [...formData.loanCriteriaList];
//     updatedList[index].criteria[type][name] = checked;
//     setFormData({ ...formData, loanCriteriaList: updatedList });
//   };

//   const handleChange = (e, index, type) => {
//     const { name, value } = e?.target;
//     const updatedList = [...formData.loanCriteriaList];
//     updatedList[index].criteria[type][name] = value;
//     setFormData({ ...formData, loanCriteriaList: updatedList });
//   };

//   const handleSubmit = async () => {
//     const isValid = formData.loanCriteriaList.every(
//       (item) =>
//         item?.loanType &&
//         ((item?.criteria?.salary?.salary && item?.criteria?.salary?.income) ||
//           (item?.criteria?.business?.business && item?.criteria?.business?.income))
//     );

//     console.log("Final Payload:", formData);

//     // if (!isValid) {
//     //   alert("Please fill in all required fields for selected loan types?.");
//     //   return;
//     // }
//      onSubmit(formData);

//     console.log("Final Payload:", formData);
//   };

//   return (
//     <div className="border rounded-md p-4 mb-4 shadow-md w-full max-w-3xl">
//       <div className="flex gap-2 items-center">
//         <span className="font-bold text-lg">Settings</span>
//         <span className="font-semibold text-sm">Make Default</span>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//         {allLoanTypes?.map((loan) => (
//           <label key={loan} className="inline-flex items-center">
//             <input
//               type="checkbox"
//               checked={selectedLoans?.includes(loan)}
//               onChange={() => toggleLoanSelection(loan)}
//               className="mr-2"
//             />
//             <span className="text-sm">{loan}</span>
//           </label>
//         ))}
//       </div>
//       <div className="flex flex-wrap gap-4 mt-2">
//         {formData?.loanCriteriaList?.map((loan, index) => (
//           <LoanFields
//             key={`${loan?.loanType}-${index}`}
//             index={index}
//             loanData={loan}
//             handleCheckbox={handleCheckbox}
//             handleChange={handleChange}
//           />
//         ))}
//       </div>
//       <div className="flex justify-end">
//         <Button
//           className="font-semibold bg-gray-800 text-white rounded"
//           onClick={handleSubmit}
//         >
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default BankSettingForm;


"use client";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Title from "../ui/Title";
import { allLoanTypes, percentageRange } from "@/app/data";
import { Button } from "antd";
import SelectInput from "./SelectInput";

const defaultPercentage = "0% - 10%";

const defaultCriteria = {
  salary: {
    salary: false,
    income: "",
    creditScore: "",
    collateral: defaultPercentage,
    dti: defaultPercentage,
  },
  business: {
    business: false,
    income: "",
    creditScore: "",
    collateral: defaultPercentage,
    dti: defaultPercentage,
  },
};

const LoanInputFields = ({ loanTypeIndex, type, handleChange, value }) => (
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <InputField
        name="income"
        value={value?.income}
        onChange={(e) => handleChange(e, loanTypeIndex, type)}
        width="40"
      />
      <span className="text-sm">Per 1 Lakh</span>
    </div>
    <div className="flex items-center space-x-2">
      <InputField
        name="creditScore"
        value={value?.creditScore}
        onChange={(e) => handleChange(e, loanTypeIndex, type)}
        width="40"
      />
      <span className="text-sm">/900</span>
    </div>
    <div className="flex items-center space-x-2">
      <SelectInput
        name="collateral"
        options={percentageRange}
        value={value?.collateral}
        onChange={(e) => handleChange(e, loanTypeIndex, type)}
        width="40"
      />
      <span className="text-sm">%</span>
    </div>
    <div className="flex items-center space-x-2">
      <SelectInput
        name="dti"
        options={percentageRange}
        value={value?.dti}
        onChange={(e) => handleChange(e, loanTypeIndex, type)}
        width="40"
      />
      <span className="text-sm">Lower is better</span>
    </div>
  </div>
);

const LoanFields = ({ index, loanData, handleCheckbox, handleChange }) => {
  const { loanType, criteria } = loanData;

  return (
    <div>
      <p className="ml-2 font-semibold text-md">{loanType?.toUpperCase()}</p>
      <div className="border rounded-md p-4 mb-4 w-full shadow-md">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 flex mt-8 flex-col space-y-8">
            <Title title="Income" />
            <Title title="Credit Score" />
            <Title title="Collateral" />
            <Title title="Debt to Income Ratio" />
          </div>
          <div className="col-span-5">
            <label className="inline-flex items-center mb-2 ml-10">
              <input
                type="checkbox"
                name="salary"
                checked={criteria?.salary?.salary}
                onChange={(e) => handleCheckbox(e, index, "salary")}
                className="mr-1"
              />
              Salary
            </label>
            <LoanInputFields
              loanTypeIndex={index}
              type="salary"
              value={criteria?.salary}
              handleChange={handleChange}
            />
          </div>
          <div className="col-span-5">
            <label className="inline-flex items-center mb-2 ml-10">
              <input
                type="checkbox"
                name="business"
                checked={criteria?.business?.business}
                onChange={(e) => handleCheckbox(e, index, "business")}
                className="mr-1"
              />
              Business
            </label>
            <LoanInputFields
              loanTypeIndex={index}
              type="business"
              value={criteria?.business}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BankSettingForm = ({ branchId, bankId, onSubmit = () => {}, data = [] }) => {
  const [selectedLoans, setSelectedLoans] = useState([]);
  const [formData, setFormData] = useState({
    bankId: "",
    branchId: "",
    loanCriteriaList: [],
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const preselectedLoanTypes = data.map((item) => item.loanType);
      setSelectedLoans(preselectedLoanTypes);

      setFormData({
        bankId: bankId || "",
        branchId: branchId || "",
        loanCriteriaList: data.map((item) => ({
          loanType: item.loanType,
          criteria: {
            salary: {
              salary: item.criteria?.salary?.salary ?? false,
              income: item.criteria?.salary?.income ?? "",
              creditScore: item.criteria?.salary?.creditScore ?? "",
              collateral: item.criteria?.salary?.collateral || defaultPercentage,
              dti: item.criteria?.salary?.dti || defaultPercentage,
            },
            business: {
              business: item.criteria?.business?.business ?? false,
              income: item.criteria?.business?.income ?? "",
              creditScore: item.criteria?.business?.creditScore ?? "",
              collateral: item.criteria?.business?.collateral || defaultPercentage,
              dti: item.criteria?.business?.dti || defaultPercentage,
            },
          },
        })),
      });
    } else {
      setFormData({
        bankId: bankId || "",
        branchId: branchId || "",
        loanCriteriaList: [],
      });
    }
  }, [data, bankId, branchId]);

  const toggleLoanSelection = (loanType) => {
    const exists = selectedLoans.includes(loanType);
    const updatedLoans = exists
      ? selectedLoans.filter((lt) => lt !== loanType)
      : [...selectedLoans, loanType];

    setSelectedLoans(updatedLoans);

    setFormData((prev) => {
      const updatedList = exists
        ? prev.loanCriteriaList.filter((item) => item?.loanType !== loanType)
        : [
            ...prev.loanCriteriaList,
            {
              loanType,
              criteria: JSON.parse(JSON.stringify(defaultCriteria)),
            },
          ];
      return { ...prev, loanCriteriaList: updatedList };
    });
  };

  const handleCheckbox = (e, index, type) => {
    const { name, checked } = e.target;
    const updatedList = [...formData.loanCriteriaList];
    updatedList[index].criteria[type][name] = checked;
    setFormData({ ...formData, loanCriteriaList: updatedList });
  };

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    const updatedList = [...formData.loanCriteriaList];
    updatedList[index].criteria[type][name] = value;
    setFormData({ ...formData, loanCriteriaList: updatedList });
  };

  const handleSubmit = async () => {
    const enrichedList = formData.loanCriteriaList.map((item) => {
      const { salary, business } = item.criteria;

      return {
        ...item,
        criteria: {
          salary: {
            ...salary,
            collateral: salary.collateral || defaultPercentage,
            dti: salary.dti || defaultPercentage,
          },
          business: {
            ...business,
            collateral: business.collateral || defaultPercentage,
            dti: business.dti || defaultPercentage,
          },
        },
      };
    });

    const finalFormData = {
      ...formData,
      bankId: formData.bankId?._id || formData.bankId,  // ✅ Convert to string if it's an object
      loanCriteriaList: enrichedList,
    };

    console.log("Final Payload:", finalFormData);
    onSubmit(finalFormData);
  };

  return (
    <div className="border rounded-md p-4 mb-4 shadow-md w-full max-w-3xl">
      <div className="flex gap-2 items-center">
        <span className="font-bold text-lg">Settings</span>
        <span className="font-semibold text-sm">Make Default</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {allLoanTypes.map((loan) => (
          <label key={loan} className="inline-flex items-center">
            <input
              type="checkbox"
              checked={selectedLoans.includes(loan)}
              onChange={() => toggleLoanSelection(loan)}
              className="mr-2"
            />
            <span className="text-sm">{loan}</span>
          </label>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-2">
        {formData.loanCriteriaList.map((loan, index) => (
          <LoanFields
            key={`${loan.loanType}-${index}`}
            index={index}
            loanData={loan}
            handleCheckbox={handleCheckbox}
            handleChange={handleChange}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          className="font-semibold bg-gray-800 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BankSettingForm;
