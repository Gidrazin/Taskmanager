import { DatePicker, Input, InputNumber, Tooltip } from "antd"
import locale from "antd/es/date-picker/locale/ru_RU";

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
                <InputNumber type="number" min={0} disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" />
              </Tooltip> :
              <InputNumber type="number" min={0} disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" />
          )
        }
        {
          type === 'date' &&
          (
            isDisabled ?
              <Tooltip title="Поиск не доступен">
                <DatePicker disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" locale={locale} format="DD-MM-YYYY" />
              </Tooltip> :
              <DatePicker disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" locale={locale} format="DD-MM-YYYY" />
          )
        }
      </div>
    </div>
  )
}

export default SearchBlockItem