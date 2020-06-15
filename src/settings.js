const PROD = false;

export function LoginURL() {
  if (PROD) {
    return "https://cphfb.codes/sem3/api/login";
  }
  return "http://localhost:8080/sem3/api/login";
}

export function UserRegistrationURL() {
  if (PROD) {
    return "https://cphfb.codes/sem3/api/register/user";
  }
  return "http://localhost:8080/sem3/api/register/user";
}

export function ChangePWURL() {
  if (PROD) {
    return "https://cphfb.codes/sem3/api/register/changepw";
  }
  return "http://localhost:8080/sem3/api/register/changepw";
}

export function FetchNoAccessReq() {
  if (PROD) {
    return "https://cphfb.codes/sem3/api/movie-info";
  }
  return "http://localhost:8080/sem3/api/movie-info";
}
