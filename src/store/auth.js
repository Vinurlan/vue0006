import { ToastProgrammatic as Toast } from 'buefy'

export default {
  actions: {
    async login({commit}, {email, password}) {
        function findUser(data) {
          const prop = data.find(item => item.email == email);
          if (prop.password == password) {
            Toast.open({
              message: `Добро пожаловать ${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}`,
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
    // async register({dispatch, commit}, {email, password, name}) {
    //     try {
    //         await firebase.auth().createUserWithEmailAndPassword(email, password)
    //         const uid = await dispatch("getUid");
    //         await firebase.database().ref(`/users/${uid}/info`).set({
    //             bill: 100000,
    //             name,
    //         })
    //     } catch (error) {
    //         commit("setError", error);
    //         throw error;
    //     }
    // },
    async getData({commit}) {
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
          await fetch("http://localhost:3000/users")
            .then(response => response.json())
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
