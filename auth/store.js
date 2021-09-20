import { ref } from "@nuxtjs/composition-api";

const user = ref(null);
const token = ref(null);

const signIn = data => {
  user.value = data.user;
  token.value = data.token;
  localStorage.setItem("token", data.token);
};

const signOut = () => {
  user.value = null;
  token.value = null;
  localStorage.removeItem("token");
};

if (process.client) {
  token.value = localStorage.getItem("token");

  if (token.value)
    fetch(`${process.env.baseUrl}/verify-user`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
      .then(res => res.json())
      .then(data => (user.value = data))
      .catch(signOut);
}

export { user, token, signIn, signOut };
