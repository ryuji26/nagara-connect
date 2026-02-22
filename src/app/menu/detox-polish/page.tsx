import MenuDetailPage from '../MenuDetailPage';
import type { MenuData } from '../MenuDetailPage';

const menuData: MenuData = {
    id: 'detox-polish',
    rank: 'PRO',
    name: 'ブラックカット本格研磨',
    time: '約240分',
    description: '検定合格職人限定。研磨で傷を完全除去し、究極の美観を再生する最高峰メニュー。ブラックカットによる本格研磨で塗装面を極限まで平滑にし、ガラスコーティングで閉じ込めます。',
    image: '/images/restore-pro.png',
    accentColor: '#c9a96e',
    bgColor: '#f8f3eb',
    prices: { SS: '¥40,000', S: '¥45,000', M: '¥50,000', L: '¥57,500', LL: '¥65,000', XL: '¥75,000' },
    features: ['検定合格したトップ職人による緻密な施工', 'ブラックカットを用いた傷の完全除去（本格研磨）', '研磨後の最高の状態を保護するファストガラス施工'],
    includes: ['足回り洗浄', 'スノーバブル', 'IRON DELETE', 'スノーシャンプー', '【ブラックカットによる本格研磨】', '脱脂シャンプー', 'BASE', 'ファストガラス施工'],
    products: ['ブラックカット（研磨剤）', '専用ポリッシャー', 'BASE', 'ファストガラス'],
    steps: [
        { title: '特上仕様の足回り・細部洗浄', desc: 'ホイールやタイヤハウスの徹底洗浄に加え、エンブレムやドアヒンジなど細部に至るまで専用ブラシで汚れを取り除きます。' },
        { title: '鉄粉除去・スノーシャンプー', desc: 'IRON DELETEで鉄粉を除去し、スノーバブルの豊富な泡でボディ表面の汚れを落とします。' },
        { title: 'ブラックカットによる本格研磨', desc: '検定に合格した職人が専用ポリッシャーと研磨剤を使用し、塗装面の傷やクスミを完全に除去して新車以上の艶を再生します。' },
        { title: '脱脂シャンプー・BASE施工', desc: '研磨後の油分を脱脂シャンプーで完全に落とし、BASEでガラスコーティングの定着面を完璧に整えます。' },
        { title: 'Fast Glass施工・極上の仕上げ', desc: '最高級のファストガラスを丁寧に塗布し、研磨で引き出した究極の美観を長期間保護する強靭な被膜を形成します。' }
    ]
};

export default function DetoxPolishPage() { return <MenuDetailPage menu={menuData} />; }
