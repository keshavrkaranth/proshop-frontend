import {
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
} from "../constants";
import axios from "axios";
import BACKEND_URL from "../constants"
import {toast} from "react-toastify";
import {ORDER_LIST_MY_RESET} from "../constants";




export const login = (email,password) =>async (dispatch) =>{
  try {
    dispatch({
      type:USER_LOGIN_REQUEST
    })
    const config = {
      header:{
        'Content-Type':'application/json'
      }
    }
    const {data} = await axios.post(`${BACKEND_URL}/users/login/`,
    {'username':email,'password':password},
    config
    )

    dispatch({
      type:USER_LOGIN_SUCCESS,
      payload:data
    })

    localStorage.setItem('userInfo',JSON.stringify(data))


  }catch (error){
    dispatch({
      type:USER_LOGIN_FAIL ,
      payload:error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const logout = () =>(dispatch)=>{
  localStorage.removeItem('userInfo')
  dispatch({
    type:USER_LOGOUT
  })
  dispatch({
    type:USER_DETAILS_RESET
  })
  dispatch({
    type:ORDER_LIST_MY_RESET
  })

  dispatch({
    type:USER_LIST_RESET
  })



}


export const register = (name,email,password) =>async (dispatch) =>{
  try {
    dispatch({
      type:USER_REGISTER_REQUEST
    })
    const config = {
      header:{
        'Content-Type':'application/json'
      }
    }
    const {data} = await axios.post(`${BACKEND_URL}/users/register/`,
      {'name':name,'email':email,'password':password},
      config
    )

    dispatch({
      type:USER_REGISTER_SUCCESS,
      payload:data
    })

    dispatch({
      type:USER_LOGIN_SUCCESS ,
      payload:data
    })

    localStorage.setItem('userInfo',JSON.stringify(data))


  }catch (error){
    dispatch({
      type:USER_REGISTER_FAIL ,
      payload:error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}



export const getUserDetails = (id) =>async (dispatch,getState) =>{
  try {
    dispatch({
      type:USER_DETAILS_REQUEST
    })

    const {
      userLogin:{userInfo},
    } = getState()

    const config = {
      method: 'get',
      url: `${BACKEND_URL}/users/${id}/`,
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      }
    };

    axios(config)
      .then(function (response) {
        dispatch({
          type:USER_DETAILS_SUCCESS,
          payload:response.data
        })

      })
      .catch(function (error) {
        dispatch({
          type:USER_DETAILS_FAIL ,
          payload:error.response && error.response.data.message ? error.response.data.message : error.message,
        })
      });

  }catch (error){
    dispatch({
      type:USER_DETAILS_FAIL ,
      payload:error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}



export const updateUserProfile = (user) => {
  const config = {
    method: 'put',
    url: `${BACKEND_URL}/users/profile/update\n`,
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/json'
    },
    data: user
  };

  axios(config)
    .then(function (response) {
      toast.success("Profile Updated",{position:toast.POSITION.TOP_RIGHT})
      localStorage.setItem("userInfo",JSON.stringify(response.data))
    })
    .catch(function (error) {
      toast.error(error,{position:toast.POSITION.TOP_RIGHT})
    });

}


export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `${BACKEND_URL}/users/`,
      config
    )

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete(
      `${BACKEND_URL}/users/delete/${id}/`,
      config
    )

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}


export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `${BACKEND_URL}/users/update/${user._id}/`,
      user,
      config
    )

    dispatch({
      type: USER_UPDATE_SUCCESS,
    })

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}