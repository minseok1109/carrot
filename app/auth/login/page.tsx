"use client";
import { useRouter } from "next/navigation";
import { KAKAO_AUTHCODE } from "../../constant";
const Login = () => {
  const router = useRouter();
  const kakaoLogin = () => {
    const kakaoUrl = KAKAO_AUTHCODE;
    router.push(kakaoUrl);
  };

  return (
    <button type="button" onClick={kakaoLogin} className="btn">
      Login
    </button>
  );
};

export default Login;
