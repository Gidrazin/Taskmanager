import FilterCheckbox from "../FilterCheckbox";
import { Search } from "lucide-react";
import './FilterBlock.scss';
import { Tooltip } from "antd";

interface Props {
  doneFilter: boolean;
  announcedFilter: boolean;
  inProgressFilter: boolean;
  setDoneFilter: any;
  setAnnouncedFilter: any;
  setInProgressFilter: any,

  setOpenSearchState: any,
  openSearchState: any,
}

const FilterBlock = ({
  doneFilter,
  announcedFilter,
  inProgressFilter,
  setDoneFilter,
  setAnnouncedFilter,
  setInProgressFilter,
  setOpenSearchState,
  openSearchState,
}: Props) => {
  return (
    <div className="filterBlock">
      <div className="filterBlock__wrapper">
        <div className="filterBlock__title">Фильтр</div>
        <div className="filterBlock__btns">
          <div className="filterBlock__checkboxList">
            <FilterCheckbox
              onClick={() => { setDoneFilter(!doneFilter); }}
              value={doneFilter}
              type="done"
            />
            <FilterCheckbox
              onClick={() => { setAnnouncedFilter(!announcedFilter); }}
              value={announcedFilter}
              type="announced"
            />
            <FilterCheckbox
              onClick={() => { setInProgressFilter(!inProgressFilter); }}
              value={inProgressFilter}
              type="inProgress"
            />
          </div>
          <span className="decor-line"></span>
          <Tooltip title="Поиск">
            <button
              onClick={() => {
                setOpenSearchState((prev: any) => {
                  return { ...prev, isOpen: !prev.isOpen };
                });
              }
              }
              className="filterBlock__searchBtn"
              disabled={openSearchState.isSearchStateNotEmpty}
            >
              {
                openSearchState.isSearchStateNotEmpty
                  ? <Search color="#6f6d72" size={30} />
                  : <Search color="#0e1c49" size={30} />
              }
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );

};

export default FilterBlock;