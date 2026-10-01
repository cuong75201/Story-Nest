import { useToast } from "@/context/toast.context";
import type { Response as ApiResponse } from "@/libs/response";
import { useState } from "react";

const useCallApi = (initialLoading = false) => {
  const [loading, setLoading] = useState(initialLoading);
  const { showToast } = useToast();

  const execute =
    async <T>(
      apiCall: () => Promise<ApiResponse<T>>
    ) => {
      setLoading(true);

      try {
        const response = await apiCall();
        const status_code=response.status_code
        if(status_code===401){
          showToast("Warning","Phiên đăng nhập không hợp lệ hoặc đã hết hạn","warning")
        }
        if(status_code===403){
          showToast("Warning","Không đủ quyền truy cập vào tài nguyên này","warning")
        }
        return response;
      } catch (error: any) {
        console.error("API error:",error.message)
        showToast("Lỗi","Máy chủ không phản hồi","error")
      } finally {
        setLoading(false);
      }
    }


  return { execute, loading };
};

export { useCallApi };
