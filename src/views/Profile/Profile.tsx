/* eslint-disable prettier/prettier */

import { useLayoutEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setAllGlobalKey } from "../../store"
import { BREADCRUMB, MENU_KEYS, MENU_NAMES } from "../../common/constants"
import { Col, Form, Input, Row, Typography } from "antd"
import Log from "../../assets/icons/Logout.svg"
import { Logout } from "../../common/components/logout"
import useToggle from "../../custom-hooks/useToggle"

const Profile: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  useLayoutEffect(() => {
    document.title = MENU_NAMES.PROFILE + " | Translite"
    dispatch(
      setAllGlobalKey({
        ...state,
        selectedKey: MENU_KEYS.PROFILE,
        pageTitle: MENU_NAMES.PROFILE,
        breadcrumb: BREADCRUMB.PROFILE,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const { toggleLogoutModal } = useToggle()

  return (
    <div>
      {state.showLogoutModal && (
        <Logout
          openModal={state.showLogoutModal}
          onCancel={toggleLogoutModal}
        />
      )}
      <div className="grid grid-rows-[10rem_1fr] gap-7">
        <div className="bg-white rounded-md flex items-center justify-between gap-5 px-3 lg:px-10">
          <div className="flex items-center gap-5">
            <span className="bg-[#79CDCE] w-[5rem] h-[5rem] text-xl text-[#ffffff] rounded-full flex items-center justify-center">
              JA
            </span>
            <div>
              <h1 className="text-[#272848]">Jeremiah Ayeni</h1>
              <Typography.Paragraph
                className="text-[#8A92A6] font-medium text-[0.8rem]"
                ellipsis
              >
                jeremiahayeni@translite.com
              </Typography.Paragraph>
            </div>
          </div>
          <div className="hidden md:block">
            <button
              onClick={toggleLogoutModal}
              className="flex items-center justify-center gap-1 py-3 px-3 rounded-md text-[#FF291F] bg-[#FFF0F4] cursor-pointer hover:shadow-md hover:scale-110 transition-all text-[0.8rem]"
            >
              <img src={Log} alt="logout" />
              Log Out
            </button>
          </div>
        </div>
        <div className="bg-white rounded-md p-3 sm:p-10">
          <h1 className="text-[#272848] text-xl font-semibold">
            Profile Information
          </h1>
          <Form
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="my-10 px-3 lg:px-10"
          >
            <Row style={{ width: "100%" }}>
              <Col xs={24} md={14}>
                <Form.Item label="Username" name={"username"}>
                  <Input placeholder="Jeremiah.Ayeni" className="py-5" />
                </Form.Item>
              </Col>
              <Col xs={24} md={14}>
                <Form.Item label="Role" name={"role"}>
                  <Input placeholder="TRANSLITE_ADMIN" className="py-5" />
                </Form.Item>
              </Col>
              <Col xs={24} md={14}>
                <Form.Item label="Email Address" name={"email"}>
                  <Input
                    placeholder="Jeremiah.Ayeni@translite.com"
                    className="py-5"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={14}>
                <Form.Item label="Contact Number" name={"phoneNumber"}>
                  <Input placeholder="09123456789" className="py-5" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Profile
