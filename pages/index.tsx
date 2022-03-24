import type { NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
import zxcvbn, { IZXCVBNResult } from 'zxcvbn-typescript';
import axios from 'axios';
import hmacSHA256 from 'crypto-js/sha256';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/';
const axiosInstance = axios.create({
  baseURL: BASE_URL + 'api/',
});

const Home: NextPage = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [zxcvbnResult, setZxcvbnResult] = useState<IZXCVBNResult | null>(null);

  useEffect(() => {
    const result = zxcvbn(password, [firstName, lastName, dateOfBirth]);
    setZxcvbnResult(result);
    console.log(result);
  }, [firstName, lastName, dateOfBirth, password]);

  return (
    <div className="bg-primary text-white w-screen h-screen font-poppins-regular">
      <img src="/design.png" className="top-0 right-0 absolute w-2/3 opacity-60" />
      <div className="flex flex-col py-16 px-24 w-full h-full absolute z-10">
        <div className="text-4xl font-poppins-semibold mt-1">Password-Strength Meter</div>
        <div className="text-xl text-secondary mt-1">CS440 G2T8</div>

        <div className="mt-16 xl:w-3/5 flex flex-col space-y-6 items-center">
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
          <input
            className="w-full focus:outline-none placeholder-gray-500 bg-primary p-3 border-2 border-secondary rounded-lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <hr className="opacity-40 w-full" />
          <div className="flex flex-col w-full">
            <span className="font-poppins-bold text-center">
              Basic Password Security
            </span>
            <div className="flex w-full space-x-3">
              {zxcvbnResult &&
                zxcvbnResult.sequence.map((sequence, index) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-2 border text-sm gap-x-2"
                    >
                      <span className="font-poppins-medium">Pattern</span>
                      <span>{sequence.pattern}</span>
                      {sequence.l33t && (
                        <Fragment>
                          <span className="font-poppins-medium">
                            L33t characters
                          </span>
                          <span>{sequence.sub_display as string}</span>
                        </Fragment>
                      )}
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
