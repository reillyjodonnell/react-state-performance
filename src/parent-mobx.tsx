import { makeAutoObservable, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

const whoStore = makeAutoObservable({
  who: 'Parent',
  setWho(newWho: string) {
    runInAction(() => {
      this.who = newWho;
    });
  },
});

const Display = observer(() => {
  return <span>Who: {whoStore.who}</span>;
});

// Parent component
export const ParentWithMobX = observer(() => {
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
          whoStore.setWho('Parent');
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

// Child component
const Child = observer(({ name }: { name: string }) => {
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
        console.log('Child');
        e.stopPropagation();
        whoStore.setWho(name);
      }}
    >
      {name} Component
      {subChildren}
    </div>
  );
});

// SubChild component
const SubChild = observer(({ name }: { name: string }) => {
  return (
    <div
      style={{
        border: '1px solid white',
        margin: '.25rem',
        padding: '.25rem',
      }}
      onClick={(e) => {
        e.stopPropagation();
        whoStore.setWho(name);
      }}
    >
      {name}
    </div>
  );
});
