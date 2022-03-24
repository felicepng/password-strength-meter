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
    <div className="relative bg-primary text-white w-screen h-screen overflow-x-hidden overflow-y-hidden font-poppins-regular">
      <img src="/design.png" className="top-0 right-0 absolute w-2/3 opacity-60" />
      <div className="flex flex-col py-16 px-14 md:px-24 w-screen h-screen overflow-x-scroll overflow-y-scroll z-10">
        <div className="text-3xl md:text-4xl font-poppins-semibold mt-1">Password-Strength Meter</div>
        <div className="text-xl text-secondary mt-1">CS440 G2T8</div>

        <div className="mt-16 grid lg:grid-cols-3 gap-x-20">
          <div className="lg:col-span-2 space-y-6 items-center">
            <div className="flex justify-between w-full gap-x-6">
              <input
                className="w-full focus:outline-none placeholder-gray-500 bg-primary px-5 py-3 border-2 border-secondary rounded-lg"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="w-full focus:outline-none placeholder-gray-500 bg-primary px-5 py-3 border-2 border-secondary rounded-lg"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              className="w-full focus:outline-none placeholder-gray-500 bg-primary px-5 py-3 border-2 border-secondary rounded-lg"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <div className="w-full gap-x-6 flex items-center justify-between">
              <input
                className="w-full focus:outline-none placeholder-gray-500 bg-primary px-5 py-3 border-2 border-secondary rounded-lg"
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

            <hr className="opacity-40" />

            <div className="flex flex-col w-full">
              <div className="flex w-full flex-wrap gap-3 mt-3 mb-6">
                {zxcvbnResult?.sequence.map((sequence, index) => {
                  return (
                    <div
                      key={index}
                      className="px-3 py-2 bg-gray-800 opacity-80 rounded-md text-sm gap-x-2"
                    >
                      <div className="font-poppins-medium">Pattern:
                        <span className="ml-2">{sequence.pattern}</span>
                        <div className="font-poppins-medium">Token:
                          <span className="ml-2">{sequence.token}</span>
                        </div>
                        {sequence.l33t && (
                          <Fragment>
                            <span className="font-poppins-medium">
                              L33t characters{" "}
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
          {
            zxcvbnResult &&
            <div className="font-poppins-semibold opacity-80 bg-gray-800 py-6 px-8 rounded-lg flex flex-col gap-y-6">
              <div>
                Password Entropy:{' '}
                <span className="font-poppins-regular">
                  NA
                </span>
              </div>
              <div>
                Score:{' '}
                <span className="font-poppins-regular">
                  {password ? zxcvbnResult.score : "-"}
                </span>
              </div>
              <div>
                Guesses:{' '}
                <span className="font-poppins-regular">
                  {zxcvbnResult.guesses}
                </span>
              </div>
              <div>
                Time to crack (10,000 guesses per second):{' '}
                <span className="font-poppins-regular">
                  {zxcvbnResult.crack_times_display.offline_slow_hashing_1e4_per_second}
                </span>
              </div>
              <div>
                Suggestions:{' '}
                <span className="font-poppins-regular">
                  {zxcvbnResult.feedback.suggestions.map((item: string) => item + " ")}
                </span>
              </div>
              <div>
                Warning:{' '}
                <span className="font-poppins-regular">
                  {zxcvbnResult.feedback.warning || "-"}
                </span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
