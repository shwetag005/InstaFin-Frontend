// "use client";
// import { Button } from "antd";
// import { useEffect, useState } from "react";
// import MobileInput from "../ui/MobileInput";
// import TextInput from "../form/TextInput";
// import { VscSettings } from "react-icons/vsc";
// import { useParams, usePathname, useRouter } from "next/navigation";
// import { getRole } from "@/lib/commonFunctions";
// import useGetQueryParam from "../utils/commonFunctions";

// const PageHeader = ({
//   title = "",
//   subTitle = "",
//   showFilter = false,
//   addNewSubUser = false,
//   isPan = false,
//   collapsed,
//   setFormData,
//   formData={},
//   text,
//   errors = {},
//   validateField,

// }) => {

//   const [mobileNumber, setMobileNumber] = useState("");
//   const [pan, setPan] = useState("");
//   const pathname = usePathname();
//   const router=useRouter();
//   const type = useGetQueryParam("type");
//   const currentRoute = pathname.split('/')[1];
//   const pathSplit = pathname.split("/");
//   const role=getRole();
//   const isApplication= currentRoute == "applications" ? "applications" :false;
//   const isUser = currentRoute == "users" ? "users" : false;
//   const isLender= pathSplit[2] == "lender" ? "lender" : false;
//   const isBank= currentRoute == "bank" ? "bank" : false;

  
//   useEffect(() => {
//     setFormData &&
//       mobileNumber &&
//       setFormData((prev) => ({ ...prev, ["mobileNumber"]: mobileNumber ?? formData.mobileNumber }));
//   }, [mobileNumber]);
//   useEffect(() => {
//     setFormData && pan && setFormData((prev) => ({ ...prev, ["pan"]: pan ?? formData.pan }));
//   }, [pan]);
//   return (
//     <div className="container-lg w-full max-w-7xl mx-auto flex justify-center items-center">
//       <div className=" flex flex-col sm:flex-row justify-between items-center w-full max-w-3xl">
//         <div
//           className={`container-div w-full flex  items-center justify-between`}
//         >
//           {/* Title Section */}
//           <div
//             className={`flex col-span-6 items-center ${showFilter && "gap-2"}`}
//           >
//             {title && (
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {title.toUpperCase()}
//               </h1>
//             )}
//             {subTitle && (
//               <p className="my-2 text-sm font-semibold text-gray-500">
//                 {subTitle?.toUpperCase()}
//               </p>
//             )}
//             {showFilter && (
//               <Button shape="round" size="small" className="border-gray-500">
//                 <VscSettings />
//               </Button>
//             )}
//           </div>

//           <div className="col-span-6 flex flex-wrap justify-end gap-4">
//              {["masterAdmin"].includes(role) && isUser && (
//               <Button
//                 shape="round"
//                 size="small"
//                 className="border-gray-500"
//                 onClick={() => router.push("/adduser?user=admin")}
//               >
//                 Add New Admin
//               </Button>
//             )}
//             {["admin","masterAdmin"].includes(role) && isUser && (
//               <Button
//                 shape="round"
//                 size="small"
//                 className="border-gray-500"
//                 onClick={() => router.push("/adduser?user=agent")}
//               >
//                 Add New Agent
//               </Button>
//             )}
//             {["agent"].includes(role) && isUser && (
//               <Button
//                 shape="round"
//                 size="small"
//                 className="border-gray-500"
//                 onClick={() => router.push("/adduser?user=subAgent")}
//               >
//                 Add New SubAgent
//               </Button>
//             )}
//             {["agent","subAgent"].includes(role) && isApplication && (
//               <Button
//                 shape="round"
//                 size="small"
//                 className="border-gray-500"
//                 onClick={() => router.push("/adduser?user=client")}
//               >
//                 Add New Client
//               </Button>
//             )}
//             {["admin","masterAdmin"].includes(role) && isLender && (
//               <Button
//                 shape="round"
//                 size="small"
//                 className="border-gray-500"
//                 onClick={() => router.push("/adduser?user=lender")}
//               >
//                 Add New Lender
//               </Button>
//             )}
//             {["admin","masterAdmin"].includes(role) && isBank && !isLender && (
//               <Button
//                 shape="round"
//                 size="small"
//                 className="border-gray-500"
//                 onClick={() => router.push("/adduser?user=bank")}
//               >
//                 Add New Bank
//               </Button>
//             )}
//             {addNewSubUser && (
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-bold">Enter Mobile</span>
//                 <MobileInput onMobileChange={setMobileNumber} />
//               </div>
//             )}
//             {isPan && (
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-bold">Enter PAN</span>
//                 <div className="w-[145px]">
//                   <TextInput
//                     value={pan}
//                     isBold
//                     onChange={(e) => setPan(e.target.value)}
//                   />
//                 </div>
//               </div>
//             )}
//             {text && <span className="text-2xl font-bold uppercase">{text}</span>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageHeader;


