# dev
```npm run dev```
- 监听less,解析less成css,复制到src/css目录
- 监听css,复制到dist/css目录
- 监听img,font,lib复制到dist/img, font, lib目录
- 监听js,将es6 解析成es5 的代码后输出到dist/js目录
- 监听src目录下的所有html,复制到dist目录
- 开启本地服务，并且监听以上文件变动，自动刷新浏览器

# build
```npm run build```
- 监听less,解析less成css,复制到src/css目录
- 监听css,添加版本控制后,复制到dist/css目录
- 监听img,font,lib 添加版本控制后, 复制到dist/img, font, lib目录
- 监听js,将es6 解析成es5 的代码,添加版本控制后,输出到dist/js目录
- 监听src目录下的所有html,修改文件引入为对应的版本后,复制到dist目录
