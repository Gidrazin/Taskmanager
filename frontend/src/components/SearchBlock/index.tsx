import SearchBlockItem from "./SearchBlockItem"
import { ConfigProvider } from "antd"
import "./SearchBlock.scss"

const SearchBlock = () => {
  return (
    <div className="search-list">
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
        <SearchBlockItem type={'text'} isDisabled={false} />
        <SearchBlockItem type={'text'} isDisabled={false} />
        <SearchBlockItem type={'text'} isDisabled={false} />
        <SearchBlockItem type={'date'} isDisabled={false} />
        <SearchBlockItem type={'text'} isDisabled={false} />
        <SearchBlockItem type={'number'} isDisabled={false} />
      </ConfigProvider>

    </div>

  )
}

export default SearchBlock