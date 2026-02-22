import MenuDetailPage from '../MenuDetailPage';
import type { MenuData } from '../MenuDetailPage';

const menuData: MenuData = {
    id: 'detox',
    rank: 'ADVANCE',
    name: 'NAGARA リセット洗車',
    time: '約90分',
    description: '汚れを根本からリセットし、お好みのコーティングで仕上げます。専用の脱脂シャンプー、下地処理（BASE）を行い、選べるコーティングで滑らかな手触りと艶を実現します。',
    image: '/images/skin-improvement.png',
    accentColor: '#c9a96e',
    bgColor: '#f8f3eb',
    prices: { SS: '¥8,000', S: '¥9,000', M: '¥10,000', L: '¥11,500', LL: '¥13,000', XL: '¥15,000' },
    features: ['外装ボディの徹底デトックス', '専用BASEでの強力な下地処理', '6種類から選べる専用コーティング'],
    includes: ['スノーバブル', '脱脂シャンプー', 'BASE(下地処理)', '【選べるコーティング】'],
    products: ['脱脂シャンプー', 'BASE', 'プラズマコーティングα / 阿修羅(+¥3,000) / シャドウ / 夜 / シルクメント / ビーディング'],
    steps: [
        { title: '足回り洗浄', desc: 'ホイール、タイヤ、タイヤハウスの汚れを高圧洗浄と専用洗剤で念入りに落とします。' },
        { title: 'スノーバブル・予備洗浄', desc: 'たっぷりの泡でボディ全体を包み込み、浮かせた汚れを高圧洗浄で洗い流します。' },
        { title: '脱脂シャンプー洗車', desc: '専用の脱脂シャンプーを使用し、ボディ表面の油分や古いコーティングを落とします。' },
        { title: 'BASE（下地処理）', desc: '微粒子の特殊クリーナーで水垢や軽度のクスミを除去し、コーティングの定着を良くする下地を作ります。' },
        { title: '選べるコーティング・仕上げ', desc: '6種類の中からお車や好みに合わせたコーティングを施工し、極上の艶と超撥水を実現します。' }
    ]
};

export default function DetoxPage() { return <MenuDetailPage menu={menuData} />; }
