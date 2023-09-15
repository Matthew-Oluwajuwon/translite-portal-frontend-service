/* eslint-disable prettier/prettier */

import { PageModal } from "@common/components/modal"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import useToggle from "../../../custom-hooks/useToggle";

const AddProcessor: React.FC = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => {
        return state.global
    });
    
    const { toggleFormModal } = useToggle()
  return (
    <PageModal openModal={state.showFormModal} handleCancel={() => toggleFormModal(false)} centered modalFooter={false}>
        {state.action === "CREATE" ? "New" : "Update"}
    </PageModal>
  )
}

export default AddProcessor
