import React from 'react';
import RaceDemo from './race';
import SimultaneousDemo from './simultaneous';
import ExclusiveDemo from './exclusive';

export default function App() {
  return (
    <>
      <RaceDemo />
      <SimultaneousDemo />
      <ExclusiveDemo />
    </>
  );
}
