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
  
    const isLoggedIn = Boolean(data?.access_token);
  
    if (error) {
      return <div>Error</div>;
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (isLoggedIn) {
      return <pre>{JSON.stringify(data)}</pre>;
    }
  
    return (
      <button style={{ margin: "24px" }} type="button" onClick={() => getAuth()}>
        Login
      </button>
    );
  };

  export default AuthComponent;