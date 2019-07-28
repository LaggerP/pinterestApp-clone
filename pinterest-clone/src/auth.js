import firebase from './firebase';

const auth = {
    
    autenticado: false,
    user: (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null,
    login(userData, cb){
        firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then(a => {
            if(a.operationType){
                const {user} = a
                if(user){
                    console.log(user)
                    this.autenticado = true
                    this.user = user
                    localStorage.setItem('user', JSON.stringify(this.user))
                    cb()
                }
            }else{
                console.log('no funciono')
            }
        })
        .catch(error => console.log(error))
    },
    logout(cb){
        this.autenticado = false
        this.user = null
        localStorage.removeItem('user')
        cb()
    },
    isAuthenticated(){
        if (localStorage.getItem('user')) {
            this.authenticated = true;
            return this.authenticated;
          } else {
            this.authenticated = false;
            return this.authenticated;
          }
    },
    register(userData, cb){
        firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
            .then(a => {
                firebase.auth().currentUser.sendEmailVerification().then(function(){
                    console.log('se envio la confirmacion por email')
                    cb()
                })
            })
            .catch(error => console.log(error))
    }
 }
 export default auth
 