const TextInput = ({
  title,
  state,
  setState,
  minValue = Number.MIN_VALUE,
  maxValue = 100,
}) => {
  return (
    <>
      <span className='title'> {title}</span>
      <input
        type='number'
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
      ></input>
    </>
  );
};

export default TextInput;
