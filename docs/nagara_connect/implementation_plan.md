# Nagara Connect ― 出張洗車マッチングアプリ プロトタイプ実装計画

「ながら洗車」ブランドを活用した出張洗車マッチングアプリのプロトタイプを作成する。顧客向け・パートナー向けの主要5画面に加え、UXフロー図と独自UIアイコンを含む。

## User Review Required

> [!IMPORTANT]
> **新規プロジェクトとして作成します。** 既存の `polishing-guild` とは別に、`/Users/ryuji/.gemini/antigravity/scratch/nagara-connect/` に新規Next.jsプロジェクトを作成します。

> [!NOTE]
> **静的プロトタイプ**です。バックエンド連携やSupabaseは含みません。画面遷移とUI表現に焦点を当てます。

---

## Proposed Changes

### プロジェクト初期化

#### [NEW] Next.js プロジェクト
- `npx -y create-next-app@latest ./` で初期化（TailwindCSS v4、TypeScript、App Router）
- ブランドカラー（ブラック基調 + グリーンアクセント + ホワイト）のデザイントークン設定
- Google Fonts（Inter / Outfit）の読み込み

---

### 共通コンポーネント

#### [NEW] `src/components/layout/MobileFrame.tsx`
- モバイルアプリ風のフレームレイアウト（390×844px想定）
- 上部ステータスバー + 下部タブバー

#### [NEW] `src/components/layout/TabBar.tsx`
- 5タブ：ホーム / 予約 / レポート / ギルド / GS
- アクティブ状態のグリーンアクセント表示

#### [NEW] `src/components/layout/Header.tsx`
- ブランドロゴ + 通知ベル + ユーザーアバター

#### [NEW] `src/components/ui/BrandIcons.tsx`
- 独自SVGアイコン：艶（Gloss）、撥水（Water Repellent）、コーティング（Coating）、洗浄力（Cleaning Power）
- ブランドのグリーンカラーを使用したアイコンセット

---

### 画面1: ホーム画面

#### [NEW] `src/app/page.tsx`
- ウェルカムメッセージ + 予約CTAボタン
- 近くのパートナー（横スクロールカード）
- 最近の施工履歴サマリー
- 「ながら洗車」製品プロモーションバナー
- クイック予約ボタン（フローティング）

---

### 画面2: マップ予約画面

#### [NEW] `src/app/booking/page.tsx`
- マップ風のUI表示（CSS/SVGで表現したモックマップ）
- パートナーのピン表示（アバター + 評価）
- 場所選択：「自宅」or「提携GS」の切り替えトグル
- パートナー選択 → メニュー選択 → 日時選択のステップUI
- 予約確認モーダル

---

### 画面3: スキルチャート画面（パートナー側ギルドカード）

#### [NEW] `src/app/guild/page.tsx`
- パートナーのプロフィールカード（キャラクター・洗車スタイル表示）
- スキルレーダーチャート（洗浄・研磨・コーティング・接客・スピード）
- 認定バッジ一覧（ブロンズ / シルバー / ゴールド / マスター）
- 技術認定試験の進捗バー
- 「Nagara Connect」と「Open Wash」の切り替えバッジ

---

### 画面4: 施工レポート画面

#### [NEW] `src/app/report/page.tsx`
- 施工前後の写真比較（Before/After スライダー）
- 使用製品リスト（ながら洗車製品の自動記録表示）
- 施工詳細（所要時間、施工箇所チェックリスト）
- 顧客レビュー入力セクション（星評価 + コメント）

---

### 画面5: GS連携画面

#### [NEW] `src/app/station/page.tsx`
- 提携GSの一覧（カード形式）
- チェックイン機能UI（QRコード風表示）
- 店頭在庫のリアルタイム表示（ながら洗車製品の在庫状況）
- GS施設情報（水道・電源・作業スペースの有無）

---

### UXフロー図

#### [NEW] `src/app/flow/page.tsx`
- 顧客の予約〜施工完了〜レビューまでのフロー図
- Mermaid.jsまたはCSSでビジュアル化
- 各ステップにブランドカラーのアイコン表示

---

### グローバルスタイル

#### [NEW] `src/app/globals.css`
- ブランドカラー変数（`--nagara-black`, `--nagara-green`, `--nagara-white`）
- ダークモードベースのUI
- グラスモーフィズムカードスタイル
- マイクロアニメーション定義
- レスポンシブ設定

---

## Verification Plan

### ビルド確認
- `npm run build` でビルドエラーがないことを確認

### ブラウザ確認
- `npm run dev` で起動後、ブラウザで各画面を表示確認
- 5画面すべてがタブバーで遷移可能であることを確認
- UXフロー図が正しく表示されることを確認
- レスポンシブ表示の確認

### 手動確認項目
1. ホーム画面：CTAボタン、パートナーカードの横スクロール、製品バナーの表示
2. マップ予約画面：パートナーピン、場所切り替え、ステップUIの遷移
3. スキルチャート画面：レーダーチャートの表示、バッジの表示
4. 施工レポート画面：Before/Afterスライダー、製品リスト、レビュー入力
5. GS連携画面：GS一覧、チェックインUI、在庫表示
