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
        colorItemBgSelected: "#6D71F9",
        colorItemTextSelected: "#ffffff",
        colorItemText: "#94A0B4",
        colorSubItemBg: "#6D71F9",
        colorItemTextHover: "#ffffff",
        controlHeightLG: 55,
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
