import { Tooltip } from "antd";
import "./FilterCheckbox.scss";

interface Props {
  value: boolean
  type: 'done' | 'announced' | 'inProgress'
  onClick: any
}

const FilterCheckbox = ({
  value,
  type,
  onClick
}: Props) => {
  const typeObject = {
    'done': {
      baseImg: process.env.PUBLIC_URL + '/images/hex-done-filter.svg',
      checkImg: process.env.PUBLIC_URL + '/images/check-icon-blue.svg'
    },
    'announced':
    {
      baseImg: process.env.PUBLIC_URL + '/images/hex-announced-filter.svg',
      checkImg: process.env.PUBLIC_URL + '/images/check-icon-white.svg'
    },
    'inProgress': {
      baseImg: process.env.PUBLIC_URL + '/images/hex-inProgress-filter.svg',
      checkImg: process.env.PUBLIC_URL + '/images/check-icon-white.svg'
    }
  }
  return (
    <Tooltip placement="top" title={
      (type === 'done' && 'Работа завершена')
      || (type === 'announced' && 'Работа создана')
      || (type === 'inProgress' && 'В работе...')
    }>
      <div onClick={onClick}>
        <div className="checkboxItem">
          <img className="checkboxImgBase" src={typeObject[type].baseImg} alt="filter" />
          {value && <img className="checkboxImgCheck" src={typeObject[type].checkImg} alt="filter" />}
        </div>
      </div>
    </Tooltip>
  );
};
export default FilterCheckbox;
