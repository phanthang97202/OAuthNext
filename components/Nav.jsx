"use client";
import React from "react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const { data: session } = useSession();
  console.log("session", session);
  // console.log("Connecting to", process.env.MONGODB_URI);

  const [providers, setProviders] = useState(null);
  // console.log("providers", providers);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const handleSetProviders = async () => {
      const response = await getProviders();
      // console.log(
      //   "🚀 ~ file: Nav.jsx:19 ~ handleSetProviders ~ response:",
      //   response
      // );
      setProviders(response);
    };
    handleSetProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <div className="flex-between w-full mb-16 pt-3">
        <Link href={"/"} className="flex gap-2 flex-center">
          <Image
            src={"/assets/images/logo.svg"}
            alt="Promptopia Logo"
            width={30}
            height={30}
          ></Image>
          <p className="logo_text">Promptpia</p>
        </Link>

        {/* Deskstop navigation  */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href={"/create-prompt"} className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>
              <Link
                // className="w-8 h-8"
                href={"/profile"}
              >
                <Image
                  className="rounded-full w-10 h-10"
                  src={session?.user.image}
                  alt="Avatar profile"
                  // fill={true}
                  height={50}
                  width={50}
                ></Image>
              </Link>
            </div>
          ) : (
            <div>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => {
                        console.log("signIn(provider.id)", provider.id);
                        signIn(provider.id);
                      }}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  );
                })}
            </div>
          )}
        </div>

        {/* Mobile navigation  */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                alt="Promptopia Logo"
                width={30}
                height={30}
                onClick={() => {
                  setToggleDropdown((prev) => !prev);
                }}
              ></Image>
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href={"/profile"}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href={"/create-prompt"}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
