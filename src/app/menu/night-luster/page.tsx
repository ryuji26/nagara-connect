import MenuDetailPage from '../MenuDetailPage';
import type { MenuData } from '../MenuDetailPage';

const menuData: MenuData = {
    id: 'night-luster',
    rank: '松',
    name: 'ナイトラスタープレミアム',
    time: '約110分',
    description: 'Fast Glass（2時間硬化ガラスコーティング）で究極の鏡面仕上げ。旗艦サービス。最高品質のガラスコーティングが、深い艶と強力な撥水性能を長期間維持します。',
    image: '/images/night-luster.png',
    popular: true,
    accentColor: '#1a3a8f',
    bgColor: '#e8edf8',
    prices: {
        SS: '¥18,000',
        S: '¥25,000',
        M: '¥30,000',
        L: '¥35,000',
        LL: '¥42,000',
        XL: '¥55,000',
    },
    features: [
        'Fast Glassガラスコーティングで究極の鏡面仕上げ',
        '2時間硬化で即日完了',
        '強力な撥水性能が長期間持続',
        '紫外線・酸性雨からの塗装保護',
        'プロの研磨技術による下地処理込み',
    ],
    includes: [
        'スノーフォーム洗車（外装全体）',
        '鉄粉除去',
        'BASE下地処理（全面）',
        '軽研磨（1工程）',
        'Fast Glassガラスコーティング施工',
        '硬化促進処理',
        '室内拭き上げ',
        'タイヤ・ホイール洗浄',
        'ドアジャム清掃',
        '窓ガラスコーティング',
    ],
    products: [
        'Fast Glass（2時間硬化ガラスコーティング）',
        'ながら洗車 BASE（下地処理剤）',
        'ながら洗車公認スノーフォーム',
        '専用研磨コンパウンド',
        '鉄粉除去スプレー',
    ],
};

export default function NightLusterPage() {
    return <MenuDetailPage menu={menuData} />;
}
