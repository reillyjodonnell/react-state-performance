import React, { useState, createContext, useContext } from 'react';

type WhoContextType = {
  who: string;
  setWho: (name: string) => void;
};

const Context = createContext<WhoContextType | null>(null);

function WhoContext({ children }: { children: React.ReactNode }) {
  const [who, setWho] = useState('Parent');

  return (
    <Context.Provider
      value={{
        who,
        setWho,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useWhoContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useWhoContext must be used within a WhoContext');
  }
  return context;
}

export function ParentWithContext() {
  return (
    <WhoContext>
      <Parent />
    </WhoContext>
  );
}

const Display = React.memo(() => {
  const { who } = useWhoContext();

  return <span>Who: {who}</span>;
});

export const Parent = React.memo(() => {
  const { setWho } = useWhoContext();

  return (
    <div>
      <Display />
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
        <Child name="Child1" />
        <Child name="Child2" />
        <Child name="Child3" />
        <Child name="Child4" />
        <Child name="Child5" />
      </div>
    </div>
  );
});
const Child = React.memo(({ name }: { name: string }) => {
  const { setWho } = useWhoContext();

  const subChildren = Array.from({ length: 10 }, (_, index) => (
    <SubChild key={index} name={`SubChild${index + 1}`} />
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
});

const SubChild = React.memo(({ name }: { name: string }) => {
  const { setWho } = useWhoContext();

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
});
