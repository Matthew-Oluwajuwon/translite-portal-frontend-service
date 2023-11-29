/* eslint-disable prettier/prettier */
import { ThemeConfig } from "antd"

export const getThemeConfig = (): ThemeConfig | undefined => {
  return {
    token: {
      colorPrimary: "#4C469B",
    },
    components: {
      Table: {
        colorText: "#000000",
        colorFillAlter: "#F5F6FA",
      },
      Menu: {
        itemSelectedBg: "#6D71F9",
        itemSelectedColor: "#ffffff",
        itemColor: "#94A0B4",
        itemHoverColor: "#ffffff",
        controlHeightLG: 55,
        subMenuItemBorderRadius: 20,
        lineWidth: 0,
      },
      DatePicker: {
        colorBgContainer: "#ffffff",
        colorText: "#424D61"
      },
      Select: {
        colorBgContainerDisabled: "#F5F6FA",
        colorBorder: "none",
        colorTextDisabled: "#272848",
        lineWidthFocus: 0,
        controlOutlineWidth: 0
      }
    },
  }
}
