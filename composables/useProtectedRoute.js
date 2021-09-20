import { user } from "@/auth/store";
import { useRouter, watchEffect } from "@nuxtjs/composition-api";

const useProtectedRoute = () => {
  const router = useRouter();

  watchEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  });
};

export default useProtectedRoute;
