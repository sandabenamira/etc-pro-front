 import { getUsersProfiles } from "../../../../src/store/actions/Auth";
import { useDispatch ,useSelector} from "react-redux";

import  { useState, useEffect } from "react";


export default function Index(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(getUsersProfiles());
  }, []);
   console.log("get profile : ", data);

  return (
    <div>
      <h1> module profile</h1>
    </div>
  );
}
