// "use client";

// import CustomButton from "@/component/form/CustomButton";
// import InputField from "@/component/form/InputField";
// import InstaFinn from "@/component/ui/InstaFinn";
// import Title from "@/component/ui/Title";
// import Toster from "@/component/ui/Toster";
// import useAuthContext from "@/hooks/useAuthContext";
// import { login, loginApi, sendOTP } from "@/lib";
// import { showToast } from "@/utils/toastUtils";
// import { useRouter } from "next/navigation";
// import React, { useContext, useState } from "react";
// import OtpInput from "react-otp-input";

// const Login = () => {
//   // Toggle between Admin & Bank login
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isAdmin, setIsAdmin] = useState(true);
//   // Form states
//   const [formData, setFormData] = useState({ userId: "", mobile: "" });
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const router=useRouter()
//   const {user, token, login, logout}=useAuthContext()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleOtpChange = (otpValue) => {
//     setOtp(otpValue);
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError("");

//   try {
//     if (true) {
//       // Admin login flow
//       if (!otpSent) {
//         // Step 1: Send OTP
//         const payload = { mobileNumber: formData?.mobile };
//         const response = await sendOTP(payload);

//         if (response.status === 200) {
//           showToast("success", "OTP sent successfully");
//           showToast("success", response.message);
//           setOtpSent(true);
//         } else {
//           showToast("error", response.message);
//           showToast(error, "OTP sending failed");
//           setError(response.data.message || "OTP sending failed");
//         }
//       } else {
//         // Step 2: Verify OTP & Login
//         const payload = { mobileNumber: formData?.mobile, otp };
//         console.log(payload)
//         const response = await loginApi(payload);
//         console.log(response);
//         if(!response) return 
//         if (response.status == 200) {
//           const {user,token}=response.data
//           login(user,token)
//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("user", JSON.stringify(response.data.user));
//           router.push('/')
//         } else {
//           setError(response.data.message || "Login failed");
//         }
//       }
//     }
//   } catch (err) {
//     setError("Login failed. Please check your credentials and try again.");
//     console.error("Login Error:", err);
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-[700px]">
//         <InstaFinn isPanel isAdmin={isAdmin} />
//         {error && <p className="text-red-500 text-center mt-2">{error}</p>}

//         {/* Toggle between Admin & Bank login */}
//         <div className="flex justify-center mb-4">
//           <button
//             onClick={() => setIsAdmin(true)}
//             className={`px-4 py-2 rounded-l-lg ${
//               isAdmin ? "bg-black text-white" : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Admin Login
//           </button>
//           <button
//             onClick={() => {
//               setIsAdmin(false);
//               setOtpSent(false); // Reset OTP state when switching
//             }}
//             className={`px-4 py-2 rounded-r-lg ${
//               !isAdmin ? "bg-black text-white" : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Bank Login
//           </button>
//         </div>

