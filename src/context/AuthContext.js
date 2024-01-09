import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import authConfig from 'src/configs/auth'

const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const DB_NAME = process.env.NEXT_PUBLIC_DATABASE;
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SAP_USER = process.env.NEXT_PUBLIC_USER_SAP ? process.env.NEXT_PUBLIC_USER_SAP : "SAP038";
const SAP_PASS = process.env.NEXT_PUBLIC_PASSWORD_SAP ? process.env.NEXT_PUBLIC_PASSWORD_SAP : "crm123";

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {

  const router = useRouter()

  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  const handleOnClearLocalHost = () => {
    window.localStorage.removeItem('rememberToken')
    window.localStorage.removeItem('refreshToken')
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('CREDENTIALS')
    window.localStorage.removeItem('userDetails')
    sessionStorage.removeItem('authUser')
  }

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)

      const storedToken = window.localStorage.getItem("rememberToken")
      const CREDENTIALS = window.localStorage.getItem("CREDENTIALS")
      let userData=JSON.parse(window.localStorage.getItem("userDetails"));

      if (storedToken && CREDENTIALS && userData) {
        
        let user={
          id: 1,
          role: 'admin',
          username:userData.document.records[0].U_UserName,
          jobTitle:userData.document.records[0].U_Desgination
        }

        setUser(user);
        setLoading(false)

        // router.replace('/home');
      } else {
        setLoading(false)
        handleOnClearLocalHost()
      }
    }
    initAuth()
  }, [])

  const handleLogin = (params, errorCallback) => {

    const { email, password, rememberMe } = params;

    const UserDetails = {
      "Email": email,
      "Password": password
    }

    const rememberToken = btoa(JSON.stringify(UserDetails));

    // const loginApi = `${API_BASE_URL}/api/User/filter`;
    const loginApi= `http://51.38.17.25:6543/v1/api/User/filter`
    

    // const USERNAME = `{"UserName":"${SAP_USER}","CompanyDB":"${DB_NAME}"}`;
    // const PASSWORD = SAP_PASS


    
    var myHeaders = new Headers();
            myHeaders.append(
              "Authorization",
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsIkN1c3RvbU9iamVjdENhbkJlQWRkZWRIZXJlIl0sIm5iZiI6MTY3ODg3OTkyMiwiZXhwIjoxNzEwNDE1OTIyLCJpYXQiOjE2Nzg4Nzk5MjJ9.BNaH8gYlpLBwfFYR2EnTyxPN3kPTmjpWrlc4OFFtwC0"
            );
            myHeaders.append("Content-Type", "application/json");
      
            // Call the first API to get user filter data
            fetch(`${loginApi}`, {
              method: "POST",
              headers: myHeaders,
              body: JSON.stringify([
                {
                  ColumnName: "T0.U_UserName",
                  ColumnValue: email,
                },
                {
                  ColumnName: "T0.U_WebPassword",
                  ColumnValue: password,
                },
              ]),
            })
              .then((response) => response.json())
              .then((data) => {
              // alert(data.code);
              // toast.success(data.code);
              if (data.code == 1) {
                window.localStorage.setItem("userDetails", JSON.stringify(data));
                const UserName = "manager"; //data.document.records[0].USER_CODE;
                const Password = "Euph0r0s@9"; //data.document.records[0].U_SAPPW;
    
                // const username = JSON.stringify({ UserName: UserName, CompanyDB: 'StanleyGrpGoLive' });
                const username = JSON.stringify({
                  UserName: UserName,
                  CompanyDB: "GoLiveDB-Demo",
                });
                const password = Password;
                const authString = `${username}:${password}`;
                const base64AuthString = btoa(authString);
                const authHeader = `Basic ${base64AuthString}`;

                // Call the second API
                // fetch("http://51.38.17.27:50001/b1s/v1/Login()", {
                fetch("http://51.38.17.25:50001/b1s/v1/Login()", {
                  method: "GET",
                  headers: {
                    Authorization: authHeader,
                    "Content-Type": "application/json",
                  },
                })
    
                  .then((response) => {
                    if (response.status === 401) {
                      alert("Issue in login flow, please try later!");
                      throw new Error("401 Unauthorized");
                    } else {
                      return response.json();
                    }
                  })
                  .then((res) => {
                    console.log(JSON.stringify(res.SessionId, "response"));
                    sessionStorage.setItem("authUser", JSON.stringify(res));
                    params.rememberMe ? window.localStorage.setItem("CREDENTIALS", base64AuthString) : null
                    params.rememberMe ? window.localStorage.setItem("rememberToken", rememberToken) : null
                    params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(res)) : null
                    
                    let user={
                      id: 1,
                      role: 'admin',
                      username:data.document.records[0].U_UserName,
                      jobTitle:data.document.records[0].U_Desgination
                    }

                    setUser(user);
                    setLoading(false)
                    router.replace('/home');
                    
                  })
                  .catch((error) => {
                    console.error("Error calling second API", error);
                  });
              } else {
                alert(
                  "Credential not matching with our records,  please check!"
                );
              }
            })
            .catch((error) => {
              // Handle errors from the first API call
              console.error("Error calling first API", error);
            });

    // let config = {
    //   method: 'POST',
    //   url: loginApi,
    //   headers: {
    //     Authorization: 'Bearer ' + token,
    //     'Content-Type': 'application/json'
    //   }
    // }
    // axios
    //   .request(config)
    //   .then(async response => {
    //     console.log(response);
    //     // const jsonArray = response.data.value[0];

    //     // const { EmployeeID, Picture, FirstName, Department, U_E1_SAPID, U_E1_SAPPwd, U_E1_Password, U_E1_Username, JobTitle, U_E1_Whse } = jsonArray

    //     // const userdata = {
    //     //   id: 1,
    //     //   role: 'admin',
    //     //   password: U_E1_Password,
    //     //   fullName: FirstName,
    //     //   username: FirstName,
    //     //   email: U_E1_Username,
    //     //   wareHouse: U_E1_Whse,
    //     //   employeeID: EmployeeID,
    //     //   department: Department,
    //     //   picture: Picture,
    //     //   jobTitle: JobTitle,
    //     // }

    //     // const USERNAME = `{"UserName":"${U_E1_SAPID}","CompanyDB":"${DB_NAME}"}`;
    //     // const PASSWORD = U_E1_SAPPwd

    //     // const CREDENTIALS = btoa(USERNAME + ':' + PASSWORD);

    //     // params.rememberMe ? window.localStorage.setItem("CREDENTIALS", CREDENTIALS) : null
    //     // params.rememberMe ? window.localStorage.setItem("rememberToken", rememberToken) : null
        

    //     // const returnUrl = router.query.returnUrl;
    //     // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    //     // router.replace(redirectURL)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     if (errorCallback) errorCallback(err)
    //   })
  }


  const handleLogout = () => {
    setUser(null)
    handleOnClearLocalHost()
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
