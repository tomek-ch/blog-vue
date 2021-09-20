import { user } from "@/auth/store";
import { useRouter, watchEffect } from "@nuxtjs/composition-api";

const useGuestRoute = () => {
  const router = useRouter();

  watchEffect(() => {
    if (user.value?._id) {
      router.replace("/");
    }
  });
};

export default useGuestRoute;
