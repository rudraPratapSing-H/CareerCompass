export const codeExamples = {
  javascript: {
    forLoop: `for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}`,
    map: `const doubled = numbers.map(num => num * 2);`,
    filter: `const evens = numbers.filter(num => num % 2 === 0);`,
    reduce: `const sum = numbers.reduce((acc, curr) => acc + curr, 0);`,
  },
  python: {
    forLoop: `for item in items:
    print(item)`,
    listComprehension: `squares = [x**2 for x in range(10)]`,
    filter: `evens = list(filter(lambda x: x % 2 == 0, numbers))`,
  },
  react: {
    component: `function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}`,
    useState: `const [count, setCount] = useState(0);`,
    useEffect: `useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code
  };
}, []);`,
  }
};