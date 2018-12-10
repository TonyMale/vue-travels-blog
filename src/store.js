import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedTravels:[],
    user:null,
    loading: false,
    error:null
  },
  getters:{
    user(state){
        return state.user
    },
    userTravels(state){
      return state.loadedTravels.filter(item=>{
        return (item.creatorId === state.user.id || state.user.favouriteTravels.includes(item.id))
      })
    },
    createdTravels(state){
      return state.loadedTravels.filter(item=>{
        return item.creatorId === state.user.id 
      })
    },
    favouriteTravels(state){
      return state.loadedTravels.filter(item=>{
        return  state.user.favouriteTravels.includes(item.id)
      })
    },
    error(state){
      return state.error
    },
    loading(state){
      return state.loading
    },
    travels(state){
      return state.loadedTravels.sort((travelA, travelB)=>{
        return (new Date(travelB.date) - new Date(travelA.date))
      })
    },
    carouselTravels(state){
      return state.loadedTravels.slice(0,5)
    },
    getTravel(state){
      return (travelId)=>{
        return state.loadedTravels.find(travel=>{
          return travel.id === travelId
        })
      }  
    }
  },
  mutations: {
    setLoadedTravels(state,payload){
      state.loadedTravels = payload
    },
    newTravel(state, payload){
      state.loadedTravels.push(payload)
    },
    updateTravel(state, payload){
      const travel = state.loadedTravels.find(travel=>{
        return travel.id === payload.id
      })
      if(payload.title)
        travel.title = payload.title
      if(payload.location)
        travel.location=payload.location
      if(payload.date)
        travel.date=payload.date
      if(payload.description)
        travel.description=payload.description
    },
    deleteTtravel(state, payload){
      const travels = state.loadedTravels
      travels.splice(travels.findIndex(travel=> travel.id===payload),1)
    },
    addFavouriteTravel(state, payload){
      const id = payload.id
      if(state.user.favouriteTravels.findIndex(travelId=> travelId === id) >= 0)
        return
      state.user.favouriteTravels.push(id)
      state.user.fbKeys[id]= payload.fbKeys
    },
    deleteFavouriteTravel(state, payload){
      const favouriteTravels = state.user.favouriteTravels
      favouriteTravels.splice(favouriteTravels.findIndex(travel=> travel.id===payload),1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setUser(state,payload){
        state.user = payload
    },
    setLoading(state,payload){
      state.loading = payload
    },
    setError (state, payload){
      state.error=payload
    },
    clearError(state){
      state.error=null
    }
  },
  actions: {
    //загрузка статей на клиента из firebase
    loadTravels({commit}){
      firebase.database().ref('travels').once('value')
        .then((data)=>{
          const travels = []
          const obj = data.val()
          for(let key in obj){
            travels.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              date: obj[key].date,
              imageUrl: obj[key].imageUrl,
              description: obj[key].description,
              creatorId: obj[key].creatorId,
              creatorName: obj[key].creatorName
            })
          }
          commit('setLoadedTravels', travels)
        })
        .catch(error=>{
          console.log(error)
        })
    },

    //создание новой статьи
    newTravel({commit, getters}, payload){
      const travel = {
        title: payload.title,
        location: payload.location,
        date: payload.date,
        description: payload.description,
        creatorId: getters.user.id,
        creatorName: getters.user.name
      }
      let key
      let imageUrl
      firebase.database().ref('travels').push(travel)
        .then(data=>{
          key= data.key
          return key
        })
        .then(key=>{
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref().child('travels/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData=>{
          return fileData.ref.getDownloadURL()
        })
        .then(url=>{ 
          imageUrl=url
          return firebase.database().ref('travels').child(key).update({imageUrl: imageUrl})
        })
        .then(()=>{
          commit('newTravel',{
            ...travel,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error)=>{
          console.log(error)
        })      
    },
    //регистрация пользователя
    signUserUp({commit}, payload){
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(value => {
          firebase.database().ref('user/' + value.user.uid).child('/userName/').set({userName: payload.name})
          return [{uid: value.user.uid}, {name: payload.name}]
      })
      .then((value)=>{
        commit('setLoading', false)         
          const newUser = {
            id: value[0].uid,
            name: value[1].name,
            favouriteTravels: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
      })
      .catch(
        error =>{
          commit('setLoading', false)
          commit('setError', error)
        })
  },
  //атентификация пользователя
    signUserIn({commit}, payload){
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        value => {
          commit('setLoading', false)      
          const newUser = {
            id: value.user.uid,
            name: '',
            favouriteTravels: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error =>{
          commit('setLoading', false)
          commit('setError', error)
      })
    },
    //редактирование статьи
    updateTravel({commit}, payload){
      commit('setLoading', true)
      const updateObj={}
      updateObj.id = payload.id
      if(payload.title)
        updateObj.title=payload.title
      if(payload.location)
        updateObj.location=payload.location
      if(payload.date)
        updateObj.date=payload.date
      if(payload.description)
        updateObj.description=payload.description
        console.log(updateObj)
      firebase.database().ref('travels').child(payload.id).update(updateObj)
      .then(()=>{
        commit('setLoading', false)
        commit('updateTravel', updateObj)
      })
      .catch((error)=>{
        commit('setLoading', false)
        console.log(error)
      })
    },
    //удление статьи
    deleteTravel({commit}, payload){
      commit('setLoading', true)
      console.log(payload)
      firebase.database().ref('/travels').child(payload).remove()
      .then(()=>{
        commit('setLoading', false)
        commit('deleteTtravel', payload)
      })
      .catch(error=>{
        commit('setLoading', false)
        console.log(error)
      })
    },
    //дабовление к себе понравившейся статьи
    addFavouriteTravel({commit, getters}, payload){
      commit('setLoading', true)
      const user= getters.user
      firebase.database().ref('/user/' + user.id).child('/favourites/').push(payload)
      .then(data=>{
        commit('setLoading', false)
        commit('addFavouriteTravel', {id: payload, fbKeys: data.key})
      })
      .catch((error)=>{
        commit('setLoading', false)
        console.log(error)
      })
    },
    //удаление понравишейся статьи
    deleteFavouriteTravel({commit, getters}, payload){
      commit('setLoading', true)
      const user= getters.user
      if(!user.fbKeys)
        return
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/user/' + user.id + 'favourites').child(fbKey).remove()
      .then(()=>{
        commit('setLoading', true)
        commit('deleteFavouriteTravel', payload)
      })
      .catch(error=>{
        commit('setLoading', false)
        console.log(error)
      })
    },
    clearError({commit}){
      commit('clearError')
    },
    //автоаутинфикация 
    autoSignin({commit}, payload){
      commit('setUser', {id: payload.uid, favouriteTravels: [], fbKeys: {}})
    },
    //загрузка данных пользователя
    fetchUserData({commit,getters}){
      commit('setLoading',true)
      firebase.database().ref("/user/" + getters.user.id).once('value')
      .then((data)=>{
        const value = data.child("/favourites/").val()
        const creatorName = data.child("/userName/").val().userName
        let favouriteTravels = [];
        let fbKeys = [];
        for(let key in value){
          favouriteTravels.push(value[key])
          fbKeys[value[key]]= key
        }
        const updateUser={
          id: getters.user.id,
          name: creatorName,
          favouriteTravels: favouriteTravels,
          fbKeys: fbKeys
        }
        commit('setLoading', false)
        commit('setUser', updateUser)
      })
      .catch(error=>{
        commit('setLoading', false)
        console.log(error)
      })
    },
    logout({commit}, payload){
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
})
