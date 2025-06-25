"use client";

import { getBranches } from "@/lib";
import { showToast } from "@/utils/toastUtils";
import { useEffect, useState } from "react";

const BankBranchForm = ({ bankId }) => {
  const [branches, setBranches] = useState([]);

  if (!bankId) {
    showToast.error("No Bank Selected");
  }
  useEffect(() => {
    console.log(bankId);
    async function fetchBranches() {
      try {
        const response = await getBranches(bankId);
        if (response.status == 200) {
          setBranches(response.data.data);
          //   showToast.success(response.message);
          //   showToast.success("Branches Fetched");
          if (branches.length == 0) {
            // showToast.error("No Branches Found");
          }
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (bankId) {
      fetchBranches();
    }
  }, [bankId]);
  if (!branches || !Array.isArray(branches) || branches.length == 0) {
    return null;
  }

  console.log(branches);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {Array.isArray(branches) && branches.length > 0 ? (
        branches.map((branch) => (
          <div
            key={branch._id}
            className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            {/* <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {branch.bankName}
            </h3> */}
            <p className="text-sm text-gray-600 mb-1">
              <strong>Branch:</strong> {branch.bankBranch}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Location:</strong> {branch.bankLocation}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>IFSC Code:</strong> {branch.ifscCode}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Pincode:</strong> {branch.bankPin}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Designation:</strong> {branch.bankPersonDesignation}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Employee ID:</strong> {branch.bankPersonEId}
            </p>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No branches found.
        </p>
      )}
    </div>
  );
};

export default BankBranchForm;
