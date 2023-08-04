"use client";

import Image from "next/image";
import Link from "next/link";

import {
  KAKAO_AUTHCODE,
  LOG_IN,
  LOG_OUT,
  MAIN_NAME,
  SELLING,
} from "../constant";
import { User } from "@/utils/types";
import { useRouter } from "next/navigation";
interface UserPrpos {
  user: User | undefined;
  isLoggedIn: boolean;
}

const Header = ({ user, isLoggedIn }: UserPrpos) => {
  const router = useRouter();
  const logOut = () => {
    localStorage.clear();
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
    router.push("/");
  };
  return (
    <div className="sticky top-0 z-10 navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="text-xl normal-case btn btn-ghost">
          {MAIN_NAME}
        </Link>
      </div>
      <div className="flex-none gap-2">
        {isLoggedIn ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src={user?.profile || "/avatar.png"}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/products/register">{SELLING}</Link>
                </li>
                <li>
                  <button onClick={() => logOut()}>{LOG_OUT}</button>
                </li>
              </ul>
            </div>
            <div>{user?.nickname}</div>
          </>
        ) : (
          <Link href={KAKAO_AUTHCODE}>{LOG_IN}</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
