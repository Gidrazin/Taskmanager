import { DatePicker, Input, InputNumber, Tooltip } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";
import { SearchFieldType } from "../../../types";

interface Props {
  isDisabled: boolean;
  type: SearchFieldType;
  onChangeFunc: (value: string) => void;
  inputValue: string;
}

const SearchBlockItem = ({ isDisabled, type, onChangeFunc, inputValue }: Props) => {
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
              <Input onChange={(e) => { onChangeFunc(e.target.value); }} value={inputValue ? inputValue : ''} disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" />
          )
        }
        {
          type === 'number' &&
          (
            isDisabled ?
              <Tooltip title="Поиск не доступен">
                <InputNumber type="number" min={0} disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" />
              </Tooltip> :
              <InputNumber onChange={(value) => {
                if (value) {
                  onChangeFunc(String(value));
                } else {
                  onChangeFunc('');
                }
              }} value={inputValue === '' ? null : +inputValue} type="number" min={0} disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" />
          )
        }
        {
          type === 'date' &&
          (
            isDisabled ?
              <Tooltip title="Поиск не доступен">
                <DatePicker disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" locale={locale} format="DD-MM-YYYY" />
              </Tooltip> :
              <DatePicker onChange={(date) => {
                if (!date) {
                  onChangeFunc('');
                } else {
                  const d = dayjs(date).date() < 10 ? '0' + String(dayjs(date).date()) : dayjs(date).date();
                  const m = (dayjs(date).month() + 1) < 10 ? '0' + String(dayjs(date).month() + 1) : dayjs(date).month() + 1;
                  const y = String(dayjs(date).year());
                  onChangeFunc(`${d} ${m} ${y}`);
                }

              }} disabled={isDisabled} placeholder="Поиск" size="small" width={'100%'} className="search-item__input" locale={locale} format="DD-MM-YYYY" />
          )
        }
      </div>
    </div>
  );
};

export default SearchBlockItem;