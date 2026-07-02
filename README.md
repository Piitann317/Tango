# Tango 📖 — 英単語帳アプリ

分からない英単語を登録して、フラッシュカード形式で復習できるシンプルな単語帳アプリです。
スマホ対応(PWA)で、ホーム画面に追加すればアプリのように使えます。

## スマホで使う(おすすめ)

GitHub Pages で公開すると、次のURLでアクセスできます。

```
https://piitann317.github.io/Tango/
```

1. スマホのブラウザ(Safari / Chrome)で上のURLを開く
2. **ホーム画面に追加**する
   - iPhone (Safari): 共有ボタン →「ホーム画面に追加」
   - Android (Chrome): メニュー(⋮)→「ホーム画面に追加」または「アプリをインストール」
3. ホーム画面のアイコンから起動すると、全画面のアプリとして使えます
   (一度読み込めばオフラインでも動作します)

### 公開のしかた(初回のみ)

main ブランチにマージすると GitHub Actions が自動で GitHub Pages にデプロイします。
もし初回デプロイに失敗する場合は、リポジトリの **Settings → Pages → Source** を
**GitHub Actions** に設定してから、Actions タブでワークフローを再実行してください。

## パソコンで使う

1. `index.html` をブラウザ(Chrome / Edge / Safari / Firefox)で開く
2. **単語を追加** タブで英単語を入力
   - 「🔍 意味を自動取得」ボタン(または Enter キー)で英英辞書
     [dictionaryapi.dev](https://dictionaryapi.dev/) から意味と例文を自動取得
   - 日本語の意味を書き足したり、手入力で登録することもできます
3. **単語リスト** タブで登録済みの単語を検索・編集・削除
4. **復習モード** タブでフラッシュカード復習
   - 英単語を見て意味を思い出す → 「答えを見る」→ ⭕覚えていた / ❌忘れていた で自己採点
   - 成績に応じて各単語が「新規 → 学習中 → 習得済み」とステータス管理されます
   - 「苦手な単語だけ」を選ぶと未習得の単語に絞って復習できます

## データの保存について

単語データはブラウザの `localStorage` に保存されます。
同じ端末・同じブラウザであれば、閉じても再度開いたときにデータが残っています。
(端末をまたいだ同期はされません)

## 技術構成

- HTML / CSS / JavaScript のみ(依存ライブラリなし)
- PWA 対応(`manifest.json` + Service Worker によるオフラインキャッシュ)
- 辞書検索: [Free Dictionary API](https://dictionaryapi.dev/)(オフライン時は手入力で利用可能)
- GitHub Actions で GitHub Pages に自動デプロイ(`.github/workflows/pages.yml`)