"use client";
import { Button } from "antd";
import { useEffect, useState } from "react";
import MobileInput from "../ui/MobileInput";
import TextInput from "../form/TextInput";
import { VscSettings } from "react-icons/vsc";
import { usePathname, useRouter } from "next/navigation";
import { getRole } from "@/lib/commonFunctions";
import useGetQueryParam from "../utils/commonFunctions";

const PageHeader = ({
  title = "",
  subTitle = "",
  showFilter = false,
  addNewSubUser = false,
  isPan = false,
  collapsed,
  setFormData,
  formData = {},
  text,
  errors = {},
  validateField,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [pan, setPan] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const type = useGetQueryParam("type");
  const currentRoute = pathname.split("/")[1];
  const pathSplit = pathname.split("/");
  const role = getRole();

  const isApplication = currentRoute === "applications";
  const isUser = currentRoute === "users";
  const isLender = pathSplit[2] === "lender";
  const isBank = currentRoute === "bank";

  // INITIALIZE local state from parent
useEffect(() => {
  setMobileNumber(formData?.mobileNumber || "");
  setPan(formData?.pan || "");
}, [formData?.mobileNumber, formData?.pan]);

// HANDLE input change & update parent
const handleMobileChange = (e) => {
  const val = e.target.value.replace(/\D/g, "");
  setMobileNumber(val);
  validateField?.("applicantMobile", val);
  setFormData?.((prev) => ({ ...prev, mobileNumber: val }));
};

const handlePanChange = (e) => {
  const value = e.target.value.toUpperCase();
  setPan(value);
  validateField?.("pan", value);
  setFormData?.((prev) => ({ ...prev, pan: value }));
};


  return (
    <div className="container-lg w-full max-w-7xl mx-auto flex justify-center items-center">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-3xl">
        <div className="container-div w-full flex items-center justify-between">
          {/* Title Section */}
          <div className={`flex col-span-6 items-center ${showFilter && "gap-2"}`}>
            {title && (
              <h1 className="text-2xl font-bold text-gray-800">
                {title.toUpperCase()}
              </h1>
            )}
            {subTitle && (
              <p className="my-2 text-sm font-semibold text-gray-500">
                {subTitle.toUpperCase()}
              </p>
            )}
            {showFilter && (
              <Button shape="round" size="small" className="border-gray-500">
                <VscSettings />
              </Button>
            )}
          </div>

          {/* Right-side buttons and inputs */}
          <div className="col-span-6 flex flex-wrap justify-end gap-4">
            {["masterAdmin"].includes(role) && isUser && (
              <Button
                shape="round"
                size="small"
                className="border-gray-500"
                onClick={() => router.push("/adduser?user=admin")}
              >
                Add New Admin
              </Button>
            )}

            {["admin", "masterAdmin"].includes(role) && isUser && (
              <Button
                shape="round"
                size="small"
                className="border-gray-500"
                onClick={() => router.push("/adduser?user=agent")}
              >
                Add New Agent
              </Button>
            )}

            {["agent"].includes(role) && isUser && (
              <Button
                shape="round"
                size="small"
                className="border-gray-500"
                onClick={() => router.push("/adduser?user=subAgent")}
              >
                Add New SubAgent
              </Button>
            )}

            {["agent", "subAgent"].includes(role) && isApplication && (
              <Button
                shape="round"
                size="small"
                className="border-gray-500"
                onClick={() => router.push("/adduser?user=client")}
              >
                Add New Client
              </Button>
            )}

            {["admin", "masterAdmin"].includes(role) && isLender && (
              <Button
                shape="round"
                size="small"
                className="border-gray-500"
                onClick={() => router.push("/adduser?user=lender")}
              >
                Add New Lender
              </Button>
            )}

            {["admin", "masterAdmin"].includes(role) && isBank && !isLender && (
              <Button
                shape="round"
                size="small"
                className="border-gray-500"
                onClick={() => router.push("/adduser?user=bank")}
              >
                Add New Bank
              </Button>
            )}

            {/* Mobile Number Input */}
            {addNewSubUser && (
              <div className="flex flex-col">
                <label className="text-sm font-bold">Enter Mobile</label>
                <div className="w-[145px]">
                  <TextInput
                    value={mobileNumber}
                    onChange={handleMobileChange}
                    maxLength={10}
                    className={errors.applicantMobile ? "border-red-500" : ""}
                  />
                </div>
                {errors.applicantMobile && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.applicantMobile}
                  </span>
                )}
              </div>
            )}

            {/* PAN Input */}
            {isPan && (
              <div className="flex flex-col">
                <label className="text-sm font-bold">Enter PAN</label>
                <div className="w-[145px]">
                  <TextInput
                    value={pan}
                    onChange={handlePanChange}
                    maxLength={10}
                    className={errors.pan ? "border-red-500" : ""}
                  />
                </div>
                {errors.pan && (
                  <span className="text-xs text-red-500 mt-1">{errors.pan}</span>
                )}
              </div>
            )}

            {/* Optional Header Text */}
            {text && <span className="text-2xl font-bold uppercase">{text}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
