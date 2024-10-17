import SearchBlockItem from "./SearchBlockItem";
import { ConfigProvider } from "antd";
import "./SearchBlock.scss";
import { SearchItemsType, SearchType } from "../../types";

interface Props {
  isOpen: boolean;
  searchState: SearchType,
  setSearchState: any;
}

const SearchBlock = ({ isOpen, searchState, setSearchState }: Props) => {

  const searchItems: SearchItemsType = [
    {
      field: 'theme',
      type: 'text',
      isDisabled: false
    },
    {
      field: 'title',
      type: 'text',
      isDisabled: true
    },
    {
      field: 'username',
      type: 'text',
      isDisabled: false
    },
    {
      field: 'end',
      type: 'date',
      isDisabled: false
    },
    {
      field: 'report',
      type: 'text',
      isDisabled: true
    },
    {
      field: 'pages',
      type: 'number',
      isDisabled: true
    }
  ];

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
        {
          searchItems.map((item) => (
            <SearchBlockItem
              key={item.field}
              onChangeFunc={(value) => {
                setSearchState((prev: SearchType) => {
                  return {
                    ...prev,
                    [item.field]: value
                  };
                });
              }
              }
              inputValue={searchState[item.field]}
              type={item.type}
              isDisabled={item.isDisabled}
            />
          )
          )
        }
      </ConfigProvider>
    </div>
  );
};

export default SearchBlock;