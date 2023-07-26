"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useEffect } from "react";

const KakaoRedirect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://backendkwon.shop/auth/login",
          {
            authCode: code,
          }
        );

        // const { accessToken, refreshToken } = response.data.data;
        setCookie("accessToken", "test");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    router.push("/");
  }, [code, router]);
};

export default KakaoRedirect;
