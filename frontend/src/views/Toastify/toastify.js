import { toast } from "react-toastify";

export const notification = (text, where) => {
  toast.info(text, { position: where, autoClose: 3000 });
};
