import { useSearchParams } from "next/navigation";

const useGetQueryParam = (param) => {
  const searchParams = useSearchParams();
  return searchParams.get(param);
};

export default useGetQueryParam;
