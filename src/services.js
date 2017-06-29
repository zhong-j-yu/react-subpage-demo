// services for login, memo load/save, etc.

// no real network backends.
// use client side storage, with simulated delays

const pause = () => new Promise(resolve => setTimeout(resolve, 700));

// =====================================================================
// Login
// api:
//     ls = new LoginService()
//     ls.login(username, password) => Promise<username>
//     ls.username; // falsy if not logged in
//     ls.logout() => void

export class LoginService
{
  // any `username` is fine, except '' and 'invalid'
  login(username, password)
  {
    return pause().then(()=>{
      if(username==='' || username==='invalid')
          throw new Error("invalid username/password")
      return (this.username = username); // success
    });
  }
  logout()
  {
    this.username = null;
  }
}

// =====================================================================
// load and save memo.
// api:
//     ms = new MemoService()
//     ms.load(userId) => Promise<text>
//     ms.save(userId, text) => Promise<boolean>

function mkey(userId)
{
  return 'memo-'+userId;
}
export class MemoService
{
  load(userId)
  {
    return pause().then(()=>{
      return sessionStorage.getItem(mkey(userId)) || 'add your memo...';
    });
  }
  save(userId, text)
  {
    return pause().then(()=>{
      sessionStorage.setItem(mkey(userId), text);
      return true;
    });
  }
}
