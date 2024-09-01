import { DatePicker, Input, InputNumber, Tooltip } from "antd"

interface Props {
  isDisabled: boolean
  type: 'text' | 'number' | 'date'
}

const SearchBlockItem = ({ isDisabled, type }: Props) => {
  return (
    <div className="search-item">
      <div className="input-wrapper">
        {
          type === 'text' &&
          (
            isDisabled ?
              <Tooltip title="Поиск не доступен">
                <Input disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" />
              </Tooltip> :
              <Input disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" />
          )
        }
        {
          type === 'number' &&
          (
            isDisabled ?
              <Tooltip title="Поиск не доступен">
                <InputNumber min={0} disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" />
              </Tooltip> :
              <InputNumber min={0} disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" />
          )
        }
        {
          type === 'date' &&
          (
            isDisabled ?
              <Tooltip title="Поиск не доступен">
                <DatePicker disabled={isDisabled} placeholder="Поиск" size="small"  width={'100%'} className="search-item__input" />
              </Tooltip> :
              <DatePicker disabled={isDisabled} placeholder="Поиск" size="small"  width={'100%'} className="search-item__input" />
          )
        }
      </div>
    </div>
  )
}

export default SearchBlockItem