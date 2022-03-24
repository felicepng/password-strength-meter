import type { NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
import zxcvbn, { IZXCVBNResult } from 'zxcvbn-typescript';
import axios from 'axios';
import hmacSHA256 from 'crypto-js/sha256';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/';
const axiosInstance = axios.create({
  baseURL: BASE_URL + 'api/',
});

const Home: NextPage = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [zxcvbnResult, setZxcvbnResult] = useState<IZXCVBNResult | null>(null);

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password, [firstName, lastName, dateOfBirth]);
      setZxcvbnResult(result);
      console.log(result);
    } else {
      setZxcvbnResult(null);
    }
  }, [firstName, lastName, dateOfBirth, password]);

  return (
    <div className="bg-primary text-white w-screen h-screen font-poppins-regular">
      <img src="/design.png" className="top-0 right-0 absolute w-2/3 opacity-60" />
      <div className="flex flex-col py-16 px-14 md:px-24 w-full h-full absolute z-10">
        <div className="text-3xl md:text-4xl font-poppins-semibold mt-1">Password-Strength Meter</div>
        <div className="text-xl text-secondary mt-1">CS440 G2T8</div>

        <div className="mt-16 lg:w-3/5 flex flex-col space-y-6 items-center">
          <div className="flex justify-between w-full gap-x-6">
            <input
              className="w-full focus:outline-none placeholder-gray-500 bg-primary p-3 border-2 border-secondary rounded-lg"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="w-full focus:outline-none placeholder-gray-500 bg-primary p-3 border-2 border-secondary rounded-lg"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            className="w-full focus:outline-none placeholder-gray-500 bg-primary p-3 border-2 border-secondary rounded-lg"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <div className="w-full gap-x-6 flex items-center justify-between">
            <input
              className="w-full focus:outline-none placeholder-gray-500 bg-primary p-3 border-2 border-secondary rounded-lg"
              placeholder="Password"
              type={isPasswordHidden ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {
              isPasswordHidden ?
                <AiOutlineEyeInvisible className="text-secondary w-6 h-6 cursor-pointer" onClick={() => setIsPasswordHidden(false)} /> :
                <AiOutlineEye className="text-secondary w-6 h-6 cursor-pointer" onClick={() => setIsPasswordHidden(true)} />
            }
          </div>

          <hr className="opacity-40 w-full" />

          <div className="flex flex-col w-full">
            <div className="text-center mb-4">
              Score: {zxcvbnResult?.score || "-"}
            </div>
            <div className="text-center mb-7">
              Suggestion:{' '}
              {zxcvbnResult ?
                zxcvbnResult.feedback.suggestions.map((item: string) => item + ". ") :
                "-"
              }

            </div>
            <div className="flex w-full space-x-3">
              {zxcvbnResult?.sequence.map((sequence, index) => {
                return (
                  <div
                    key={index}
                    className="px-3 py-2 bg-gray-800 opacity-80 rounded-md text-sm gap-x-2"
                  >
                    <div className="font-poppins-medium">Pattern:
                      <span className="ml-2">{sequence.pattern}</span>
                      {sequence.l33t && (
                        <Fragment>
                          <span className="font-poppins-medium">
                            L33t characters
                          </span>
                          <span>{sequence.sub_display as string}</span>
                        </Fragment>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
