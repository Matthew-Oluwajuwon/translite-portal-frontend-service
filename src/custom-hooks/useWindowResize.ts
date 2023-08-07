/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react"
import { setGlobalKey } from "../store"
import { useAppDispatch } from "../store/hooks"

const useWindowResize = () => {
  const dispatch = useAppDispatch()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Function to update the window width in the state
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth)
  }

  // Attach the event listener when the component mounts
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize)

    if (windowWidth > 768 && windowWidth < 1024) {
      dispatch(setGlobalKey({ key: "menuCollapsed", value: true }))
    }

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [dispatch, windowWidth])
  
  return {windowWidth}
}

export default useWindowResize
