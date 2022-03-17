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
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [zxcvbnResult, setZxcvbnResult] = useState<IZXCVBNResult | null>(null);

  const handleSubmit = async () => {
    const response = await axiosInstance.post('/password', { password });
    console.log(response);
  };

  useEffect(() => {
    const result = zxcvbn(password, [name]);
    setZxcvbnResult(result);
    console.log(result);
  }, [name, password]);

  return (
    <div className="flex items-center justify-center w-screen h-screen p-3 font-poppins-regular">
      <div className="flex flex-col space-y-1 items-center">
        <input
          className="p-3 border-2 rounded-lg"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-3 border-2 rounded-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          onClick={handleSubmit}
          className="bg-green-100 w-1/2 text-center cursor-pointer rounded-md p-1 border-2"
        >
          Submit
        </div>
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
  );
};

export default Home;
