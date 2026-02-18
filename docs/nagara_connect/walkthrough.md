# Nagara Connect ― プロトタイプ ウォークスルー

## 概要

「ながら洗車」ブランド特化の出張洗車マッチングアプリ **Nagara Connect** のプロトタイプを作成しました。Next.js + TailwindCSS v4で構築した静的プロトタイプで、5つの主要画面 + UXフロー図が含まれます。

**プロジェクト**: `/Users/ryuji/.gemini/antigravity/scratch/nagara-connect/`

---

## 全画面デモ動画

![全画面の操作デモ](/Users/ryuji/.gemini/antigravity/brain/b326ccbf-3a77-414e-809a-ce434b473dd9/all_screens_demo_1771332658811.webp)

---

## 画面一覧

````carousel
### 1. ホーム画面 (`/`)
- ウェルカムメッセージ + 予約CTAボタン
- 近くのパートナー（横スクロールカード）
- 施工履歴サマリー、ながら洗車製品プロモ

![ホーム画面](/Users/ryuji/.gemini/antigravity/brain/b326ccbf-3a77-414e-809a-ce434b473dd9/nagara_connect_home_1771332625874.png)
<!-- slide -->
### 2. マップ予約画面 (`/booking`)
- モックマップにパートナーのピン表示
- 「自宅出張」/「提携GS」の切り替え
- パートナー選択 → メニュー → 日時の3ステップUI

![予約画面](/Users/ryuji/.gemini/antigravity/brain/b326ccbf-3a77-414e-809a-ce434b473dd9/nagara_booking_1771332667562.png)
<!-- slide -->
### 2b. パートナー選択時

![パートナー選択](/Users/ryuji/.gemini/antigravity/brain/b326ccbf-3a77-414e-809a-ce434b473dd9/nagara_booking_selected_1771332678141.png)
<!-- slide -->
### 3. ギルドカード (`/guild`) - スキルチャート
- SVGレーダーチャート（洗浄・研磨・コーティング・接客・スピード）
- パートナープロフィール + Nagara/OpenWash切替

![ギルドカード](/Users/ryuji/.gemini/antigravity/brain/b326ccbf-3a77-414e-809a-ce434b473dd9/nagara_guild_1771332688810.png)
<!-- slide -->
### 3b. 認定バッジ & 試験進捗

![認定バッジ](/Users/ryuji/.gemini/antigravity/brain/b326ccbf-3a77-414e-809a-ce434b473dd9/nagara_guild_badges_1771332701979.png)
<!-- slide -->
### 4. 施工レポート (`/report`)
- Before/Afterスライダー
- 使用製品の自動記録、施工チェックリスト
- レビュー投稿（星評価 + コメント）

![施工レポート](/Users/ryuji/.gemini/antigravity/brain/b326ccbf-3a77-414e-809a-ce434b473dd9/nagara_report_1771332726033.png)
<!-- slide -->
### 5. GS連携 (`/station`)
- 提携GS一覧 + 施設情報
- 在庫リアルタイム表示、QRチェックイン

![GS連携](/Users/ryuji/.gemini/antigravity/brain/b326ccbf-3a77-414e-809a-ce434b473dd9/nagara_station_expanded_1771332759578.png)
<!-- slide -->
### 6. UXフロー図 (`/flow`)
- 予約→施工→レビューの10ステップフロー
- 画面遷移サマリー

![UXフロー](/Users/ryuji/.gemini/antigravity/brain/b326ccbf-3a77-414e-809a-ce434b473dd9/nagara_flow_1771332781932.png)
````

---

## デザイン特徴

| 要素 | 実装内容 |
|------|----------|
| **カラー** | ブラック基調 + グリーンアクセント(`#00e676`) |
| **グラスモーフィズム** | `backdrop-filter: blur(20px)` のカードUI |
| **独自アイコン** | 艶・撥水・コーティング・洗浄力・スピード・接客 |
| **アニメーション** | fadeInUp、pulse-green、shimmer、float |
| **フォント** | Outfit（見出し）、Inter（本文） |
| **バッジシステム** | Bronze → Silver → Gold → Master のグラデーション |

## プロジェクト構造

```
nagara-connect/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── globals.css         # デザイントークン + スタイル
│   │   ├── page.tsx            # ホーム画面
│   │   ├── booking/page.tsx    # マップ予約画面
│   │   ├── guild/page.tsx      # ギルドカード画面
│   │   ├── report/page.tsx     # 施工レポート画面
│   │   ├── station/page.tsx    # GS連携画面
│   │   └── flow/page.tsx       # UXフロー図
│   └── components/
│       ├── layout/
│       │   ├── TabBar.tsx      # 5タブナビゲーション
│       │   └── Header.tsx      # ブランドヘッダー
│       └── ui/
│           └── BrandIcons.tsx  # 独自SVGアイコン
```

## 検証結果

- ✅ `npm run build` — 全6ルート正常ビルド
- ✅ ブラウザ確認 — 全画面のUI表示・インタラクション正常
- ✅ タブバーでの画面遷移
- ✅ 独自ブランドアイコンの表示

## 起動方法

```bash
cd /Users/ryuji/.gemini/antigravity/scratch/nagara-connect
npm run dev
# → http://localhost:3000
```
