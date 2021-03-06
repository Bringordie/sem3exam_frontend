import React, { useState, useEffect } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "react-datepicker/dist/react-datepicker.css";
import UserRegistrationPage from "./userregister";
import ViewAbleForAll from "./viewableforall";
import MoviesForUsers from "./moviesforusers";
import MovieCount from "./moviecount";

function App({ apiFetchFacade, authFacade }) {
  let token = localStorage.getItem("jwtToken");

  const [loggedIn, setLoggedIn] = useState(
    token !== undefined && token !== null
  );
  const [role, setRole] = useState("");
  const history = useHistory();

  const logout = () => {
    authFacade.logout();
    setLoggedIn(false);
    updateRoles();
  };

  const login = (user, pass) => {
    authFacade
      .login(user, pass)
      .then((res) => setLoggedIn(true))
      .then((res) => {
        updateRoles();
        history.push("/");
      })
      .catch((res) =>
        alert("Status code : " + res.status + " Wrong username or password.")
      );
  };

  function updateRoles() {
    token = localStorage.getItem("jwtToken");
    if (token) {
      var decoded = jwt_decode(token);
      setRole(decoded.roles);
    } else {
      setRole(null);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    token = localStorage.getItem("jwtToken");
    if (token) {
      var decoded = jwt_decode(token);
      setLoggedIn(true);
      setRole(decoded.roles);
    }
  }, []);

  return (
    <div className="App">
      <Header loggedIn={loggedIn} role={role} logout={logout} />
      {loggedIn && role && role.includes("admin") && (
        <>
          <Route exact path="/">
            <Home history={history} token={token} />
          </Route>
          <Route path="/viewableforall">
            <ViewAbleForAll />
          </Route>
        </>
      )}

      {loggedIn && role && role.includes("user") && (
        <Switch>
          <Route exact path="/">
            <Home history={history} token={token} />
          </Route>
          <Route path="/viewableforall">
            <ViewAbleForAll />
          </Route>
          <Route path="/moviesforusers">
            <MoviesForUsers />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      )}
      {role && role.includes("admin") && (
        <Route path="/moviecount">
          <MovieCount />
        </Route>
      )}
      {!loggedIn && (
        <>
          <Switch>
            <Route exact path="/">
              <Home history={history} token={token} />
            </Route>
            <Route path="/viewableforall">
              <ViewAbleForAll />
            </Route>

            <Route path="/login">
              <LogIn login={login} />
            </Route>
            <Route path="/registration">
              <UserRegistrationPage
                apiFetchFacade={apiFetchFacade}
                loginCallback={login}
              />
            </Route>

            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}

function Header({ role, loggedIn, logout }) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/viewableforall">
            Test Api
          </NavLink>
        </li>
        {role !== null && role && role.includes("user") && (
          <>
            <li>
              <NavLink activeClassName="active" to="/moviesforusers">
                Movies For Users
              </NavLink>
            </li>
          </>
        )}
        {role && role.includes("admin") && (
          <>
            <li>
              <NavLink activeClassName="active" to="/moviecount">
                Movies With Count
              </NavLink>
            </li>
          </>
        )}
        {loggedIn && (
          <li>
            <NavLink activeClassName="active" onClick={logout} to="/login">
              Logout
            </NavLink>
          </li>
        )}
        {!loggedIn && (
          <>
            <li>
              <NavLink activeClassName="active" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/registration">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h3>No match for that route</h3>
    </div>
  );
}

function Capatialize(prop) {
  return prop.charAt(0).toUpperCase() + prop.slice(1);
}

function Home(props) {
  const token = props.token;
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (token !== null && token !== undefined) {
      var decoded = jwt_decode(token);
      setUsername(Capatialize(decoded.username));
      setRole(decoded.roles);
    }
  }, [token]);
  return (
    <div>
      {role && role.includes("admin") && (
        <div>
          <h2>Admin page</h2>
        </div>
      )}
      {role !== "" && !role.includes("admin") && (
        <div>
          <h2>Welcome {username}</h2>
        </div>
      )}
      {role === "" && (
        <div>
          <h2>Welcome. Please log in.</h2>
        </div>
      )}
    </div>
  );
}

export default App;
