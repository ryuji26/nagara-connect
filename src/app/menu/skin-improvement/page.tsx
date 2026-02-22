import MenuDetailPage from '../MenuDetailPage';
import type { MenuData } from '../MenuDetailPage';

const menuData: MenuData = {
    id: 'skin-improvement',
    rank: '竹',
    name: '肌改善スタンダード',
    time: '約60分',
    description: 'BASE（下地処理剤）で傷埋め＋表面安定化。見違えるような艶に。くすみや細かい傷が気になる方に最適なコースです。下地処理により塗装面を整え、深みのある光沢を実現します。',
    image: '/images/skin-improvement.png',
    accentColor: '#c9a96e',
    bgColor: '#f8f3eb',
    prices: {
        SS: '¥9,000',
        S: '¥12,000',
        M: '¥15,000',
        L: '¥18,000',
        LL: '¥22,000',
        XL: '¥28,000',
    },
    features: [
        'BASE下地処理剤で微細な傷を埋めて平滑化',
        '表面安定化により持続的な艶感を実現',
        'くすみ・水垢を徹底除去',
        '洗車＋下地処理がセットで約60分',
    ],
    includes: [
        'スノーフォーム洗車（外装全体）',
        '鉄粉除去',
        'BASE下地処理（全面）',
        '表面安定化処理',
        '室内拭き上げ',
        'タイヤ・ホイール洗浄',
        'ドアジャム清掃',
    ],
    products: [
        'ながら洗車 BASE（下地処理剤）',
        'ながら洗車公認スノーフォーム',
        '鉄粉除去スプレー',
        '専用アプリケーター',
    ],
};

export default function SkinImprovementPage() {
    return <MenuDetailPage menu={menuData} />;
}
