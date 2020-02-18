import { ToastProgrammatic as Toast } from 'buefy'

export default {
  actions: {
    async login({commit}, {email, password}) {
      function findUser(data) {
        const prop = data.find(item => item.email == email);
        if (prop.password == password) {
          Toast.open({
            message: `Добро пожаловать ${prop.name}`,
            type: "is-success",
          });
          const dataUser = {};
          for (let key in prop) {
            if (key != "password"){
              dataUser[key] = prop[key];
            }
          }


          document.cookie = `id=${dataUser.id}; path=/; expires=3600`;

          commit("setRole", dataUser);
        } else {
          Toast.open({
            message: "Неверные данные",
            type: "is-danger",
          })
          throw new Error("Неверные данные");
        }
      }

      try {
        await fetch("http://localhost:3000/users")
          .then(response => response.json())
          .then(data => findUser(data))

      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async register({dispatch, commit}, dataUser) {
      try {
        const userList = await dispatch("getUsers").then(data => data)
        let userLastId = userList[userList.length - 1].id;

        dataUser.id = userLastId+1;

        await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataUser),
        });
        const loginData = {email: dataUser.email, password: dataUser.password}
        await dispatch("login", loginData)
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async getUsers({commit}) {
      try {
        return await fetch("http://localhost:3000/users")
          .then(response => response.json())
      } catch (error) {
          commit("setError", error);
          throw error;
      }
    },
    async getData({dispatch, commit}) {
      function getUser(data, id) {
        const user = data.find(item => item.id == id);
        const dataUser = {};
        for (let key in user) {
          if (key != "password"){
            dataUser[key] = user[key];
          }
        }

        return dataUser;
      }

      if (document.cookie.includes("id")) {
        let userId = document.cookie.substr(document.cookie.indexOf("=")+1, document.cookie.length);
        try {
          await dispatch("getUsers")
            .then(data => getUser(data, userId))
            .then(user => commit("setRole", user))

        } catch (error) {
            commit("setError", error);
            throw error;
        }
      }
    },
    async logout({commit}) {
        document.cookie = "id=; max-age=-1";
        Toast.open({
          message: "Вы вышли из аккаунта",
          type: "is-success",
        })
        commit("clearRole");
    },
}
}