//         <div className="flex justify-center">
//           <form
//             onSubmit={handleSubmit}
//             className="min-h-[308px] max-w-[450px] w-full p-4 flex flex-col justify-between"
//           >
//             {isAdmin ? (
//               <>
//                 <div>
//                   {/* Admin Login - User ID */}
//                   <Title title="User ID" />
//                   <InputField
//                     label="User ID"
//                     placeholder="Enter your User ID"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     className="shadow-inner"
//                     type="text"
//                   />
//                 </div>
//                 {otpSent && (
//                   <div className="flex flex-col items-center">
//                     <label className="text-gray-700 text-sm mb-1">
//                       Enter OTP
//                     </label>
//                     <OtpInput
//                       value={otp}
//                       onChange={setOtp}
//                       numInputs={6}
//                       renderInput={(props) => <input {...props} />}
//                       containerStyle="flex space-x-2"
//                       inputStyle={{
//                         width: "2em",
//                         height: "2em",
//                         border: "1px solid #D1D5DB",
//                         borderRadius: "0.5rem",
//                         textAlign: "center",
//                         fontSize: "1.25rem",
//                         fontWeight: "600",
//                         outline: "none",
//                         borderColor: "#6B7280",
//                         boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
//                         color: "black",
//                       }}
//                     />
//                   </div>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div>
//                   {/* Bank Login - Mobile & OTP */}
//                   <Title title="Mobile Number" />
//                   <InputField
//                     placeholder="Enter your Mobile Number"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     className="shadow-inner"
//                     type="tel"
//                   />
//                 </div>
//                 {otpSent && (
//                   <div className="flex flex-col items-center">
//                     <label className="text-gray-700 text-sm mb-1">
//                       Enter OTP
//                     </label>
//                     <OtpInput
//                       value={otp}
//                       onChange={setOtp}
//                       numInputs={6}
//                       renderInput={(props) => <input {...props} />}
//                       containerStyle="flex space-x-2"
//                       inputStyle={{
//                         width: "2em",
//                         height: "2em",
//                         border: "1px solid #D1D5DB",
//                         borderRadius: "0.5rem",
//                         textAlign: "center",
//                         fontSize: "1.25rem",
//                         fontWeight: "600",
//                         outline: "none",
//                         borderColor: "#6B7280",
//                         boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
//                         color: "black",
//                       }}
//                     />
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Submit Button */}
//             <CustomButton
//               title={isAdmin ? "LOGIN" : otpSent ? "VERIFY OTP" : "SEND OTP"}
//               loading={loading}
//               disabled={loading}
//             />
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";

import CustomButton from "@/component/form/CustomButton";
import InputField from "@/component/form/InputField";
import InstaFinn from "@/component/ui/InstaFinn";
import Title from "@/component/ui/Title";
import useAuthContext from "@/hooks/useAuthContext";
import { loginApi, sendOTP } from "@/lib";
import { showToast } from "@/utils/toastUtils";

// ✅ Validation schema
const schema = yup.object().shape({
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "User ID must be a 10-digit number")
    .required("User ID is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { mobile: "" },
  });

  const onSubmit = async ({ mobile }) => {
    setLoading(true);
    setError("");

    try {
      if (!otpSent) {
        const response = await sendOTP({ mobileNumber: mobile });

        if (response.status === 200) {
          showToast("success", response.message || "OTP sent successfully");
          setOtpSent(true);
        } else {
          showToast("error", response.message || "OTP sending failed");
          setError(response.message || "OTP sending failed");
        }
      } else {
        const response = await loginApi({ mobileNumber: mobile, otp });

        if (response?.status === 200) {
          const { user, token } = response.data;
          login(user, token);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          router.push("/");
        } else {
          setError(response?.data?.message || "Login failed");
        }
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[700px]">
        <InstaFinn isPanel />

        {/* Spacing below logo */}
        <div className="mt-8" />

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-h-[308px] max-w-[450px] w-full p-4 flex flex-col justify-between"
          >
            {/* User ID Field */}
            <div>
              <Title title="User ID" />
              <Controller
                control={control}
                name="mobile"
                render={({ field }) => (
                  <InputField
                    {...field}
                    label="User ID"
                    placeholder="Enter your User ID"
                    maxLength={10}
                    inputMode="numeric"
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      field.onChange(digitsOnly);
                    }}
                    className="shadow-inner"
                    type="text"
                  />
                )}
              />
              {errors.mobile && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* OTP Field */}
            {otpSent && (
              <div className="flex flex-col items-center mt-4">
                <label className="text-gray-700 text-sm mb-1">Enter OTP</label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  containerStyle="flex space-x-2"
                  inputStyle={{
                    width: "2em",
                    height: "2em",
                    border: "1px solid #D1D5DB",
                    borderRadius: "0.5rem",
                    textAlign: "center",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    outline: "none",
                    borderColor: "#6B7280",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                    color: "black",
                  }}
                />
              </div>
            )}

            {/* Button */}
            <CustomButton
              title={otpSent ? "VERIFY OTP" : "SEND OTP"}
              loading={loading}
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
