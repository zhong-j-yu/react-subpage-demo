# react-subpage-demo

A demo app for [`react-subpage`](https://github.com/zhong-j-yu/react-subpage).

The app allows a user to login, view and edit a memo.

## running the demo

```bash
$ git clone git://github.com/zhong-j-yu/react-subpage-demo
$ cd react-subpage-demo
$ npm install
$ npm start
```

## url mapping

The app has several pages, most importantly,
`Login, ShowMemo, EditMemo`.
Mapping between page and url is defined in `index.js`.

```js
const urlMap = {
  '/'          : HomePage,
  '/login'     : Login,
  '/memo'      : ShowMemo,
  '/memo#edit' : EditMemo,
  ':url(.*)'   : NotFound
}
const pager = new Pager(urlMap);
```

## navigation

After user logs in, the app displays the `ShowMemo` page. From there,
user can go to `EditMemo`.
After edited memo is saved, `ShowMemo` is displayed again.


Page switching is mostly done by `pager.push()`.
For example, the `Login` button in `HomePage`:

```
  <button onClick={ e=> pager.push(Login) }>
```

## authentication

`ShowMemo` page requires authentication first.
What if user logs out, then navigates back to `ShowMemo`?

In `ShowMemo.onRequest()`, if user is not logged in, we do

```js
return pager.view(Login, {
  message: 'This page (show memo) requires login',
  afterLogin:()=>pager.go(0)
});
```

Note that we use `pager.view()`, instead of `pager.push/replace`.
The browser history is not modified; the URL is still `/memo`.
It's just that now the `Login` view is shown.

After logging in, we do `pager.go(0)`, which "refreshes" the current page.
`ShowMemo.onRequest()` is invoked again,
but this time, another view is shown.

Alternatively, in `EditMemo`, which also requires authentication,
we take a simpler approach, just do
`pager.replace(HomePage)` if user is not logged in.


## service dependency

The app depends on services for login, storage, etc.
To reduce coupling, all services are instantiated in `index.js`.
They are attached to `pager` through which pages can access them.

```js
  // index.js
     pager.loginService = new LoginService();

  // Login.js
     props.pager.loginService.login(...)
```



## not found

It's important to handle all URLs. This is done
by `NotFound` as the last entry in `urlMap`.
`NotFound` displays an error message, explaining that the url is not mapped.

Alternatively, you may choose to simply redirect to a known page/url. For example,

```js
  return pager.replace(HomePage);
```

## legacy url

The app may have to support some legacy URLs.
For example, we used to have URL `/memo#modify`,
but now we use `/memo#edit` instead;
nevertheless, we still want to support the old URL.

This is handled in `NotFound.onRequest()`:

```js
if(props.url==='/memo#modify')
  return pager.replace(EditMemo);
```

Alternatively, you may define a special page to map to the
legacy URL, and choose what to do in `onRequest()`.
This strategy is preferred if the URL contains parameters.

## reducing history

Switching between `ShowMemo` and `EditMemo` is done by `pager.push()`.
This can create a lot of browser history entries,
which can be confusing and annoying.

While we model them as two different pages for programming reasons,
(and here, for the purpose of demo the framework),
the user may consider them the same page, in different states.

Therefore, alternatively, we may use `pager.replace()` instead
to switch between `ShowMemo` and `EditMemo`.
After a series of *show-edit-show-edit...*
there is just one history entry.
