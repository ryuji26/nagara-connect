import MenuDetailPage from '../MenuDetailPage';
import type { MenuData } from '../MenuDetailPage';

const menuData: MenuData = {
    id: 'detox-glass',
    rank: 'PREMIUM',
    name: 'NAGARA ファストガラス施工',
    time: '約120分',
    description: 'ファストガラス施工。極上の艶と長期間持続する圧倒的保護力。外装ボディに加え、足回り（ホイール/タイヤ）やドアヒンジまで徹底的に洗浄します。',
    image: '/images/night-luster.png',
    accentColor: '#1a3a8f',
    bgColor: '#e8edf8',
    popular: true,
    prices: { SS: '¥16,000', S: '¥18,000', M: '¥20,000', L: '¥23,000', LL: '¥26,000', XL: '¥30,000' },
    features: ['足回りやヒンジを含む細部までの徹底洗浄', 'DEEP BASEによる強力な下地処理', '最大2年の耐久性を誇るFast Glass施工'],
    includes: ['足回り洗浄(インショット/アウトショット等)', 'スノーバブル', 'IRON DELETE', '脱脂シャンプー', 'DEEP BASE(強力下地処理)', 'ファストガラス施工'],
    products: ['インショット / アウトショット', 'IRON DELETE', 'DEEP BASE', 'ファストガラス'],
    steps: [
        { title: '足回りの徹底洗浄', desc: 'インショットやアウトショットを使用し、ホイールの奥やブレーキダスト、タイヤハウスの汚れまで専用ブラシを用いて徹底的に洗浄します。' },
        { title: 'スノーバブル・細部洗浄', desc: '泡で汚れを包み込み、エンブレム周りやグリル、ドアヒンジ等の細部まで専用ブラシで丁寧に洗浄します。' },
        { title: '鉄粉除去・脱脂シャンプー', desc: 'IRON DELETEでボディの鉄粉を溶解・除去し、脱脂シャンプーで油分や汚れを完全にリセットします。' },
        { title: 'DEEP BASE（強力下地処理）', desc: '専用のポリッシャーとDEEP BASEを使用し、強力な水垢や軽度の洗車傷を整え、ガラスコーティングに最適な平滑な下地を作ります。' },
        { title: 'Fast Glass施工・仕上げ', desc: '高耐久のファストガラスを丁寧にムラなく塗り込み、圧倒的な艶と長期間持続する保護被膜を形成します。' }
    ]
};

export default function DetoxGlassPage() { return <MenuDetailPage menu={menuData} />; }
