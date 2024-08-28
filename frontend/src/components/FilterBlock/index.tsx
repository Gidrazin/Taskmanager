import FilterCheckbox from "../FilterCheckbox"
import { Search } from "lucide-react"
import './FilterBlock.scss'

interface Props {
  doneFilter: boolean
  announcedFilter: boolean
  inProgressFilter: boolean
  setDoneFilter: any
  setAnnouncedFilter: any
  setInProgressFilter: any
}

const FilterBlock = ({
  doneFilter,
  announcedFilter,
  inProgressFilter,
  setDoneFilter,
  setAnnouncedFilter,
  setInProgressFilter
}: Props) => {
  return (
    <div className="filterBlock">
      <div className="filterBlock__wrapper">
        <div className="filterBlock__title">Фильтр</div>
        <div className="filterBlock__btns">
          <div className="filterBlock__checkboxList">
            <FilterCheckbox
              onClick={() => { setDoneFilter(!doneFilter) }}
              value={doneFilter}
              type="done"
            />
            <FilterCheckbox
              onClick={() => { setAnnouncedFilter(!announcedFilter) }}
              value={announcedFilter}
              type="announced"
            />
            <FilterCheckbox
              onClick={() => { setInProgressFilter(!inProgressFilter) }}
              value={inProgressFilter}
              type="inProgress"
            />
          </div>
          <span className="decor-line"></span>
          <button className="filterBlock__searchBtn">
            <Search color="#0e1c49" size={30} />
          </button>
        </div>
      </div>
    </div>
  )

}

export default FilterBlock