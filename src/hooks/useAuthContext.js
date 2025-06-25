"use client"
import  { AuthContext } from "@/context/AuthContext";
import  { useContext, useActionState }  from  "react";

// Create a custom hook to consume the context (optional, but recommended)
const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};
export default useAuthContext;