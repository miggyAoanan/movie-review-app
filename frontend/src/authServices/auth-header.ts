export default function authHeader() {
    const tokenStr = localStorage.getItem("token");
    let token = null;
    if (tokenStr)
    token = JSON.parse(tokenStr);
  
    if (token && token.accessToken) {
      return { Authorization: 'Bearer ' + token.accessToken };
    } else {
      return { Authorization: '' };
    }
  }








// export default function authHeader() {
//     const userStr = localStorage.getItem("user");
//     let user = null;
//     if (userStr)
//       user = JSON.parse(userStr);
  
//     if (user && user.accessToken) {
//       // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
//       return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
//     } else {
//       // return { Authorization: '' }; // for Spring Boot back-end
//       return { 'x-access-token': null }; // for Node Express back-end
//     }
//   }