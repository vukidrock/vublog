# Vublog

## list

- [ x ] add posts.component, comments.component, users.components
- [ x ] display posts from firebase database
- [ x ] view post with id
- [ x ] add comment system
- [ x ] show comment (app-show-comment)
- [ x ] login/ logout system
- [ x ] add post
- [ x ] kiem tra lai database, dung database id mac dinh hay dung angular tao ra id



---
- [ ] add timestamp to post/ comment
- [ ] add user system
- [ ] view user profile (post, postcount, infomation)
- [ ] edit post for user
- [ ] timestamp for post

---
Credit:
- Firebase
- Angular
- some fuckin' npm

[ngx-markdown-editor](https://github.com/lon-yang/ngx-markdown-editor)
[uikit](https://github.com/uikit/uikit)
[]()

---

change tsconfig.json in function folder to
````
{
  "compilerOptions": {
    "lib": ["es6"],
    "module": "commonjs",
    "noImplicitReturns": true,
    "outDir": "lib",
    "sourceMap": true,
    "target": "es6",
    "typeRoots": [
      "./functions/node_modules/@types"
      ]
  },
  
  "compileOnSave": true,
  "include": [
    "src"
  ]
}
````

use ``` ng build --prod ``` before deploy