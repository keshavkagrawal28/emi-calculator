import { numberWithCommas } from '../utils/config';

const SliderInput = ({
  title,
  subTitle,
  minValue,
  maxValue,
  state,
  minlabel,
  maxLabel,
  onSliderChange,
}) => {
  return (
    <>
      <span className='title'> {title}</span>
      <span className='title' style={{ textDecoration: 'underline' }}>
        {' '}
        {subTitle}
      </span>

      <div>
        <input
          type='range'
          min={minValue}
          max={maxValue}
          className='slider'
          value={state}
          onChange={onSliderChange}
        ></input>
        <div className='labels'>
          <label>{minlabel}</label>
          <b>{numberWithCommas(state)}</b>
          <label>{maxLabel}</label>
        </div>
      </div>
    </>
  );
};

export default SliderInput;
