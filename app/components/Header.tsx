import Image from "next/image";
import Link from "next/link";
import {
  KAKAO_AUTHCODE,
  LOG_IN,
  LOG_OUT,
  MAIN_NAME,
  SELLING,
} from "../constant";

const Header = () => {
  const isLogin = false;
  return (
    <div className="sticky top-0 z-10 navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="text-xl normal-case btn btn-ghost">
          {MAIN_NAME}
        </Link>
      </div>
      <div className="flex-none gap-2">
        {isLogin ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
                <a>{LOG_OUT}</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link href={KAKAO_AUTHCODE}>{LOG_IN}</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
