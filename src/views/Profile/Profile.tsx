/* eslint-disable prettier/prettier */

import { useAppSelector } from "../../store/hooks"
import { BREADCRUMB, MENU_KEYS, MENU_NAMES } from "../../common/constants"
import { Col, Form, Input, Row, Typography } from "antd"
import Log from "../../assets/icons/Logout.svg"
import { Logout } from "../../common/components/logout"
import useToggle from "../../custom-hooks/useToggle"
import useUserInfo from "../../custom-hooks/useUserInfo"
import usePageInfo from "../../custom-hooks/usePageInfo"

const Profile: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })
  
  usePageInfo(
    MENU_NAMES.PROFILE,
    MENU_KEYS.PROFILE,
    BREADCRUMB.PROFILE,
  )

  const { toggleLogoutModal, handleLogout } = useToggle()
  const [userInfo] = useUserInfo()

  return (
    <div>
      {state.showLogoutModal && (
        <Logout
          openModal={state.showLogoutModal}
          onCancel={toggleLogoutModal}
          onClick={handleLogout}
        />
      )}
      <div className="grid grid-rows-[10rem_1fr] gap-7">
        <div className="bg-white rounded-md flex items-center justify-between gap-5 px-3 lg:px-10">
          <div className="flex items-center gap-5">
            <span className="bg-[#79CDCE] w-[5rem] h-[5rem] text-xl text-[#ffffff] rounded-full flex items-center justify-center">
              {userInfo.firstName?.toUpperCase().charAt(0)}
              {userInfo.lastName?.toUpperCase().charAt(0)}
            </span>
            <div>
              <h1 className="text-[#272848]">
                {userInfo.firstName + " " + userInfo.lastName}
              </h1>
              <Typography.Paragraph
                className="text-[#8A92A6] font-medium text-[0.8rem]"
                ellipsis
              >
                {userInfo.email}
              </Typography.Paragraph>
            </div>
          </div>
          <div>
            <button
              onClick={toggleLogoutModal}
              className="flex items-center justify-center gap-1 py-3 px-3 rounded-md text-[#FF291F] bg-[#FFF0F4] cursor-pointer hover:shadow-md hover:scale-110 transition-all text-[0.8rem]"
            >
              <img src={Log} alt="logout" />
              <p className="hidden md:block">Log Out</p>
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
            fields={[
              {
                name: "username",
                value: userInfo.firstName + " " + userInfo.lastName,
              },
              {
                name: "email",
                value: userInfo.email,
              },
              {
                name: "role",
                value: "Admin",
              },
              {
                name: "phoneNumber",
                value: "0902345678",
              },
            ]}
          >
            <Row style={{ width: "100%" }}>
              <Col xs={24} md={14}>
                <Form.Item label="Username" name={"username"}>
                  <Input className="py-5" readOnly />
                </Form.Item>
              </Col>
              <Col xs={24} md={14}>
                <Form.Item label="Role" name={"role"}>
                  <Input className="py-5" readOnly />
                </Form.Item>
              </Col>
              <Col xs={24} md={14}>
                <Form.Item label="Email Address" name={"email"}>
                  <Input className="py-5" readOnly />
                </Form.Item>
              </Col>
              <Col xs={24} md={14}>
                <Form.Item label="Contact Number" name={"phoneNumber"}>
                  <Input className="py-5" readOnly />
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
