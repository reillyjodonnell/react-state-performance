import { useState } from 'react';

function Display({ who }: { who: string }) {
  return <span>Who: {who}</span>;
}

export const Parent = () => {
  const [who, setWho] = useState('Parent');
  return (
    <div>
      <Display who={who} />
      <div
        style={{
          border: '1px solid white',
          margin: '.25rem',
          padding: '.25rem',
        }}
        onClick={() => {
          console.log('Parent');
          setWho('Parent');
        }}
      >
        <span>Parent</span>
        <Child name="Child1" setWho={setWho} />
        <Child name="Child2" setWho={setWho} />
        <Child name="Child3" setWho={setWho} />
        <Child name="Child4" setWho={setWho} />
        <Child name="Child5" setWho={setWho} />
      </div>
    </div>
  );
};
const Child = ({
  name,
  setWho,
}: {
  name: string;
  setWho: (name: string) => void;
}) => {
  const subChildren = Array.from({ length: 10 }, (_, index) => (
    <SubChild key={index} name={`SubChild${index + 1}`} setWho={setWho} />
  ));

  return (
    <div
      style={{
        border: '1px solid white',
        margin: '.25rem',
        padding: '.25rem',
      }}
      onClick={(e) => {
        e.stopPropagation();
        setWho(name);
      }}
    >
      {name} Component
      {subChildren}
    </div>
  );
};

function SubChild({
  name,
  setWho,
}: {
  name: string;
  setWho: (name: string) => void;
}) {
  return (
    <div
      style={{
        border: '1px solid white',
        margin: '.25rem',
        padding: '.25rem',
      }}
      onClick={(e) => {
        e.stopPropagation();
        console.log(name);
        setWho(name);
      }}
    >
      {name}
    </div>
  );
}
