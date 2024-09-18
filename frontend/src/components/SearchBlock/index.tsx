import SearchBlockItem from "./SearchBlockItem";
import { ConfigProvider, theme } from "antd";
import "./SearchBlock.scss";
import { SearchType } from "../../types";
import { title } from "process";

interface Props {
  isOpen: boolean;
  searchState: SearchType,
  setSearchState: any;
}

const SearchBlock = ({ isOpen, searchState, setSearchState }: Props) => {
  return (
    <div className={`search-list ${isOpen ? 'isOpen' : ''}`}>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 0,
            },
            DatePicker: {
              presetsMaxWidth: 300,
            },
          },
          token: {
            fontFamily: "Jura Bold",
            borderRadius: 0,
            colorPrimary: "#000120",
            colorLink: "#000120",
            colorLinkHover: "rgba(0, 1, 32, 0.5)",
            colorBorder: "#000120",
          },
        }}
      >
        <SearchBlockItem
          onChangeFunc={(e) => {
            setSearchState((prev: SearchType) => {
              return {
                ...prev,
                theme: e.target.value
              };
            });
          }}
          inputValue={searchState.theme}
          type={'text'}
          isDisabled={false}
        />
        <SearchBlockItem
          onChangeFunc={(e) => {
            setSearchState((prev: SearchType) => {
              return {
                ...prev,
                title: e.target.value
              };
            });
          }}
          inputValue={searchState.title}
          type={'text'}
          isDisabled={false}
        />
        <SearchBlockItem
          onChangeFunc={(e) => {
            setSearchState((prev: SearchType) => {
              return {
                ...prev,
                username: e.target.value
              };
            });
          }}

          inputValue={searchState.username}
          type={'text'}
          isDisabled={false}
        />
        {/* <SearchBlockItem searchState={searchState} setSearchState={setSearchState} type={'date'} isDisabled={false} /> */}
        <SearchBlockItem
          onChangeFunc={(e) => {
            setSearchState((prev: SearchType) => {
              return {
                ...prev,
                report: e.target.value
              };
            });
          }}

          inputValue={searchState.report}
          type={'text'}
          isDisabled={false}
        />
        {/* <SearchBlockItem searchState={searchState} setSearchState={setSearchState} type={'number'} isDisabled={false} />  */}
      </ConfigProvider>

    </div>

  );
};

export default SearchBlock;