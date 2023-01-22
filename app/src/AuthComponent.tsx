import React from "react";
import useOAuth2 from "./useOAuth2";

const AuthComponent = () => {
    const { data, loading, error, getAuth } = useOAuth2({
      authorizeUrl: "http://192.168.1.147:3001/login/oauth2/auth",
      clientId: "10000000000001",
      redirectUri: `${document.location.origin}/callback`,
      scope: "",
      responseType: "code",
      exchangeCodeForTokenServerURL: "/api/codeToTokenExchanger",
      exchangeCodeForTokenMethod: "POST",
      onSuccess: (payload) => console.error("Success", payload),
      onError: (error_) => console.error("Error", error_)
    });
  
    const [err, setErr] = React.useState("");
    const updateStudent = async () => {
      console.log(data)
      const res = await fetch("/api/addUserToDatabase", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => setErr(data.error))
    }
  
    const isLoggedIn = Boolean(data?.access_token);
  
    if (error) {
      return <div>Error</div>;
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (isLoggedIn) {
        updateStudent();
        return (
            <div>
                <p>access_token: {data?.access_token}</p>
                <p>token_type: {data?.token_type}</p>
                <p>user: {JSON.stringify(data?.user)}</p>
                <p>refresh_token: {data?.refresh_token}</p>
                <p>expires_in: {data?.expires_in}</p>
                <p>canvas_region: {data?.canvas_region}</p>
            </div>
        );
    }
  
    return (
      <button style={{ margin: "24px" }} type="button" onClick={() => getAuth()}>
        Login
      </button>
    );
  };

  export default AuthComponent;