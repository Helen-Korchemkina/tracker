import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { addTimer } from "redux/slice";

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
          <Form>
        <label>
          <Field type="text" name="trackerName"/>
        </label>
        <button type="submit">Enter</button>
      </Form>
      </Formik>
)
}

export default TrackerForm;