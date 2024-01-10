import { atom, useAtom, useSetAtom } from 'jotai';

const whoAtom = atom('Parent');

function Display() {
  const [who] = useAtom(whoAtom);

  return <span>Who: {who}</span>;
}

export function ParentWithJotai() {
  const setWho = useSetAtom(whoAtom);

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
}
function Child({ name }: { name: string }) {
  const setWho = useSetAtom(whoAtom);

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
}

function SubChild({ name }: { name: string }) {
  const setWho = useSetAtom(whoAtom);

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
