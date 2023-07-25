"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const KakaoRedirect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`...`, {
          authCode: code,
        });

        const { accessToken, refreshToken } = response.data.data;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    router.push("/");
  }, [code, router]);
  return <div>kakaoRedirect</div>;
};

export default KakaoRedirect;
