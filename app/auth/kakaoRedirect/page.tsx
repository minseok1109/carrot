"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useEffect } from "react";
import { URL } from "@/app/constant";

const KakaoRedirect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${URL}/auth/login`, {
          authCode: code,
        });
        const { access_token } = response.data.accessToken;
        axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        setCookie("accessToken", access_token);
        const userInfo = await axios.get(`${URL}/auth/user`);
        localStorage.setItem("userInfo", JSON.stringify(userInfo.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    router.replace("/");
  }, [code, router]);
};

export default KakaoRedirect;
