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
        subMenuItemBg: "#6D71F9",
        itemHoverColor: "#ffffff",
        controlHeightLG: 55,
        radiusSubMenuItem: 20
      },
      Radio: {
        colorPrimary: "#6D71F9",
      },
      Select: {
        controlHeight: 40,
      },
    },
  }
}
