# digital-flash-cards

ドイツ語専用の単語帳です。完全に私用です。
機能は
- 品詞別の単語帳
    - 表示される順番は完全ランダム
    - 入力された回答の正誤判定を行う
- 単語の検索と削除
    - 右上でフィルターを設定
    - 右上に*のある単語は日本語への変換を適用した単語
    - 単語のクリックで詳細を表示、下のボタンから削除
- 単語の追加
    - 全項目にバリデーション

firebaseを用いてユーザーの認証をしており、ユーザーごとに単語帳を保存しています。

URL -> https://digital-flash-cards.web.app/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
