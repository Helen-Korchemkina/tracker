import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { addTimer } from "redux/slice";
import { AiOutlineCaretRight } from "react-icons/ai";
import s from './TrackerForm.module.css';

import moment from "moment";

const TrackerForm = () => {

  const dispatch = useDispatch();
   
  const handleSubmit = ({ trackerName }, { resetForm }) => {
   
    if (!trackerName) {
      dispatch(addTimer(moment(Date.now()).format('LL')));
      return;
    }
    dispatch(addTimer(trackerName));
    resetForm();
  }


  return (
      <Formik initialValues={{trackerName: ''}} onSubmit={handleSubmit}>
          <Form className={s.form}>
        <label>
          <Field type="text" name="trackerName" className={s.input} />
        </label>
        <button type="submit" className={s.btn}><AiOutlineCaretRight color="white" className={s.icon} /></button>
      </Form>
      </Formik>
)
}

export default TrackerForm;