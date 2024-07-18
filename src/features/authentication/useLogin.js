import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as LoginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),

    onSuccess: (user) => {
      //   console.log(user);
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLoading };
}
