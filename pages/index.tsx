import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home: NextPage = () => {
  const [password, setPassword] = useState<string>('');
  return (
    <div className="flex items-center justify-center w-screen h-screen p-3 font-poppins-regular">
      <div>
        <input
          className="p-3 border-2 rounded-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
