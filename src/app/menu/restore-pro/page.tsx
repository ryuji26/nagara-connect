import MenuDetailPage from '../MenuDetailPage';
import type { MenuData } from '../MenuDetailPage';

const menuData: MenuData = {
    id: 'restore-pro',
    rank: '特上',
    name: 'リストアプロ',
    time: '約3.5時間',
    description: '深い傷や経年劣化を精密に復元。新車以上の輝きを取り戻す最高峰メニュー。多段階の研磨工程で塗装面を丹念に整え、最高級コーティングで長期保護します。',
    image: '/images/restore-pro.png',
    accentColor: '#c9a96e',
    bgColor: '#f8f3eb',
    prices: {
        SS: '¥45,000',
        S: '¥60,000',
        M: '¥75,000',
        L: '¥90,000',
        LL: '¥110,000',
        XL: '¥140,000',
    },
    features: [
        '多段階研磨で深い傷・くすみを徹底除去',
        '新車以上の鏡面仕上げを実現',
        '最高級ガラスコーティングで長期保護',
        '塗装計測による精密な研磨管理',
        '全工程をマスター職人が担当',
    ],
    includes: [
        'スノーフォーム洗車（外装全体）',
        '鉄粉除去',
        'BASE下地処理（全面）',
        '多段階研磨（3工程以上）',
        '塗装膜厚計測',
        'Fast Glassガラスコーティング施工',
        'トップコート施工',
        '硬化促進処理',
        '室内クリーニング（徹底清掃）',
        'タイヤ・ホイール洗浄＋コーティング',
        'ドアジャム清掃',
        '窓ガラスコーティング',
        'ヘッドライト磨き',
    ],
    products: [
        'Fast Glass（2時間硬化ガラスコーティング）',
        'Fast Glassトップコート',
        'ながら洗車 BASE（下地処理剤）',
        '多段階研磨コンパウンド（3種）',
        'ながら洗車公認スノーフォーム',
        '鉄粉除去スプレー',
        '塗装膜厚計',
    ],
};

export default function RestoreProPage() {
    return <MenuDetailPage menu={menuData} />;
}
