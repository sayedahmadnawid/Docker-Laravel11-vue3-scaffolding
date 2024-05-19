
import store from "@/store/index.js";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
    store.dispatch("logout").then(() => {
      router.push({
        name: "Login",
      });
    });
}

export default function useLogout() {
    const router = useRouter(); // Vue Router
  
    return { logout };
  }