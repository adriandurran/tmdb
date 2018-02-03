import axios from 'axios';

export const fetchUser = async userId => {
  const res = await axios.get(`/api/users/${userId}`);
  console.log(res);
  return res.data;
};
